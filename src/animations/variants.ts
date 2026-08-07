import type { Transition, Variants } from 'framer-motion';

import { easeGarden, easeSmooth } from './easings';

/**
 * Shared Framer Motion variants.
 *
 * Every reveal on the site pulls from here. If a section ever needs a bespoke
 * animation, it is a sign the section is trying too hard.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: easeGarden },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeGarden } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -26 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeGarden } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeGarden } },
};

/**
 * Parent container that staggers its children.
 * Children must use `hidden` / `visible` variant names to participate.
 */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Word-by-word headline reveal. Pair with `splitWords()`. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '0.55em', rotateX: -35 },
  visible: {
    opacity: 1,
    y: '0em',
    rotateX: 0,
    transition: { duration: 0.85, ease: easeGarden },
  },
};

/** Route-level crossfade. Kept short — page transitions must never feel slow. */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeGarden } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.28, ease: easeSmooth } },
};

/** A plant growing from the soil. Used in the garden and the roadmap tree. */
export const growUp: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 1, ease: easeGarden },
  },
};

/** Default viewport config for scroll reveals — fires once, slightly early. */
export const revealViewport = { once: true, amount: 0.25, margin: '0px 0px -12% 0px' } as const;

export const hoverLift: Transition = { duration: 0.4, ease: easeGarden };
