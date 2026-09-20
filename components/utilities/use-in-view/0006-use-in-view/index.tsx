"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export interface UseInViewProps {
  /** 0 to 1. How much of the element must be visible before it counts as in view. */
  threshold?: number;
  /** CSS margin shorthand grown around the root bounds. Negative values fire later. */
  rootMargin?: string;
  /** Stop observing after the first entry. The default, because reveals run once. */
  once?: boolean;
  /**
   * Skip observing and report true immediately. Reveals pass their reduced-motion
   * flag here so content appears at once instead of waiting for a scroll.
   */
  disabled?: boolean;
}

export type UseInViewOptions = UseInViewProps;

/**
 * IntersectionObserver as a hook, returning a ref to attach and a boolean.
 *
 * Reports `true` when IntersectionObserver is unavailable rather than `false`, so a
 * reveal built on it can never leave content permanently invisible in an environment
 * that cannot observe — the failure mode is "shown early", never "never shown".
 */
export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.2,
  rootMargin = "0px",
  once = true,
  disabled = false,
}: UseInViewProps = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (disabled) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, disabled]);

  return [ref, inView];
}

export default useInView;
