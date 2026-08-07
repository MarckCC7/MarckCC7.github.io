import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { onSmoothScroll } from './scroll-bus';

/**
 * GSAP is registered here and only here.
 *
 * ── Why GSAP at all, when the site already uses Framer Motion ──────────────
 *
 * Framer Motion owns everything state-driven: enter/exit, layout, hover,
 * gestures, route transitions. It is better than GSAP at all of that, and
 * mixing two animation libraries for the same job is how codebases rot.
 *
 * ScrollTrigger earns its place on exactly one problem: scrubbing a timeline
 * across many independent targets while the scroll position drives playback.
 * Framer's `useScroll` drives one value elegantly; orchestrating dozens of
 * staggered targets against a scroll range means hand-rolling the interpolation
 * ScrollTrigger already does — with better batching and correct refresh on
 * resize.
 *
 * ── Why this module is only ever imported dynamically ─────────────────────
 *
 * GSAP + ScrollTrigger is ~27 kB gzipped. One scroll effect does not justify
 * putting that on the critical path, so the single consumer imports it with
 * `await import('@lib/gsap')` inside an effect. It arrives after first paint,
 * in its own chunk, and never at all for visitors who prefer reduced motion.
 *
 * If a future effect does not need scrubbing, it does not need GSAP.
 */
gsap.registerPlugin(ScrollTrigger);

/* Lenis animates `window.scrollY` on its own schedule. Without this handoff,
   ScrollTrigger reads a stale position and every scrub trails the page by a
   frame or two — subtle, but exactly what makes scroll effects feel cheap. */
onSmoothScroll(() => ScrollTrigger.update());

export { gsap, ScrollTrigger };
