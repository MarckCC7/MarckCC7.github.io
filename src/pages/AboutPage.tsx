import { Reveal, RevealGroup, RevealItem } from '@components/motion/Reveal';
import { GardenIllustration } from '@components/illustrations/GardenIllustration';
import { Parallax } from '@components/motion/Parallax';
import { Seo } from '@components/seo/Seo';
import { ButtonLink } from '@components/ui/Button';
import { Container } from '@components/ui/Container';
import { GlassCard } from '@components/ui/GlassCard';
import { PageHeader } from '@layouts/PageHeader';
import { experience } from '@data/experience';
import { profile } from '@data/profile';
import { roadmap } from '@data/roadmap';
import { site } from '@data/site';

export function AboutPage() {
  return (
    <>
      <Seo
        title="Sobre mí"
        path="/about"
        description="Marco Collado C., estudiante de Ingeniería de Software: cómo pienso, qué construyo y hacia dónde voy."
        type="profile"
      />

      <PageHeader eyebrow="Sobre mí" title="Curiosidad primero. Todo lo demás vino después." />

      <Container className="pb-section">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="space-y-6">
            {profile.story.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.05}>
                <p className="max-w-prose leading-relaxed text-base text-ink-secondary sm:text-[1.0625rem]">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <blockquote className="mt-10 border-l-2 border-moss-400 pl-6">
                <p className="font-display text-2xl leading-snug tracking-tight text-ink">
                  {site.motto}
                </p>
                <footer className="mt-3 text-sm text-ink-muted">
                  La única regla que no he cambiado.
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/projects" variant="primary">
                  Ver lo que construyo
                </ButtonLink>
                <ButtonLink href="/#contacto" variant="secondary">
                  Escribirme
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Parallax distance={30}>
              <GlassCard className="p-6">
                <GardenIllustration className="max-w-xs" />
              </GlassCard>
            </Parallax>

            <RevealGroup className="space-y-4" stagger={0.08}>
              {profile.principles.map((principle) => (
                <RevealItem key={principle.id}>
                  <GlassCard className="p-6">
                    <div className="flex items-start gap-4">
                      <span aria-hidden className="mt-0.5 font-mono text-lg text-moss-300">
                        {principle.glyph}
                      </span>
                      <div>
                        <h2 className="font-display font-semibold tracking-tight text-base text-ink">
                          {principle.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                          {principle.body}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.2}>
              <GlassCard className="p-6">
                <h2 className="text-pixel text-[0.5rem] text-ink-muted">Dónde estoy ahora</h2>
                <ul className="mt-5 space-y-3">
                  {roadmap.slice(0, 3).map((node) => (
                    <li key={node.id} className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className={
                          node.status === 'done'
                            ? 'h-1.5 w-1.5 rounded-full bg-moss-300'
                            : node.status === 'active'
                              ? 'h-1.5 w-1.5 rounded-full bg-ember-400'
                              : 'h-1.5 w-1.5 rounded-full bg-graphite-500'
                        }
                      />
                      <span className="text-sm text-ink-secondary">{node.title}</span>
                      <span className="ml-auto font-mono text-[0.625rem] text-ink-muted">
                        {node.horizon}
                      </span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.26}>
              <GlassCard className="p-6">
                <h2 className="text-pixel text-[0.5rem] text-ink-muted">Experiencia</h2>

                <ul className="mt-5 space-y-5">
                  {experience.map((entry) => (
                    <li key={entry.id}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <h3 className="font-display font-semibold tracking-tight text-base text-ink">
                          {entry.role}
                          <span className="text-ink-muted"> · {entry.organisation}</span>
                        </h3>
                        <span className="font-mono text-[0.625rem] text-ink-muted">
                          {entry.period}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                        {entry.summary}
                      </p>

                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {entry.skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-lg border border-line-subtle bg-elevated/50 px-2.5 py-1 text-[0.6875rem] text-ink-secondary"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.32}>
              <GlassCard className="p-6">
                <h2 className="text-pixel text-[0.5rem] text-ink-muted">Idiomas</h2>
                <dl className="mt-5 space-y-4">
                  {profile.languages.map((language) => (
                    <div key={language.name}>
                      <dt className="flex items-baseline gap-2">
                        <span className="text-sm font-medium text-ink">{language.name}</span>
                        <span className="font-mono text-[0.6875rem] text-moss-300">
                          {language.level}
                        </span>
                      </dt>
                      <dd className="mt-1 text-[0.8125rem] leading-relaxed text-ink-muted">
                        {language.note}
                      </dd>
                    </div>
                  ))}
                </dl>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  );
}
