import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type MouseEvent, type ReactNode } from 'react';

import { usePrefersReducedMotion, useIsTouchDevice } from '@hooks/useMediaQuery';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to be pulled, as a fraction of the offset. */
  strength?: number;
}

/**
 * Pulls an element gently toward the pointer while it hovers.
 *
 * Reserved for a handful of elements — the logo, the scroll cue, the hidden
 * NPC. Applied everywhere it becomes noise; applied sparingly it is the detail
 * people remember.
 */
export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();

  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 22, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 22, mass: 0.4 });

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const centreX = rect.left + rect.width / 2;
    const centreY = rect.top + rect.height / 2;

    x.set((event.clientX - centreX) * strength);
    y.set((event.clientY - centreY) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (reducedMotion || isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
