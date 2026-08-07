import { Reveal } from '@components/motion/Reveal';
import { TextReveal } from '@components/motion/TextReveal';
import { Container } from '@components/ui/Container';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

/**
 * The header of every inner page.
 *
 * Padded to clear the fixed navbar, and deliberately shorter than the home
 * hero — an inner page should start delivering immediately.
 */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="pt-36 pb-14 sm:pt-40">
      <Container>
        <Reveal>
          <span className="text-pixel inline-flex items-center gap-2.5 text-[0.5625rem] text-moss-300">
            <span aria-hidden className="h-px w-6 bg-moss-400/50" />
            {eyebrow}
          </span>
        </Reveal>

        <TextReveal as="h1" immediate text={title} className="mt-6 max-w-4xl text-display-md" />

        {description && (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl leading-relaxed text-base text-ink-secondary sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}

        {children}
      </Container>
    </header>
  );
}
