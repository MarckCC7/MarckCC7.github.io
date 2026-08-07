import { HiddenNpc } from './HiddenNpc';
import { KonamiEgg } from './KonamiEgg';

/**
 * Mounts every always-on easter egg.
 *
 * Kept in one place so the app shell stays readable and so it is obvious, at a
 * glance, exactly how much of the site is hidden fun versus actual content.
 * (The rest live where they belong: the growing tree on `/garden`, the console
 * note in `main.tsx`, and pixel mode everywhere once unlocked.)
 */
export function EasterEggLayer() {
  return (
    <>
      <KonamiEgg />
      <HiddenNpc />
    </>
  );
}
