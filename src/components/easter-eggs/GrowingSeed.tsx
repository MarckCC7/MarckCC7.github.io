import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { useLocalStorage } from '@hooks/useLocalStorage';
import { usePreferences } from '@hooks/usePreferences';
import { cn } from '@utils/cn';

/* Plant geometry, in pixels. One source of truth so the canopy, the leaves and
   the droplet all agree on where the top of the stem is. */
const STEM_H = (stage: number) => 8 + stage * 16;
const CANOPY_W = (stage: number) => 14 + stage * 12;
const CANOPY_H = (stage: number) => 10 + stage * 8;

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
        className="group relative block h-40 w-40"
      >
        {/*
          Every part of the plant is anchored to this box: `bottom: 0` is the
          soil line and `left: 50%` is the stem. The previous version nested the
          leaves inside a shrink-to-fit flex column, so the box widened as the
          canopy grew and dragged the leaves sideways with it — the tree came
          out lopsided at exactly the stages where it should look best.

          Note the `x: '-50%'` inside the Framer props rather than a
          `-translate-x-1/2` class: Framer writes the whole `transform`, so a
          Tailwind translate on an animated element gets silently overwritten.
        */}
        <span aria-hidden className="absolute inset-x-0 bottom-6 block h-32">
          {/* Soil */}
          <span className="absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />

          {/* Canopy — rides the top of the stem */}
          <AnimatePresence>
            {stage > 0 && (
              <motion.span
                key="canopy"
                initial={{ scale: 0, opacity: 0, x: '-50%' }}
                animate={{ scale: 1, opacity: 1, x: '-50%' }}
                exit={{ scale: 0, opacity: 0, x: '-50%' }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="absolute left-1/2 rounded-full bg-moss-400/25 blur-[2px]"
                style={{
                  width: CANOPY_W(stage),
                  height: CANOPY_H(stage),
                  bottom: STEM_H(stage) - CANOPY_H(stage) * 0.42,
                }}
              />
            )}
          </AnimatePresence>

          {/* Stem */}
          <motion.span
            animate={{ height: STEM_H(stage) }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute bottom-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-t from-moss-700 to-moss-300"
          />

          {/* Leaves — from stage 2 onwards, alternating sides.
              `right-1/2` / `left-1/2` puts each leaf's inner edge exactly on the
              stem, and the matching transform origin makes it hinge outward. */}
          {Array.from({ length: Math.max(0, stage - 1) }, (_, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.span
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 240, damping: 18, delay: index * 0.04 }}
                className={cn(
                  'absolute h-1.5 w-5 rounded-full bg-moss-500/70',
                  isLeft ? 'right-1/2 origin-right' : 'left-1/2 origin-left',
                )}
                style={{
                  bottom: 14 + index * 15,
                  rotate: isLeft ? '-24deg' : '24deg',
                }}
              />
            );
          })}

          {/* Water droplet feedback */}
          <AnimatePresence>
            {justGrew && (
              <motion.span
                initial={{ opacity: 1, y: -38, scale: 0.6, x: '-50%' }}
                animate={{ opacity: 0, y: 0, scale: 1, x: '-50%' }}
                exit={{ opacity: 0, x: '-50%' }}
                transition={{ duration: 0.65, ease: 'easeIn' }}
                className="absolute left-1/2 h-1.5 w-1.5 rounded-full bg-azure-300"
                style={{ bottom: STEM_H(stage) }}
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
