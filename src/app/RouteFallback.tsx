import { motion } from 'framer-motion';

/**
 * Shown while a code-split route loads.
 *
 * A growing sprout rather than a spinner: it occupies the same emotional space
 * as the rest of the site, and on a fast connection it reads as a deliberate
 * beat instead of a stall.
 */
export function RouteFallback() {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className="flex min-h-[70svh] flex-col items-center justify-center gap-5"
    >
      <span className="relative flex h-16 items-end">
        <motion.span
          className="w-[3px] origin-bottom rounded-full bg-gradient-to-t from-moss-700 to-moss-300"
          initial={{ height: 4 }}
          animate={{ height: [4, 44, 4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="absolute bottom-10 -left-4 h-1.5 w-5 rounded-full bg-moss-500/70"
          initial={{ scale: 0, rotate: -26 }}
          animate={{ scale: [0, 1, 0], rotate: -26 }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.25 }}
        />
        <motion.span
          className="absolute bottom-6 left-1 h-1.5 w-5 rounded-full bg-moss-500/70"
          initial={{ scale: 0, rotate: 26 }}
          animate={{ scale: [0, 1, 0], rotate: 26 }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.45 }}
        />
      </span>

      <span className="text-pixel text-[0.5rem] text-ink-muted">Creciendo…</span>
    </div>
  );
}
