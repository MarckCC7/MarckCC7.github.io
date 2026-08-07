import type { ReactNode } from 'react';

import { Container } from './Container';
import { cn } from '@utils/cn';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  size?: 'default' | 'wide' | 'prose';
}

/**
 * Vertical rhythm wrapper.
 *
 * `scroll-mt` accounts for the fixed navbar so anchor links do not land with
 * the heading tucked underneath it.
 */
export function Section({
  id,
  children,
  className,
  containerClassName,
  size = 'default',
}: SectionProps) {
  return (
    <section id={id} className={cn('relative scroll-mt-24 py-section', className)}>
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
