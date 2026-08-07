import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type MouseEvent, type ReactNode } from 'react';

import { usePrefersReducedMotion } from '@hooks/useMediaQuery';
import { cn } from '@utils/cn';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. Keep it small — this is a hint, not a toy. */
  intensity?: number;
}

/**
 * Subtle 3D tilt toward the pointer.
 *
 * Motion values, not state: the transform is written straight to the DOM by
 * Framer's animation loop, so a grid of tilting cards costs zero React renders.
 * 6 degrees is the ceiling — past roughly 10 the effect stops reading as depth
 * and starts reading as a novelty.
 */
export function TiltCard({ children, className, intensity = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 240, damping: 22, mass: 0.5 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);

  const transform = useMotionTemplate`perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    // Normalise the pointer into [-0.5, 0.5] on both axes.
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    x.set(px * intensity * 2);
    y.set(-py * intensity * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      style={{ transform, transformStyle: 'preserve-3d' }}
      className={cn('gpu', className)}
    >
      {children}
    </motion.div>
  );
}
