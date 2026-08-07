import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { Reveal } from '@components/motion/Reveal';
import { Seo } from '@components/seo/Seo';
import { Badge } from '@components/ui/Badge';
import { Container } from '@components/ui/Container';
import { GlassCard } from '@components/ui/GlassCard';
import { PixelPlate } from '@components/ui/PixelPlate';
import { getProjectBySlug, projects, stageMeta } from '@data/projects';
import { cn } from '@utils/cn';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // An unknown slug is not an error state worth designing — send them to the
  // full list, where every valid link lives.
  if (!project) return <Navigate to="/projects" replace />;

  const stage = stageMeta[project.stage];
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Seo
        title={project.title}
        path={`/projects/${project.slug}`}
        description={project.tagline}
        type="article"
        tags={project.stack}
      />

      <Container className="pt-36 pb-section sm:pt-40">
        <Reveal>
          <Link
            to="/projects"
            data-cursor="link"
            className="inline-flex items-center gap-2 text-sm text-ink-secondary transition-colors hover:text-moss-200"
          >
            <ArrowLeft size={15} />
            Todos los proyectos
          </Link>
        </Reveal>

        {/* — Header ————————————————————————————————— */}
        <header className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge className={stage.tone} dot={stage.dot} pulse={project.stage === 'building'}>
                  {stage.label}
                </Badge>
                <span className="font-mono text-xs text-ink-muted">{project.year}</span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 text-display-sm text-ink">{project.title}</h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-secondary">
                {project.tagline}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <GlassCard className="flex items-center justify-center p-10">
              <span className="text-6xl text-moss-300/80">{project.glyph}</span>
            </GlassCard>
          </Reveal>
        </header>

        {/* — Body ———————————————————————————————————— */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-pixel text-[0.5625rem] text-moss-300">El problema</h2>
              <p className="mt-5 max-w-prose leading-relaxed text-base text-ink-secondary">
                {project.problem}
              </p>
            </Reveal>

            <Reveal>
              <h2 className="text-pixel text-[0.5625rem] text-moss-300">La solución</h2>
              <p className="mt-5 max-w-prose leading-relaxed text-base text-ink-secondary">
                {project.approach}
              </p>
            </Reveal>

            {project.highlights && project.highlights.length > 0 && (
              <Reveal>
                <h2 className="text-pixel text-[0.5625rem] text-moss-300">Decisiones clave</h2>
                <ul className="mt-5 space-y-3.5">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-400"
                      />
                      <span className="max-w-prose leading-relaxed text-base text-ink-secondary">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          {/* — Sidebar ——————————————————————————————— */}
          <aside className="space-y-5">
            <Reveal>
              <GlassCard className="p-6">
                <h2 className="text-pixel text-[0.5rem] text-ink-muted">Stack previsto</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <span className="inline-flex items-center gap-2 rounded-lg border border-line-subtle bg-elevated/50 px-3 py-1.5 text-xs text-ink-secondary">
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.06}>
              <GlassCard className="p-6">
                <h2 className="text-pixel text-[0.5rem] text-ink-muted">Etapa</h2>
                <div className="mt-5 flex items-start gap-3.5">
                  <PixelPlate mark={project.glyph} size="sm" accent="var(--moss-300)" />
                  <p className="text-sm leading-relaxed text-ink-secondary">{stage.description}</p>
                </div>
              </GlassCard>
            </Reveal>

            {project.links && project.links.length > 0 && (
              <Reveal delay={0.12}>
                <GlassCard className="p-6">
                  <h2 className="text-pixel text-[0.5rem] text-ink-muted">Enlaces</h2>
                  <ul className="mt-5 space-y-3">
                    {project.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="link"
                          className="inline-flex items-center gap-2 text-sm text-azure-300 transition-colors hover:text-azure-200"
                        >
                          {link.label}
                          <ExternalLink size={13} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            )}
          </aside>
        </div>

        {/* — Next ———————————————————————————————————— */}
        <Reveal className="mt-20">
          <Link
            to={`/projects/${next.slug}`}
            data-cursor="card"
            data-cursor-label="SIGUIENTE"
            className={cn(
              'glass group flex items-center justify-between gap-6 rounded-3xl p-7',
              'transition-colors duration-500 hover:border-line-strong',
            )}
          >
            <span className="flex flex-col gap-1.5">
              <span className="text-pixel text-[0.5rem] text-ink-muted">Siguiente planta</span>
              <span className="font-display text-xl font-semibold tracking-tight text-ink">
                {next.title}
              </span>
            </span>
            <ArrowRight
              size={20}
              className="shrink-0 text-moss-300 transition-transform duration-500 ease-garden group-hover:translate-x-1.5"
            />
          </Link>
        </Reveal>
      </Container>
    </>
  );
}
