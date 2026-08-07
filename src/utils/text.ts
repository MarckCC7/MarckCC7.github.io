/**
 * Splits a headline into words. Each word becomes its own animated element,
 * so the line still wraps naturally at any viewport width.
 */
export function splitWords(text: string): string[] {
  return text.split(' ').filter(Boolean);
}

/** Combining diacritical marks left over after NFD normalisation. */
const COMBINING_MARKS = /\p{Diacritic}/gu;

/** `Ingeniería de Software` → `ingenieria-de-software`. Used for anchor ids. */
export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Trims to a word boundary and appends an ellipsis. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

/** Clamps a number into `[min, max]`. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
