import { motion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

import { fadeUp, revealViewport, staggerContainer } from '@animations/variants';
import { usePrefersReducedMotion } from '@hooks/useMediaQuery';
import { cn } from '@utils/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after entering the viewport. */
  delay?: number;
  variants?: Variants;
  as?: ElementType;
}

/**
 * Reveals its children once, when they scroll into view.
 *
 * Under `prefers-reduced-motion` the element renders in its final state
 * immediately — the content still arrives, it just does not travel.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = 'div',
}: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motion[as as 'div'];

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

/**
 * Staggers direct children that use the `hidden` / `visible` variant names.
 * Wrap `RevealItem`s, or any element with matching variants.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer(stagger, delay)}
    >
      {children}
    </motion.div>
  );
}

/** A child of `RevealGroup`. Inherits the parent's stagger timing. */
export function RevealItem({
  children,
  className,
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
}
