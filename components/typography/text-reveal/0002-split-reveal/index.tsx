"use client";

import {
  forwardRef,
  useMemo,
  type ElementType,
  type HTMLAttributes,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export interface SplitRevealProps extends Omit<
  HTMLAttributes<HTMLElement>,
  // React's animation and drag handlers collide with motion's props of the same
  // names on the animated root.
  | "children"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
> {
  /** The text to reveal. A plain string, so it can be split without walking children. */
  text: string;
  /** What gets its own mask: letters, words or whole lines. */
  split?: "character" | "word" | "line";
  /** Element rendered at the root. Use the heading level the page actually needs. */
  as?: ElementType;
  /** Seconds each piece takes to clear its mask. */
  duration?: number;
  /** Seconds between one piece starting and the next. */
  stagger?: number;
  /** Seconds before the first piece moves. */
  delay?: number;
  /** How far each piece rises from, as a percentage of its own line height. */
  distance?: number;
  /** Fraction of the element that must be visible before it starts. */
  threshold?: number;
  /** Replay every time it re-enters the viewport instead of only the first time. */
  repeat?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Text uncovered from behind a mask, per character, word or line. Each piece sits in
 * an overflow-hidden box and starts below it, so the glyphs are wiped into place
 * rather than faded — nothing is ever shown at partial opacity.
 *
 * The full string stays in the accessible tree as one label and every split piece is
 * hidden from it, so a screen reader hears "Built for the work that matters" rather
 * than thirty-one separate letters.
 */
export const SplitReveal = forwardRef<HTMLElement, SplitRevealProps>(
  function SplitReveal(
    {
      text,
      split = "character",
      as: Tag = "span",
      duration = 0.8,
      stagger = 0.03,
      delay = 0,
      distance = 110,
      threshold = 0.4,
      repeat = false,
      className,
      ...rest
    },
    ref,
  ) {
    const prefersReduced = useReducedMotion();

    /**
     * Words are kept whole even when splitting by character, so the line can still
     * break at a space and a word is never torn across two lines.
     */
    const groups = useMemo(() => {
      // "line" splits on explicit newlines rather than measuring wrapped lines. A
      // measured split needs layout and has to reflow on every resize, which is a
      // different component; author the breaks and they are honoured exactly.
      if (split === "line") return text.split("\n").map((line) => [line]);
      const words = text.split(/(\s+)/).filter((w) => w.length > 0);
      if (split === "word") return words.map((w) => [w]);
      return words.map((w) => (/^\s+$/.test(w) ? [w] : [...w]));
    }, [text, split]);

    // Memoised: motion.create returns a new component type on every call, and an
    // unmemoised one would remount the entire tree on each render.
    const MotionTag = useMemo(() => motion.create(Tag as ElementType), [Tag]);

    // Reduced motion: the text is simply present. No mask, no transform, no stagger.
    if (prefersReduced) {
      return (
        <Tag ref={ref} className={cn("block", className)} {...rest}>
          {text}
        </Tag>
      );
    }

    let index = -1;

    return (
      <MotionTag
        ref={ref}
        aria-label={text}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: !repeat, amount: threshold }}
        className={cn("block", className)}
        style={{ color: "var(--ui-fg, currentColor)" }}
        {...rest}
      >
        {groups.map((pieces, gi) => (
          <span
            key={`g-${gi}`}
            aria-hidden="true"
            // inline-flex keeps a word's letters together as one breakable unit;
            // an authored line needs its own block so the break actually happens.
            className={
              split === "line"
                ? "block"
                : split === "character"
                  ? "inline-flex"
                  : "inline-block"
            }
            style={{ whiteSpace: "pre" }}
          >
            {pieces.map((piece, pi) => {
              index += 1;
              const at = index;
              return (
                <span
                  key={`p-${gi}-${pi}`}
                  className="inline-block overflow-hidden align-bottom"
                  // Room for descenders, which a tight mask would clip.
                  style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
                >
                  <motion.span
                    className="inline-block"
                    style={{ willChange: "transform" }}
                    variants={{
                      hidden: { y: `${distance}%` },
                      shown: {
                        y: "0%",
                        transition: {
                          duration,
                          delay: delay + at * stagger,
                          ease: EASE,
                        },
                      },
                    }}
                  >
                    {piece}
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </MotionTag>
    );
  },
);

SplitReveal.displayName = "SplitReveal";

export default SplitReveal;
