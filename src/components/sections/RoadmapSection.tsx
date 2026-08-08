import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Cloud, Cpu, Infinity as InfinityIcon, Rocket, Server, Sprout, Code2 } from 'lucide-react';
import { useRef } from 'react';

import { Reveal } from '@components/motion/Reveal';
import { Badge } from '@components/ui/Badge';
import { GlassCard } from '@components/ui/GlassCard';
import { Section } from '@components/ui/Section';
import { SectionHeading } from '@components/ui/SectionHeading';
import { roadmap, statusMeta } from '@data/roadmap';
import { usePrefersReducedMotion } from '@hooks/useMediaQuery';
import { cn } from '@utils/cn';
import type { RoadmapIconId, RoadmapNode } from '@/types';

const ICONS: Record<RoadmapIconId, typeof Sprout> = {
  seed: Sprout,
  frontend: Code2,
  backend: Server,
  cloud: Cloud,
  devops: InfinityIcon,
  ai: Cpu,
  startup: Rocket,
};

/**
 * The growth tree.
 *
 * A trunk, not a timeline: the line literally grows as you scroll, and every
 * stage keeps its branches after the next one starts. Learning backend does not
 * mean abandoning frontend, and a timeline implies exactly that.
 */
export function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 60%'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const trunkHeight = useTransform(smooth, [0, 1], ['0%', '100%']);

  return (
    <Section id="roadmap">
      <SectionHeading
        eyebrow="03 · Roadmap"
        title="No es una línea del tiempo. Es un árbol que sigue echando ramas."
        description="Cada etapa no se cierra cuando empieza la siguiente: se queda creciendo debajo. Así es como se construye una base que aguanta diez años."
      />

      <div ref={containerRef} className="relative mt-12">
        {/* — Trunk ————————————————————————————————
            A dim rail with a bright, scroll-driven segment growing over it. */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-[19px] w-px bg-line-subtle md:left-1/2 md:-translate-x-1/2"
        >
          <motion.div
            style={{ height: reducedMotion ? '100%' : trunkHeight }}
            className="w-full bg-gradient-to-b from-moss-500 via-moss-300 to-azure-400"
          />
        </div>

        <ol className="space-y-10 md:space-y-4">
          {roadmap.map((node, index) => (
            <RoadmapRow key={node.id} node={node} index={index} />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function RoadmapRow({ node, index }: { node: RoadmapNode; index: number }) {
  const meta = statusMeta[node.status];
  const Icon = ICONS[node.icon];
  const isRight = index % 2 === 1;

  return (
    <li className="relative md:grid md:grid-cols-2 md:gap-12">
      {/* Node marker on the trunk */}
      <span aria-hidden className="absolute top-7 left-[19px] z-10 -translate-x-1/2 md:left-1/2">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className={cn(
            'grid h-[13px] w-[13px] place-items-center rounded-full border-2 border-base',
            meta.dot,
          )}
        >
          {node.status === 'active' && (
            <span className="absolute h-full w-full animate-ping rounded-full bg-ember-400 opacity-60" />
          )}
        </motion.span>
      </span>

      {/* Spacer that pushes the card to the correct side on desktop */}
      {isRight && <span className="hidden md:block" aria-hidden />}

      <Reveal
        delay={0.04 * index}
        className={cn('pl-12 md:pl-0', isRight ? 'md:pl-12' : 'md:pr-12 md:text-right')}
      >
        <GlassCard className="p-6" glow={node.status === 'active'}>
          <div
            className={cn(
              'flex items-center gap-3',
              !isRight && 'md:flex-row-reverse md:justify-start',
            )}
          >
            <span
              className={cn(
                'grid h-10 w-10 shrink-0 place-items-center rounded-xl border',
                meta.ring,
                meta.tone,
              )}
            >
              <Icon size={18} />
            </span>

            <div className={cn('flex flex-col gap-1', !isRight && 'md:items-end')}>
              <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                {node.title}
              </h3>
              <span className="font-mono text-[0.6875rem] text-ink-muted">{node.horizon}</span>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{node.description}</p>

          <div className={cn('mt-5 flex flex-wrap gap-1.5', !isRight && 'md:justify-end')}>
            {node.branches.map((branch) => (
              <span
                key={branch}
                className="rounded-lg border border-line-subtle bg-elevated/50 px-2.5 py-1 text-[0.6875rem] text-ink-secondary"
              >
                {branch}
              </span>
            ))}
          </div>

          <div className={cn('mt-5', !isRight && 'md:flex md:justify-end')}>
            <Badge
              className={cn(meta.ring, meta.tone)}
              dot={meta.dot}
              pulse={node.status === 'active'}
            >
              {meta.label}
            </Badge>
          </div>
        </GlassCard>
      </Reveal>
    </li>
  );
}
