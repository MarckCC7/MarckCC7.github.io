import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Conditional class names with conflict resolution.
 *
 * `clsx` handles the conditionals, `tailwind-merge` makes sure a caller's
 * `px-8` actually beats a component's default `px-4` instead of both landing
 * in the class list and letting source order decide.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
