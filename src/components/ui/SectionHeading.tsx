import type { ReactNode } from 'react';

import { Reveal } from '@components/motion/Reveal';
import { TextReveal } from '@components/motion/TextReveal';
import { cn } from '@utils/cn';

interface SectionHeadingProps {
  /** Small pixel-font label above the title, e.g. `01 · Sobre mí`. */
  eyebrow: string;
  title: string;
  /** One or two sentences. Sets up the section without explaining it away. */
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}

/**
 * The section header used everywhere.
 *
 * One component means the vertical rhythm between eyebrow, title and lead
 * paragraph is identical on every screen — which is most of what makes a page
 * feel designed rather than assembled.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  children,
}: SectionHeadingProps) {
  const centred = align === 'center';

  return (
    <div className={cn('flex flex-col gap-5', centred && 'items-center text-center', className)}>
      <Reveal>
        <span className="text-pixel inline-flex items-center gap-2.5 text-[0.5625rem] text-moss-300">
          <span aria-hidden className="h-px w-6 bg-moss-400/50" />
          {eyebrow}
        </span>
      </Reveal>

      <TextReveal
        as="h2"
        text={title}
        className={cn('text-display-sm text-ink', centred ? 'max-w-3xl' : 'max-w-4xl')}
      />

      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'leading-relaxed text-base text-ink-secondary sm:text-lg',
              centred ? 'mx-auto max-w-2xl' : 'max-w-2xl',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  );
}
