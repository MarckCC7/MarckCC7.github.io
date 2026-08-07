import type { ReactNode } from 'react';

import { cn } from '@utils/cn';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  /** A small pulsing dot — use it for live states like "en progreso". */
  dot?: string;
  pulse?: boolean;
}

/** Small status pill. Tone comes from the caller via `className`. */
export function Badge({ children, className, dot, pulse = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1',
        'font-mono text-[0.6875rem] tracking-[0.08em] uppercase',
        'border-line-strong text-ink-secondary',
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && (
            <span
              className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-70',
                dot,
              )}
            />
          )}
          <span className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', dot)} />
        </span>
      )}
      {children}
    </span>
  );
}
