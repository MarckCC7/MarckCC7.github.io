import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useIsTouchDevice, usePrefersReducedMotion } from '@hooks/useMediaQuery';
import { cn } from '@utils/cn';

/** Values accepted by the `data-cursor` attribute anywhere in the tree. */
type CursorMode = 'default' | 'button' | 'link' | 'card' | 'image' | 'text' | 'hidden';

const RING: Record<CursorMode, { size: number; border: string; fill: string; label?: boolean }> = {
  default: { size: 34, border: 'border-ink/25', fill: 'bg-transparent' },
  button: { size: 56, border: 'border-azure-400/60', fill: 'bg-azure-400/10' },
  link: { size: 44, border: 'border-moss-300/60', fill: 'bg-moss-300/10' },
  card: { size: 72, border: 'border-moss-300/40', fill: 'bg-moss-300/5', label: true },
  image: { size: 84, border: 'border-ink/30', fill: 'bg-ink/5', label: true },
  text: { size: 4, border: 'border-transparent', fill: 'bg-ink/70' },
  hidden: { size: 0, border: 'border-transparent', fill: 'bg-transparent' },
};

/**
 * A two-part cursor: a dot that tracks the pointer exactly, and a ring that
 * trails behind it with spring physics.
 *
 * The mode is read from the nearest `data-cursor` ancestor via delegation, so
 * any component opts in with a single attribute and this file never needs to
 * know what a "project card" is.
 *
 * Never rendered on touch devices or under reduced-motion — a lagging ring with
 * no pointer to attach to is pure cost.
 */
export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = !isTouch && !reducedMotion;

  const [mode, setMode] = useState<CursorMode>('default');
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // The dot is nearly rigid; the ring is deliberately loose. That difference in
  // damping is the entire personality of the cursor.
  const dotX = useSpring(x, { stiffness: 1400, damping: 60, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1400, damping: 60, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.55 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      // React bails out when the value is unchanged, so this is free after
      // the first move — no need to read `visible` and resubscribe.
      setVisible(true);
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-cursor], a, button',
      );

      if (!target) {
        setMode('default');
        setLabel(null);
        return;
      }

      const explicit = target.dataset.cursor as CursorMode | undefined;
      const fallback: CursorMode = target.tagName === 'BUTTON' ? 'button' : 'link';

      setMode(explicit ?? fallback);
      setLabel(target.dataset.cursorLabel ?? null);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);

    document.documentElement.style.cursor = 'none';

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      document.documentElement.style.cursor = '';
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ring = RING[mode];

  return (
    <>
      {/* Ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className={cn(
            'flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-[2px]',
            ring.border,
            ring.fill,
          )}
          animate={{
            width: ring.size * (pressed ? 0.86 : 1),
            height: ring.size * (pressed ? 0.86 : 1),
            opacity: visible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        >
          {ring.label && label && (
            <span className="text-pixel text-[0.5rem] whitespace-nowrap text-ink">{label}</span>
          )}
        </motion.div>
      </motion.div>

      {/* Dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-moss-200 mix-blend-difference"
          animate={{
            width: mode === 'text' ? 2 : 6,
            height: mode === 'text' ? 22 : 6,
            borderRadius: mode === 'text' ? 2 : 999,
            opacity: visible && mode !== 'hidden' ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        />
      </motion.div>
    </>
  );
}
