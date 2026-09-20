"use client";

import {
  forwardRef,
  useCallback,
  useRef,
  type ButtonHTMLAttributes,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/cn";

export interface MagneticButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
> {
  /** How far the button may travel toward the cursor, in pixels. */
  strength?: number;
  /** Capture distance around the button, in pixels. Outside this it does not react. */
  radius?: number;
  /** How far the label travels on top of the button. 0 keeps it centred. */
  labelFactor?: number;
  /** Spring stiffness of the follow and the release. */
  stiffness?: number;
  /** Spring damping. Lower overshoots on release. */
  damping?: number;
  /** Spring mass. Higher feels heavier and arrives later. */
  mass?: number;
  /** Visual weight. */
  variant?: "solid" | "outline" | "ghost";
  /** Height, padding and type size together. */
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-14 px-9 text-base",
} as const;

/**
 * A button that leans toward the cursor within a capture radius and springs back on
 * leave. The label travels a further fraction on top of the button's own movement, so
 * the two arrive at different rates — that lag is what reads as weight and is what
 * separates this from a plain translate.
 *
 * The pull falls off with distance, so it is strongest dead centre and zero at the
 * edge of the radius rather than snapping on. Coarse pointers and reduced motion skip
 * the effect entirely and get an ordinary button.
 */
export const MagneticButton = forwardRef<
  HTMLButtonElement,
  MagneticButtonProps
>(function MagneticButton(
  {
    strength = 18,
    radius = 90,
    labelFactor = 0.35,
    stiffness = 300,
    damping = 40,
    mass = 0.4,
    variant = "solid",
    size = "md",
    className,
    children,
    ...rest
  },
  forwardedRef,
) {
  const localRef = useRef<HTMLButtonElement | null>(null);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness, damping, mass };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  // Derived, not a second spring: the label is always a fixed fraction ahead.
  const labelX = useTransform(sx, (v) => v * labelFactor);
  const labelY = useTransform(sy, (v) => v * labelFactor);

  const setRefs = useCallback(
    (node: HTMLButtonElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      // A coarse pointer has no hover state, so there is nothing to lean toward.
      if (prefersReduced || event.pointerType !== "mouse") return;
      const el = localRef.current;
      if (!el) return;

      const box = el.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      const distance = Math.hypot(dx, dy);

      if (distance > radius) {
        x.set(0);
        y.set(0);
        return;
      }

      const pull = (1 - distance / radius) * strength;
      x.set((dx / (distance || 1)) * pull);
      y.set((dy / (distance || 1)) * pull);
    },
    [prefersReduced, radius, strength, x, y],
  );

  // Blur matters as much as pointer leave: a keyboard user tabbing away must not
  // leave the button parked off-centre.
  const release = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const surface =
    variant === "solid"
      ? {
          background: "var(--ui-accent, currentColor)",
          color: "var(--ui-accent-fg, canvas)",
          borderColor: "transparent",
        }
      : variant === "outline"
        ? {
            background: "transparent",
            color: "var(--ui-fg, currentColor)",
            borderColor: "var(--ui-border, currentColor)",
          }
        : {
            background: "transparent",
            color: "var(--ui-fg, currentColor)",
            borderColor: "transparent",
          };

  return (
    <motion.button
      ref={setRefs}
      type="button"
      onPointerMove={onPointerMove}
      onPointerLeave={release}
      onBlur={release}
      style={{
        x: prefersReduced ? 0 : sx,
        y: prefersReduced ? 0 : sy,
        borderRadius: "var(--ui-radius, 9999px)",
        borderWidth: 1,
        borderStyle: "solid",
        outlineColor: "var(--ui-ring, currentColor)",
        ...surface,
      }}
      className={cn(
        "relative inline-flex select-none items-center justify-center font-medium",
        "outline-offset-2 focus-visible:outline focus-visible:outline-2",
        "disabled:pointer-events-none disabled:opacity-50",
        SIZES[size],
        className,
      )}
      {...rest}
    >
      <motion.span
        className="pointer-events-none"
        style={{
          x: prefersReduced ? 0 : labelX,
          y: prefersReduced ? 0 : labelY,
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
});

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
