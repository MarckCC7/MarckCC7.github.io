import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

import { usePrefersReducedMotion } from '@hooks/useMediaQuery';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * Travel distance in pixels across the full scroll range.
   * Negative moves against the scroll (feels further away).
   */
  distance?: number;
}

/**
 * Moves its children slower than the page as they pass through the viewport.
 *
 * The offset is smoothed with a spring so it never snaps during fast flicks or
 * trackpad momentum — unsmoothed scroll-linked motion is the number one cause
 * of parallax feeling cheap.
 */
export function Parallax({ children, className, distance = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="gpu">
        {children}
      </motion.div>
    </div>
  );
}
