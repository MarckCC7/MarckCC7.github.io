import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { usePreferences } from '@hooks/usePreferences';
import { cn } from '@utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'moss';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-azure-500 text-white shadow-glow hover:bg-azure-400 [--sheen:rgba(255,255,255,0.35)]',
  moss: 'bg-moss-500 text-graphite-950 shadow-glow-moss hover:bg-moss-400 [--sheen:rgba(255,255,255,0.4)]',
  secondary:
    'glass text-ink hover:border-line-strong hover:bg-elevated/60 [--sheen:rgba(255,255,255,0.18)]',
  ghost:
    'text-ink-secondary hover:text-ink hover:bg-elevated/50 border border-transparent [--sheen:transparent]',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.8125rem] gap-1.5 rounded-xl',
  md: 'h-11 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-13 px-7 text-[0.9375rem] gap-2.5 rounded-2xl',
};

const BASE = cn(
  'group/btn relative isolate inline-flex items-center justify-center overflow-hidden select-none',
  'font-medium tracking-[-0.01em] whitespace-nowrap',
  'transition-[background-color,border-color,color,box-shadow] duration-300 ease-garden',
  'disabled:pointer-events-none disabled:opacity-45',
);

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  /** Rendered after the label — usually an arrow or a small icon. */
  trailing?: ReactNode;
  leading?: ReactNode;
}

/**
 * The sheen: a highlight that sweeps across on hover.
 *
 * Rendered as a sibling rather than a `::before` so it can be animated
 * independently of the button's own transitions.
 */
function Sheen() {
  return (
    <span
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 translate-x-[-120%] skew-x-[-18deg]',
        'bg-[linear-gradient(90deg,transparent,var(--sheen),transparent)]',
        'transition-transform duration-700 ease-garden group-hover/btn:translate-x-[120%]',
      )}
    />
  );
}

/* ── Button ─────────────────────────────────────────────────────────────── */

/**
 * `HTMLMotionProps`, not `ComponentPropsWithoutRef`: React's DOM prop types and
 * Framer's animation props collide on names like `onAnimationStart`, and using
 * Framer's own type is the fix rather than casting the spread away.
 */
type ButtonProps = CommonProps & Omit<HTMLMotionProps<'button'>, 'children' | 'className'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', children, className, trailing, leading, onClick, ...rest },
  ref,
) {
  const { play } = usePreferences();

  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      data-cursor="button"
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      onClick={(event) => {
        play('select');
        onClick?.(event);
      }}
      {...rest}
    >
      <Sheen />
      {leading}
      {children}
      {trailing}
    </motion.button>
  );
});

/* ── ButtonLink ─────────────────────────────────────────────────────────── */

type ButtonLinkProps = CommonProps & {
  href: string;
  /** Force an external link. Auto-detected from the protocol otherwise. */
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'className' | 'href'>;

/**
 * Same visual language as `Button`, but a real anchor.
 *
 * Internal paths go through React Router's `Link` so navigation stays client
 * side; anything with a protocol becomes a plain, safely-rel'd anchor.
 */
export function ButtonLink({
  href,
  external,
  variant = 'primary',
  size = 'md',
  children,
  className,
  trailing,
  leading,
  ...rest
}: ButtonLinkProps) {
  const { play } = usePreferences();
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  const content = (
    <>
      <Sheen />
      {leading}
      {children}
      {trailing}
    </>
  );

  const shared = {
    className: classes,
    'data-cursor': 'button',
    onMouseEnter: () => play('hover'),
    ...rest,
  };

  // The hover/tap motion lives on a wrapper for both branches, so the anchor
  // itself stays a plain DOM element — no motion prop collisions, and screen
  // readers and the router see exactly what they expect.
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      className="inline-flex"
    >
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
          {content}
        </a>
      ) : (
        <Link to={href} {...shared}>
          {content}
        </Link>
      )}
    </motion.div>
  );
}
