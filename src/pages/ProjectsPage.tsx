import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState, type ReactNode } from 'react';

import { ProjectCard } from '@components/cards/ProjectCard';
import { Reveal } from '@components/motion/Reveal';
import { Seo } from '@components/seo/Seo';
import { Container } from '@components/ui/Container';
import { PageHeader } from '@layouts/PageHeader';
import { projects, stageMeta, stageOrder } from '@data/projects';
import { usePreferences } from '@hooks/usePreferences';
import { cn } from '@utils/cn';
import type { ProjectStage } from '@/types';

type Filter = ProjectStage | 'all';

export function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const { play } = usePreferences();

  // Only offer filters that would actually return something.
  const availableStages = useMemo(
    () => stageOrder.filter((stage) => projects.some((project) => project.stage === stage)),
    [],
  );

  const visible = useMemo(
    () =>
      (filter === 'all' ? projects : projects.filter((project) => project.stage === filter))
        .slice()
        .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))),
    [filter],
  );

  return (
    <>
      <Seo
        title="Proyectos"
        path="/projects"
        description="Sistemas que Marco Collado está diseñando y construyendo: administración de condominios con IA, memoria digital familiar, investigación de corrupción, gestión ganadera y más."
      />

      <PageHeader
        eyebrow="Proyectos"
        title="Seis problemas reales que quiero resolver con software."
        description="Algunos son ideas, otros ya tienen forma. Cada tarjeta dice exactamente en qué etapa está — sin inflar nada, porque un problema bien entendido vale más que un demo apurado."
      />

      <Container className="pb-section">
        {/* — Filters ————————————————————————————————— */}
        <Reveal className="mb-10">
          <div
            role="group"
            aria-label="Filtrar proyectos por etapa"
            className="flex flex-wrap gap-2"
          >
            <FilterChip active={filter === 'all'} onClick={() => setFilter('all')} play={play}>
              Todos
              <span className="ml-1.5 font-mono text-[0.625rem] opacity-60">{projects.length}</span>
            </FilterChip>

            {availableStages.map((stage) => {
              const count = projects.filter((project) => project.stage === stage).length;
              return (
                <FilterChip
                  key={stage}
                  active={filter === stage}
                  onClick={() => setFilter(stage)}
                  play={play}
                >
                  {stageMeta[stage].label}
                  <span className="ml-1.5 font-mono text-[0.625rem] opacity-60">{count}</span>
                </FilterChip>
              );
            })}
          </div>

          {filter !== 'all' && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 max-w-xl text-sm text-ink-muted"
            >
              {stageMeta[filter].description}
            </motion.p>
          )}
        </Reveal>

        {/* — Grid ———————————————————————————————————
            `layout` on the grid animates neighbours into their new positions
            when the filter changes, instead of snapping. */}
        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  play,
  children,
}: {
  active: boolean;
  onClick: () => void;
  play: (blip: 'select') => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      data-cursor="button"
      onClick={() => {
        play('select');
        onClick();
      }}
      className={cn(
        'relative rounded-xl border px-4 py-2 text-sm transition-colors duration-300',
        active
          ? 'border-moss-400/40 bg-moss-500/12 text-moss-100'
          : 'border-line-subtle text-ink-secondary hover:border-line-strong hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}
