import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { TiltCard } from '@components/motion/TiltCard';
import { Badge } from '@components/ui/Badge';
import { GlassCard } from '@components/ui/GlassCard';
import { stageMeta } from '@data/projects';
import { usePreferences } from '@hooks/usePreferences';
import { cn } from '@utils/cn';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  /** Featured cards span two columns and get a taller crown. */
  featured?: boolean;
}

/**
 * A project card.
 *
 * The "crown" at the top is a miniature of the project's plant: its height maps
 * to the stage's `growth` value, so a card marked `idea` is visibly a sprout and
 * a shipped one is visibly a tree. The status label and the illustration can
 * never disagree, because they read from the same number.
 */
export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const stage = stageMeta[project.stage];
  const { play } = usePreferences();

  return (
    <TiltCard intensity={4} className="h-full">
      <GlassCard className="h-full" glow>
        <Link
          to={`/projects/${project.slug}`}
          data-cursor="card"
          data-cursor-label="ABRIR"
          onMouseEnter={() => play('hover')}
          className="flex h-full flex-col p-6 sm:p-7"
        >
          {/* — Crown: the plant, scaled to the project's stage —————— */}
          <div
            aria-hidden
            className={cn(
              // `bg-base` y no `bg-graphite-950`: el gris más oscuro de la
              // escala es oscuro en ambos temas, así que en modo claro este
              // panel salía como un bloque gris sucio. `--surface-base` es el
              // extremo de la escala en cada tema —el más oscuro en oscuro, el
              // más claro en claro— que es justo lo que necesita un hueco.
              'relative mb-7 flex items-end justify-between overflow-hidden rounded-2xl border border-line-subtle bg-base/60 px-5',
              featured ? 'h-40' : 'h-28',
            )}
          >
            {/* soil grid */}
            <span
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(var(--line-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--line-subtle) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />

            <PlantMark growth={stage.growth} accent={stage.dot} />

            <span className="text-pixel relative text-2xl text-moss-300/80 sm:text-3xl">
              {project.glyph}
            </span>
          </div>

          {/* — Meta ————————————————————————————————— */}
          <div className="flex items-center gap-2.5">
            <Badge className={stage.tone} dot={stage.dot} pulse={project.stage === 'building'}>
              {stage.label}
            </Badge>
            <span className="font-mono text-[0.6875rem] text-ink-muted">{project.year}</span>
          </div>

          {/* — Body ————————————————————————————————— */}
          <h3
            className={cn(
              'mt-4 font-display font-semibold tracking-tight text-ink transition-colors duration-300 group-hover/card:text-moss-100',
              featured ? 'text-2xl' : 'text-xl',
            )}
          >
            {project.title}
          </h3>

          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-secondary">
            {project.tagline}
          </p>

          {/* — Stack ———————————————————————————————— */}
          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {project.stack.slice(0, featured ? 5 : 3).map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-line-subtle px-2 py-0.5 font-mono text-[0.625rem] text-ink-muted"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > (featured ? 5 : 3) && (
              <span className="font-mono text-[0.625rem] text-ink-muted">
                +{project.stack.length - (featured ? 5 : 3)}
              </span>
            )}
          </div>

          {/* — Affordance ——————————————————————————— */}
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-moss-300">
            Ver detalle
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 ease-garden group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
            />
          </span>
        </Link>
      </GlassCard>
    </TiltCard>
  );
}

/**
 * A three-branch sprout whose height tracks the project's stage.
 * Pure CSS — no SVG needed for something this small.
 */
function PlantMark({ growth, accent }: { growth: number; accent: string }) {
  const stemHeight = 24 + growth * 56;

  return (
    <span className="relative flex h-full items-end pb-4">
      <span className="relative flex flex-col items-center">
        {/* bud */}
        <span
          className={cn('mb-0.5 h-1.5 w-1.5 rounded-full', accent)}
          style={{ boxShadow: '0 0 12px currentColor' }}
        />
        {/* stem */}
        <span
          className="w-[2px] origin-bottom animate-grow-stem rounded-full bg-gradient-to-t from-moss-700 to-moss-300"
          style={{ height: `${stemHeight}px` }}
        />
        {/* leaves, only once past the sprout stage */}
        {growth > 0.35 && (
          <>
            <span
              className="absolute h-1.5 w-4 rounded-full bg-moss-500/70"
              style={{ bottom: `${stemHeight * 0.45}px`, right: '2px', rotate: '-24deg' }}
            />
            <span
              className="absolute h-1.5 w-4 rounded-full bg-moss-500/70"
              style={{ bottom: `${stemHeight * 0.62}px`, left: '2px', rotate: '24deg' }}
            />
          </>
        )}
      </span>
    </span>
  );
}
