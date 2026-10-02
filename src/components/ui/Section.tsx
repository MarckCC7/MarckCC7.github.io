import type { ReactNode } from 'react';

import { Container } from './Container';
import { cn } from '@utils/cn';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  size?: 'default' | 'wide' | 'prose';
  /** Custom sections define their own vertical rhythm in the component stylesheet. */
  spacing?: 'default' | 'custom';
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
  spacing = 'default',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative scroll-mt-24', spacing === 'default' && 'py-section', className)}
    >
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
