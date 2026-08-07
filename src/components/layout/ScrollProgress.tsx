import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A vine growing along the top of the viewport as the page is read.
 *
 * The spring smoothing matters more than it looks: a raw `scrollYProgress`
 * binding stutters on trackpads, and a stuttering progress bar reads as a
 * performance problem even when nothing else on the page is dropping frames.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-px origin-left bg-gradient-to-r from-moss-500 via-moss-300 to-azure-400"
    />
  );
}
