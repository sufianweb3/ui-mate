"use client";

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
} from "react";
import { useReducedMotion } from "motion/react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/cn";

export interface FadeInProps extends HTMLAttributes<HTMLDivElement> {
  /** Element rendered at the root. Use a list element when wrapping list items. */
  as?: ElementType;
  /** Seconds of the fade and rise. */
  duration?: number;
  /** Seconds before it starts. */
  delay?: number;
  /** How far it rises from, in pixels. Negative values drop in from above. */
  distance?: number;
  /** Fraction of the element that must be visible before it fires. */
  threshold?: number;
  /** Shift the trigger line. A negative bottom margin fires later. */
  rootMargin?: string;
  /** Animate direct children in sequence rather than the wrapper as one block. */
  stagger?: number;
  /** Replay on every re-entry instead of latching after the first. */
  repeat?: boolean;
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * The generic in-view wrapper: fades and rises whatever it is given, once, when it
 * reaches the viewport. Deliberately the dullest component in the library — it is the
 * one that gets used a hundred times, so it does exactly one thing and adds no markup
 * of its own beyond the root.
 *
 * With `stagger` set it animates its direct children in sequence instead, which is the
 * only reason to reach past a plain CSS transition.
 *
 * The content is always rendered and always in the accessible tree; only opacity and
 * transform change. Nothing is gated on being seen.
 */
export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(function FadeIn(
  {
    as: Tag = "div",
    duration = 0.6,
    delay = 0,
    distance = 16,
    threshold = 0.15,
    rootMargin = "0px",
    stagger = 0,
    repeat = false,
    className,
    style,
    children,
    ...rest
  },
  forwardedRef,
) {
  const prefersReduced = useReducedMotion();

  // #0006. `disabled` short-circuits the observer entirely under reduced motion, so
  // there is no observer, no transition and no waiting — the content is just there.
  const [inViewRef, inView] = useInView<HTMLDivElement>({
    threshold,
    rootMargin,
    once: !repeat,
    disabled: Boolean(prefersReduced),
  });

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      inViewRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef, inViewRef],
  );

  const shown = prefersReduced || inView;

  const transition = (index: number): string =>
    prefersReduced
      ? "none"
      : `opacity ${duration}s ${EASE} ${delay + index * stagger}s, transform ${duration}s ${EASE} ${delay + index * stagger}s`;

  const hidden = {
    opacity: 0,
    transform: `translate3d(0, ${distance}px, 0)`,
  } as const;
  const visible = { opacity: 1, transform: "translate3d(0, 0, 0)" } as const;

  if (stagger > 0) {
    return (
      <Tag ref={setRefs} className={cn(className)} style={style} {...rest}>
        {/*
          The style is merged onto each child rather than into a wrapper div, so an
          `as="ul"` keeps valid `li` children and a grid parent keeps its direct
          children as grid items. A child's own style still wins.
        */}
        {Children.map(children, (child, i) => {
          if (!isValidElement(child)) return child;
          const element = child as ReactElement<{ style?: CSSProperties }>;
          return cloneElement(element, {
            style: {
              ...(shown ? visible : hidden),
              transition: transition(i),
              willChange: prefersReduced ? undefined : "opacity, transform",
              ...element.props.style,
            },
          });
        })}
      </Tag>
    );
  }

  return (
    <Tag
      ref={setRefs}
      className={cn(className)}
      style={{
        ...(shown ? visible : hidden),
        transition: transition(0),
        willChange: prefersReduced ? undefined : "opacity, transform",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
});

FadeIn.displayName = "FadeIn";

export default FadeIn;
