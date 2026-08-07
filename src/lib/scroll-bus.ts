/**
 * A one-line pub/sub for smooth-scroll ticks.
 *
 * Exists so that `useSmoothScroll` (which always runs) never has to import
 * GSAP (which almost never needs to). Lenis publishes here; whoever cares —
 * currently only the lazily-loaded ScrollTrigger setup — subscribes.
 *
 * Without this indirection, keeping ScrollTrigger in sync with Lenis would drag
 * 27 kB of GSAP onto the critical path of every single page load.
 */
type Listener = () => void;

const listeners = new Set<Listener>();

/** Called by Lenis on every scroll frame. */
export function publishScroll(): void {
  for (const listener of listeners) listener();
}

/** Returns an unsubscribe function. */
export function onSmoothScroll(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
