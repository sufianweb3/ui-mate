import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type { ClassValue };

/**
 * The class merge every component root in this library uses.
 *
 * Two steps, and the second is the one that matters. `clsx` flattens arrays,
 * objects and conditionals into a string. `tailwind-merge` then resolves Tailwind
 * conflicts by last-one-wins *per utility group*, so a caller passing `px-8`
 * replaces the component's own `px-6` rather than landing beside it and losing to
 * whichever CSS rule happens to come later in the stylesheet.
 *
 * That is what makes `className` a real override rather than a suggestion, and it
 * is why every component in the library merges through this instead of a template
 * literal.
 *
 * No "use client": this is a pure function with no hooks and no browser API, so it
 * runs in a server component untouched.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export default cn;
