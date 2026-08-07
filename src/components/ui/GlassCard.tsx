import { useRef, type ElementType, type MouseEvent, type ReactNode } from 'react';

import { usePrefersReducedMotion } from '@hooks/useMediaQuery';
import { cn } from '@utils/cn';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Adds the animated conic border on hover. */
  glow?: boolean;
  /** A light that follows the pointer across the surface. */
  spotlight?: boolean;
}

/**
 * The site's default surface.
 *
 * The spotlight writes pointer coordinates straight into CSS custom properties
 * on the node. Going through React state here would re-render the card on every
 * mousemove — at 120 Hz, across a grid of cards, that is the difference between
 * "premium" and "janky".
 */
export function GlassCard({
  children,
  className,
  as: Tag = 'div',
  glow = false,
  spotlight = true,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const enableSpotlight = spotlight && !reducedMotion;

  // `as` only ever receives layout/semantic tags, so borrowing div's prop types
  // keeps `ref` and the DOM handlers checked instead of collapsing to `any`.
  const Component = Tag as 'div';

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!enableSpotlight) return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    node.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <Component
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        'group/card glass relative isolate overflow-hidden rounded-3xl',
        'transition-[border-color,box-shadow,transform] duration-500 ease-garden',
        glow && 'ring-conic',
        className,
      )}
    >
      {enableSpotlight && (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500',
            'group-hover/card:opacity-100',
            'bg-[radial-gradient(340px_circle_at_var(--mx,50%)_var(--my,50%),var(--glass-fill-strong),transparent_70%)]',
          )}
        />
      )}
      {children}
    </Component>
  );
}
