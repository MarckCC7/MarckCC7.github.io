import { motion } from 'framer-motion';

import { RevealGroup, RevealItem, Reveal } from '@components/motion/Reveal';
import { GlassCard } from '@components/ui/GlassCard';
import { PixelPlate } from '@components/ui/PixelPlate';
import { Section } from '@components/ui/Section';
import { SectionHeading } from '@components/ui/SectionHeading';
import { categoryMeta, groupedStack, levelLabel } from '@data/stack';
import { usePreferences } from '@hooks/usePreferences';
import type { StackItem } from '@/types';

/**
 * The toolbox, grouped by what each tool is *for* rather than by popularity.
 *
 * Levels are shown as five small segments instead of a percentage bar: a
 * percentage implies a precision nobody actually has about their own skills.
 */
export function StackSection() {
  return (
    <Section id="stack">
      <SectionHeading
        eyebrow="02 · Mi stack"
        title="Herramientas que uso, con el nivel real en el que estoy."
        description="Ninguna de estas está en 5 de 5, y decirlo es parte del punto. Un jardín honesto es más útil que un catálogo inflado."
      />

      <div className="mt-14 space-y-12">
        {groupedStack().map(({ category, items }) => (
          <div key={category}>
            <Reveal>
              <div className="mb-5 flex items-baseline gap-3">
                <h3 className="font-display text-sm font-semibold tracking-tight text-ink">
                  {categoryMeta[category].label}
                </h3>
                <span className="h-px flex-1 bg-line-subtle" />
                <span className="text-xs text-ink-muted">{categoryMeta[category].caption}</span>
              </div>
            </Reveal>

            <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
              {items.map((item) => (
                <RevealItem key={item.name}>
                  <TechCard item={item} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TechCard({ item }: { item: StackItem }) {
  const { play } = usePreferences();

  return (
    <GlassCard
      className="group/tech h-full p-5 transition-transform duration-500 ease-garden hover:-translate-y-1"
      spotlight
    >
      <div
        onMouseEnter={() => play('hover')}
        data-cursor="card"
        className="flex h-full items-start gap-4"
      >
        <PixelPlate mark={item.mark} accent={item.accent} />

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <h4 className="font-display text-sm font-semibold tracking-tight text-ink">
              {item.name}
            </h4>
            <span className="shrink-0 text-[0.6875rem] text-ink-muted">
              {levelLabel[item.level]}
            </span>
          </div>

          {/* Level: five segments, filled to the honest number. */}
          <div
            className="mt-2.5 flex gap-1"
            role="img"
            aria-label={`Nivel ${item.level} de 5: ${levelLabel[item.level]}`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <motion.span
                key={index}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.06 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: 'left',
                  backgroundColor: index < item.level ? item.accent : 'var(--line-default)',
                }}
                className="h-[3px] w-5 rounded-full"
              />
            ))}
          </div>

          <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-secondary">{item.note}</p>
        </div>
      </div>
    </GlassCard>
  );
}
