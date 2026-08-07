import { useEffect } from 'react';
import Lenis from 'lenis';

import { publishScroll } from '@lib/scroll-bus';

import { usePrefersReducedMotion, useIsTouchDevice } from './useMediaQuery';

/**
 * Momentum scrolling, tuned to feel like a heavy, well-oiled drawer.
 *
 * Deliberately disabled when the visitor asked for reduced motion, and on
 * touch devices — mobile browsers already have excellent native inertia, and
 * hijacking it is the single most common way premium sites feel broken.
 */
export function useSmoothScroll(): void {
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
      wheelMultiplier: 0.9,
    });

    // Anything that needs to react to the smoothed scroll position subscribes
    // to the bus. Keeping that indirection here is what lets GSAP stay out of
    // the initial bundle — see `lib/scroll-bus.ts`.
    lenis.on('scroll', publishScroll);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.off('scroll', publishScroll);
      lenis.destroy();
    };
  }, [reducedMotion, isTouch]);
}
