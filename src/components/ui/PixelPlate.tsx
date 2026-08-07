import type { CSSProperties } from 'react';

import { cn } from '@utils/cn';

interface PixelPlateProps {
  /** 1–3 characters. Longer text will not fit the plate. */
  mark: string;
  /** CSS colour used for the glow and the text. */
  accent?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: 'h-9 w-9 text-[0.5rem]',
  md: 'h-12 w-12 text-[0.625rem]',
  lg: 'h-16 w-16 text-xs',
} as const;

/**
 * A monogram on a pixel plate — the site's stand-in for a technology logo.
 *
 * Sharp corners on purpose: this is the one place where the RPG layer is
 * allowed to break the otherwise rounded geometry, which is exactly what makes
 * it read as a deliberate detail rather than an inconsistency.
 */
export function PixelPlate({ mark, accent, size = 'md', className }: PixelPlateProps) {
  return (
    <span
      aria-hidden
      style={accent ? ({ '--plate-accent': accent } as CSSProperties) : undefined}
      className={cn(
        'relative grid shrink-0 place-items-center',
        // Stepped corners, drawn with a clip-path instead of a border radius.
        '[clip-path:polygon(4px_0,calc(100%-4px)_0,100%_4px,100%_calc(100%-4px),calc(100%-4px)_100%,4px_100%,0_calc(100%-4px),0_4px)]',
        'border border-line-strong bg-elevated/80',
        'text-pixel text-[var(--plate-accent,var(--moss-300))]',
        'transition-[box-shadow,background-color,transform] duration-400 ease-garden',
        'group-hover/tech:-translate-y-0.5 group-hover/tech:bg-overlay',
        'group-hover/tech:shadow-[0_0_0_1px_var(--plate-accent,var(--moss-300)),0_12px_28px_-14px_var(--plate-accent,var(--moss-300))]',
        SIZES[size],
        className,
      )}
    >
      {mark}
    </span>
  );
}
