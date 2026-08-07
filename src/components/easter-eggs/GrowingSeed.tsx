import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { useLocalStorage } from '@hooks/useLocalStorage';
import { usePreferences } from '@hooks/usePreferences';
import { cn } from '@utils/cn';

const STAGES = [
  { label: 'Una semilla', hint: 'Riega tocándola.' },
  { label: 'Un brote', hint: 'Sigue.' },
  { label: 'Un tallo', hint: 'Va creciendo.' },
  { label: 'Con hojas', hint: 'Ya se sostiene sola.' },
  { label: 'Un arbolito', hint: 'Casi.' },
  { label: 'Un árbol', hint: 'Esto tomó constancia. Como todo lo demás.' },
];

/**
 * Click-to-grow tree.
 *
 * Progress is persisted, so the tree is still there on the next visit — which
 * is the only version of this interaction that means anything. A tree that
 * resets on reload is a button; a tree that remembers is a small relationship.
 */
export function GrowingSeed({ className }: { className?: string }) {
  const [stage, setStage] = useLocalStorage('garden:tree-stage', 0);
  const [justGrew, setJustGrew] = useState(false);
  const { play } = usePreferences();

  const isFull = stage >= STAGES.length - 1;
  const current = STAGES[Math.min(stage, STAGES.length - 1)];

  const water = () => {
    if (isFull) {
      play('select');
      return;
    }
    play('grow');
    setStage((value) => value + 1);
    setJustGrew(true);
    setTimeout(() => setJustGrew(false), 700);
  };

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <button
        type="button"
        onClick={water}
        data-cursor="button"
        aria-label={isFull ? 'Tu árbol está completo' : 'Regar la semilla'}
        className="group relative grid h-40 w-40 place-items-end pb-4"
      >
        {/* Soil */}
        <span
          aria-hidden
          className="absolute bottom-3 h-px w-24 bg-gradient-to-r from-transparent via-line-strong to-transparent"
        />

        {/* The plant itself */}
        <span aria-hidden className="relative flex flex-col items-center">
          <AnimatePresence>
            {stage > 0 && (
              <motion.span
                key="canopy"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="mb-1 rounded-full bg-moss-400/25 blur-[2px]"
                style={{ width: 12 + stage * 11, height: 8 + stage * 7 }}
              />
            )}
          </AnimatePresence>

          <motion.span
            animate={{ height: 6 + stage * 15 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-[3px] origin-bottom rounded-full bg-gradient-to-t from-moss-700 to-moss-300"
          />

          {/* Leaves appear from stage 2 */}
          {Array.from({ length: Math.max(0, stage - 1) }, (_, index) => (
            <motion.span
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
              className="absolute h-1.5 w-5 rounded-full bg-moss-500/70"
              style={{
                bottom: 12 + index * 14,
                left: index % 2 === 0 ? -18 : 4,
                rotate: index % 2 === 0 ? '-26deg' : '26deg',
              }}
            />
          ))}

          {/* Water droplet feedback */}
          <AnimatePresence>
            {justGrew && (
              <motion.span
                initial={{ opacity: 1, y: -34, scale: 0.6 }}
                animate={{ opacity: 0, y: 4, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeIn' }}
                className="absolute h-1.5 w-1.5 rounded-full bg-azure-300"
              />
            )}
          </AnimatePresence>
        </span>
      </button>

      <div className="text-center">
        <p className="text-pixel text-[0.5rem] text-moss-300">{current.label}</p>
        <p className="mt-2 text-xs text-ink-muted">{current.hint}</p>
      </div>
    </div>
  );
}
