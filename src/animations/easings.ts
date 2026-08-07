/**
 * Motion vocabulary.
 *
 * Three curves, used everywhere. A site that uses eleven different easings
 * feels assembled; one that uses three feels designed.
 */

/** Decelerating. Default for anything entering the screen. */
export const easeGarden = [0.22, 1, 0.36, 1] as const;

/** Symmetric. For state changes that are neither arrival nor exit. */
export const easeSmooth = [0.65, 0, 0.35, 1] as const;

/** Slight overshoot. Reserved for playful, small, deliberate moments. */
export const easeSpring = [0.34, 1.56, 0.64, 1] as const;

/** Physical spring for cursor and drag-like interactions. */
export const springSoft = { type: 'spring', stiffness: 260, damping: 30, mass: 0.6 } as const;
export const springSnappy = { type: 'spring', stiffness: 420, damping: 32, mass: 0.5 } as const;
