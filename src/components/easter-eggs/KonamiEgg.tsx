import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { useKonamiCode } from '@hooks/useKonamiCode';
import { usePreferences } from '@hooks/usePreferences';

/**
 * The Konami code toggles pixel mode across the entire site.
 *
 * Not a confetti burst that disappears: a real, persistent mode the visitor can
 * keep browsing in. An easter egg that changes something is worth finding; one
 * that plays an animation is a magic trick you only watch once.
 */
export function KonamiEgg() {
  const { pixelMode, togglePixelMode, play } = usePreferences();
  const [flash, setFlash] = useState(false);

  const unlock = useCallback(() => {
    togglePixelMode();
    play('unlock');
    setFlash(true);
  }, [togglePixelMode, play]);

  useKonamiCode(unlock);

  useEffect(() => {
    if (!flash) return;
    const timeout = setTimeout(() => setFlash(false), 2600);
    return () => clearTimeout(timeout);
  }, [flash]);

  return (
    <AnimatePresence>
      {flash && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          role="status"
          className="fixed inset-x-0 bottom-8 z-[70] mx-auto w-fit"
        >
          <div className="glass-strong flex items-center gap-3 rounded-2xl px-5 py-3.5">
            <span aria-hidden className="text-pixel animate-pixel-blink text-xs text-ember-300">
              ★
            </span>
            <div className="flex flex-col">
              <span className="text-pixel text-[0.5rem] text-ink">
                {pixelMode ? 'MODO PIXEL ACTIVADO' : 'MODO PIXEL DESACTIVADO'}
              </span>
              <span className="mt-1.5 text-[0.6875rem] text-ink-muted">
                {pixelMode
                  ? 'Encontraste algo. Vuelve a introducir el código para salir.'
                  : 'De vuelta al jardín normal.'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
