import { motion } from 'framer-motion';
import type { ElementType } from 'react';

import { staggerContainer, wordReveal } from '@animations/variants';
import { usePrefersReducedMotion } from '@hooks/useMediaQuery';
import { splitWords } from '@utils/text';
import { cn } from '@utils/cn';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of waiting for the viewport — used in the hero. */
  immediate?: boolean;
}

/**
 * Reveals a headline word by word, each word tipping up from below its own
 * baseline.
 *
 * Words, not letters: letter-by-letter animation destroys the ability to
 * select or read text mid-animation, and at display sizes it reads as a gimmick.
 * Every word stays a real, selectable, screen-reader-friendly string — the
 * whole phrase is also exposed once via `aria-label`.
 */
export function TextReveal({
  text,
  className,
  as = 'span',
  delay = 0,
  stagger = 0.055,
  immediate = false,
}: TextRevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const words = splitWords(text);
  const Component = motion[as as 'span'];

  if (reducedMotion) {
    const Static = as as 'span';
    return <Static className={className}>{text}</Static>;
  }

  const animation = immediate
    ? { animate: 'visible' as const }
    : { whileInView: 'visible' as const, viewport: { once: true, amount: 0.6 } };

  return (
    <Component
      className={cn('inline-block [perspective:800px]', className)}
      aria-label={text}
      initial="hidden"
      variants={staggerContainer(stagger, delay)}
      {...animation}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span variants={wordReveal} className="inline-block [transform-origin:bottom]">
            {word}
            {index < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
