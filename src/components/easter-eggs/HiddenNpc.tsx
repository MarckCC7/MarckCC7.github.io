import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { usePreferences } from '@hooks/usePreferences';
import { usePrefersReducedMotion } from '@hooks/useMediaQuery';

import { PixelSprite } from './PixelSprite';
import { GARDENER } from './sprites';

/** Rotating dialogue. Each click advances one line, RPG style. */
const LINES = [
  '¡Hola! Cuido este jardín.',
  'Todo lo que ves aquí empezó como una nota suelta.',
  'Las semillas tardan. No es lo mismo que estar quieto.',
  'Si buscas algo escondido... prueba con las flechas.',
  'Arriba, arriba, abajo, abajo... ya sabes cómo sigue.',
  'Vuelve en unos meses. Va a estar distinto.',
];

/**
 * A gardener who walks in after a while and waits to be noticed.
 *
 * Appears only once the visitor has read a fair amount of the page — an easter
 * egg that greets you on arrival is just a mascot. Found on your own, on the
 * way down, it feels like a discovery.
 */
export function HiddenNpc() {
  const [visible, setVisible] = useState(false);
  const [line, setLine] = useState<number | null>(null);
  const { play } = usePreferences();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      setVisible(scrolled > 0.55);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const speak = () => {
    play('select');
    setLine((current) => (current === null ? 0 : (current + 1) % LINES.length));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-40 hidden items-end gap-3 lg:flex"
        >
          <button
            type="button"
            onClick={speak}
            data-cursor="button"
            aria-label="Hablar con el jardinero"
            className="group relative rounded-md p-1 transition-transform duration-300 hover:scale-110"
          >
            <motion.span
              className="block"
              animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <PixelSprite frame={GARDENER} scale={3} />
            </motion.span>

            {line === null && (
              <span
                aria-hidden
                className="text-pixel absolute -top-1 -right-1 animate-pixel-blink text-[0.5rem] text-ember-300"
              >
                !
              </span>
            )}
          </button>

          <AnimatePresence mode="wait">
            {line !== null && (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="glass-strong text-pixel max-w-[15rem] rounded-lg px-3.5 py-2.5 text-[0.5rem] leading-[1.9] text-ink"
              >
                {LINES[line]}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
