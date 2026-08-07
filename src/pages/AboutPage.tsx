import { Reveal, RevealGroup, RevealItem } from '@components/motion/Reveal';
import { GardenIllustration } from '@components/illustrations/GardenIllustration';
import { Parallax } from '@components/motion/Parallax';
import { Seo } from '@components/seo/Seo';
import { ButtonLink } from '@components/ui/Button';
import { Container } from '@components/ui/Container';
import { GlassCard } from '@components/ui/GlassCard';
import { PageHeader } from '@layouts/PageHeader';
import { profile } from '@data/profile';
import { roadmap } from '@data/roadmap';
import { site } from '@data/site';

export function AboutPage() {
  return (
    <>
      <Seo
        title="Sobre mí"
        path="/about"
        description="Marco Collado, estudiante de Ingeniería de Software: cómo pienso, qué construyo y hacia dónde voy."
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
          </div>
        </div>
      </Container>
    </>
  );
}
