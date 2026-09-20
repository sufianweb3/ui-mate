"use client";

import { forwardRef, useCallback, useRef, type HTMLAttributes } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Radius of the highlight in pixels. */
  size?: number;
  /** Peak opacity of the interior highlight, 0 to 1. */
  intensity?: number;
  /** Peak opacity of the matching border glow, 0 to 1. Set 0 for interior only. */
  borderIntensity?: number;
  /** Token the light is made from. */
  color?: string;
  /** Seconds the highlight takes to fade in on enter and out on leave. */
  fade?: number;
}

/**
 * A radial highlight inside the card tracking the pointer, with a matching glow on the
 * border picked out by a mask. The interior light and the edge light share one origin,
 * which is what makes the card read as lit rather than as a card with a gradient on it.
 *
 * Position is written to CSS custom properties rather than React state, so moving the
 * pointer never re-renders. That is the whole reason this stays cheap with a grid of
 * twenty cards on screen.
 */
export const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  function SpotlightCard(
    {
      size = 320,
      intensity = 0.1,
      borderIntensity = 0.55,
      color = "--ui-accent",
      fade = 0.3,
      className,
      style,
      children,
      ...rest
    },
    forwardedRef,
  ) {
    const localRef = useRef<HTMLDivElement | null>(null);
    // The light itself is not motion, but its fade is. Reduced motion keeps the
    // spotlight and makes it appear instantly rather than removing the feedback.
    const prefersReduced = useReducedMotion();
    const effectiveFade = prefersReduced ? 0 : fade;

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef],
    );

    const onPointerMove = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        const el = localRef.current;
        if (!el) return;
        const box = el.getBoundingClientRect();
        // Custom properties, not state: no re-render on pointer move.
        el.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
        el.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
        el.style.setProperty("--spot-on", "1");
      },
      [],
    );

    const onPointerLeave = useCallback(() => {
      localRef.current?.style.setProperty("--spot-on", "0");
    }, []);

    const light = `radial-gradient(var(--spot-size) circle at var(--spot-x) var(--spot-y), var(${color}, currentColor), transparent 70%)`;

    return (
      <div
        ref={setRefs}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className={cn("group relative overflow-hidden", className)}
        style={
          {
            "--spot-x": "50%",
            "--spot-y": "50%",
            "--spot-on": "0",
            "--spot-size": `${size}px`,
            "--spot-fade": `${effectiveFade}s`,
            background: "var(--ui-bg-elevated, transparent)",
            color: "var(--ui-fg, currentColor)",
            border: "1px solid var(--ui-border, currentColor)",
            borderRadius: "var(--ui-radius, 1rem)",
            ...style,
          } as React.CSSProperties
        }
        {...rest}
      >
        {/* The border glow: the same light, masked to the 1px edge only. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px"
          style={{
            borderRadius: "inherit",
            padding: 1,
            background: light,
            opacity: `calc(var(--spot-on) * ${borderIntensity})`,
            transition: `opacity var(--spot-fade) ease`,
            WebkitMask:
              "linear-gradient(currentColor 0 0) content-box exclude, linear-gradient(currentColor 0 0)",
            mask: "linear-gradient(currentColor 0 0) content-box exclude, linear-gradient(currentColor 0 0)",
          }}
        />

        {/* The interior light, well below the border's opacity so text stays legible. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius: "inherit",
            background: light,
            opacity: `calc(var(--spot-on) * ${intensity})`,
            transition: `opacity var(--spot-fade) ease`,
          }}
        />

        <div className="relative">{children}</div>
      </div>
    );
  },
);

SpotlightCard.displayName = "SpotlightCard";

export default SpotlightCard;
