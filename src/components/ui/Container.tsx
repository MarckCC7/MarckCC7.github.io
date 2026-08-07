import type { ElementType, ReactNode } from 'react';

import { cn } from '@utils/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** `wide` for galleries, `prose` for long-form reading. */
  size?: 'default' | 'wide' | 'prose';
  as?: ElementType;
}

const SIZES = {
  default: 'max-w-shell',
  wide: 'max-w-[96rem]',
  prose: 'max-w-prose',
} as const;

/** The single horizontal rhythm of the site. Nothing sets its own page margin. */
export function Container({
  children,
  className,
  size = 'default',
  as: Tag = 'div',
}: ContainerProps) {
  // `as` only ever receives layout tags; borrowing div's props keeps this typed.
  const Component = Tag as 'div';

  return (
    <Component className={cn('mx-auto w-full px-gutter', SIZES[size], className)}>
      {children}
    </Component>
  );
}
