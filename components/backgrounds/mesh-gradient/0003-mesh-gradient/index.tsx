"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
} from "react";
import { useReducedMotion } from "motion/react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/cn";

export interface MeshGradientProps extends HTMLAttributes<HTMLDivElement> {
  /** Token names sampled for the blend points. Three to five reads best. */
  colors?: string[];
  /** Number of blend points. More than six turns to mud at any size. */
  points?: number;
  /** Drift rate. 0 renders a single static frame and never starts a loop. */
  speed?: number;
  /** Blur radius as a fraction of the shorter viewport edge. */
  blur?: number;
  /** Opacity of the noise overlay that stops the blend banding. 0 removes it. */
  grain?: number;
  /** Deterministic layout. The same seed always produces the same arrangement. */
  seed?: number;
  /** Cap the backing store. 1 is sharp and expensive, 0.5 is usually invisible. */
  resolution?: number;
}

/** Mulberry32 — small, fast and deterministic, so a seed is genuinely reproducible. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Resolves a --ui-* token to a concrete color by reading the computed style of the
 * element the canvas actually sits in, so the canvas inherits the same theme cascade
 * as everything else and follows a light/dark switch without being told.
 */
function readToken(el: HTMLElement, token: string, fallback: string): string {
  const value = getComputedStyle(el).getPropertyValue(token).trim();
  return value || fallback;
}

/**
 * Multi-point blended color field drifting behind content. Each point is a radial
 * gradient orbiting its own anchor on its own period, so the field never repeats
 * visibly — there is no loop length to notice.
 *
 * Decorative by contract: aria-hidden, no children, and it costs nothing while
 * offscreen because the animation frame is only scheduled while it is in view.
 */
export const MeshGradient = forwardRef<HTMLDivElement, MeshGradientProps>(
  function MeshGradient(
    {
      colors = ["--ui-accent", "--ui-bg-subtle", "--ui-muted"],
      points = 5,
      speed = 0.4,
      blur = 0.18,
      grain = 0.035,
      seed = 7,
      resolution = 0.6,
      className,
      style,
      ...rest
    },
    forwardedRef,
  ) {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const frameRef = useRef<number>(0);
    const prefersReduced = useReducedMotion();

    // #0006. The canvas is idle whenever it is scrolled past — once: false, because
    // this needs to stop again, not just start once.
    const [inViewRef, inView] = useInView<HTMLDivElement>({
      threshold: 0,
      once: false,
    });

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        hostRef.current = node;
        inViewRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef, inViewRef],
    );

    // A static field under reduced motion: the same composition, simply not moving.
    const animate = !prefersReduced && speed > 0;

    useEffect(() => {
      const host = hostRef.current;
      const canvas = canvasRef.current;
      if (!host || !canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const random = rng(seed);
      const blobs = Array.from({ length: points }, (_, i) => ({
        token: colors[i % colors.length] ?? "--ui-accent",
        // Anchors are inset so no blob parks in a corner and leaves a dead quarter.
        ax: 0.15 + random() * 0.7,
        ay: 0.15 + random() * 0.7,
        orbit: 0.08 + random() * 0.16,
        period: 9 + random() * 14,
        phase: random() * Math.PI * 2,
        scale: 0.55 + random() * 0.5,
      }));

      let width = 0;
      let height = 0;

      const resize = (): void => {
        const box = host.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2) * resolution;
        width = Math.max(1, Math.floor(box.width));
        height = Math.max(1, Math.floor(box.height));
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      const draw = (elapsed: number): void => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = readToken(host, "--ui-bg", "transparent");
        ctx.fillRect(0, 0, width, height);

        const short = Math.min(width, height);
        ctx.globalCompositeOperation = "lighter";

        for (const b of blobs) {
          // Each blob rides its own period, so the whole field has no common cycle.
          const t = (elapsed / 1000) * speed;
          const cx =
            (b.ax + Math.cos(t / b.period + b.phase) * b.orbit) * width;
          const cy =
            (b.ay + Math.sin(t / b.period + b.phase * 1.7) * b.orbit) * height;
          const r = short * b.scale;

          const color = readToken(host, b.token, "currentColor");
          const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          gradient.addColorStop(0, color);
          // color-mix fades to fully transparent in whatever space the token uses.
          gradient.addColorStop(
            1,
            `color-mix(in oklab, ${color} 0%, transparent)`,
          );
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";
      };

      resize();
      const observer = new ResizeObserver(() => {
        resize();
        draw(performance.now());
      });
      observer.observe(host);

      if (!animate || !inView) {
        // Draw one frame so the field is present, then schedule nothing.
        draw(animate ? performance.now() : 0);
        return () => observer.disconnect();
      }

      const loop = (now: number): void => {
        draw(now);
        frameRef.current = requestAnimationFrame(loop);
      };
      frameRef.current = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(frameRef.current);
        observer.disconnect();
      };
      // `colors` is compared by value: a default array literal is a fresh identity on
      // every render and would otherwise tear down and rebuild the canvas each time.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colors.join(","), points, speed, seed, resolution, animate, inView]);

    return (
      <div
        ref={setRefs}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className,
        )}
        style={{ background: "var(--ui-bg, transparent)", ...style }}
        {...rest}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ filter: `blur(${blur * 100}px)`, transform: "scale(1.15)" }}
        />
        {grain > 0 && (
          <div
            className="absolute inset-0"
            style={{
              opacity: grain,
              mixBlendMode: "overlay",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
        )}
      </div>
    );
  },
);

MeshGradient.displayName = "MeshGradient";

export default MeshGradient;
