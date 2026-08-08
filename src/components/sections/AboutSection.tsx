import { Reveal, RevealGroup, RevealItem } from '@components/motion/Reveal';
import { Parallax } from '@components/motion/Parallax';
import { GlassCard } from '@components/ui/GlassCard';
import { Section } from '@components/ui/Section';
import { SectionHeading } from '@components/ui/SectionHeading';
import { experience } from '@data/experience';
import { profile } from '@data/profile';

/**
 * "Sobre mí" on the home page — the short version.
 *
 * Three paragraphs and three principles. The full story lives on `/about`;
 * putting all of it here would stall the page right where momentum matters.
 */
export function AboutSection() {
  return (
    <Section id="sobre-mi">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="01 · Sobre mí"
            title="No estudio programación. Construyo cosas y, de paso, estudio."
          />

          <div className="mt-9 space-y-5">
            {profile.story.slice(0, 3).map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.08}>
                <p className="max-w-prose leading-relaxed text-base text-ink-secondary">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <ExperienceBlock />
        </div>

        {/* Principles — the part a recruiter actually remembers */}
        <Parallax distance={26} className="lg:pt-24">
          <RevealGroup className="space-y-4" stagger={0.1}>
            {profile.principles.map((principle) => (
              <RevealItem key={principle.id}>
                <GlassCard className="p-6" glow>
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="mt-0.5 font-mono text-lg leading-none text-moss-300"
                    >
                      {principle.glyph}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold tracking-tight text-base text-ink">
                        {principle.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                        {principle.body}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Parallax>
      </div>
    </Section>
  );
}

/**
 * Experience and languages, in the same column as the story.
 *
 * Deliberately not its own `<Section>`: one job and two languages do not carry
 * a full screen of vertical rhythm, and padding it out to look like more than
 * it is would be the exact opposite of what the rest of the site does.
 *
 * It earns its place anyway. Customer-facing work is where you learn to hear a
 * problem before proposing a solution — which is the difference between someone
 * who closes tickets and someone who designs product.
 */
function ExperienceBlock() {
  return (
    <div className="mt-12">
      <Reveal>
        <div className="mb-5 flex items-baseline gap-3">
          <h3 className="text-pixel text-[0.5rem] text-moss-300">Experiencia e idiomas</h3>
          <span aria-hidden className="h-px flex-1 bg-line-subtle" />
        </div>
      </Reveal>

      <RevealGroup className="space-y-3" stagger={0.08}>
        {experience.map((entry) => (
          <RevealItem key={entry.id}>
            <GlassCard className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="font-display font-semibold tracking-tight text-base text-ink">
                  {entry.role}
                  <span className="text-ink-muted"> · {entry.organisation}</span>
                </h4>
                <span className="font-mono text-[0.6875rem] text-ink-muted">{entry.period}</span>
              </div>

              <p className="mt-2.5 max-w-prose text-sm leading-relaxed text-ink-secondary">
                {entry.summary}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {entry.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-line-subtle bg-elevated/50 px-2.5 py-1 text-[0.6875rem] text-ink-secondary"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </RevealItem>
        ))}

        <RevealItem>
          <GlassCard className="p-5">
            <dl className="flex flex-wrap gap-x-10 gap-y-4">
              {profile.languages.map((language) => (
                <div key={language.name} className="min-w-[9rem]">
                  <dt className="flex items-baseline gap-2">
                    <span className="text-sm font-medium text-ink">{language.name}</span>
                    <span className="font-mono text-[0.6875rem] text-moss-300">
                      {language.level}
                    </span>
                  </dt>
                  <dd className="mt-1 max-w-[22rem] text-[0.8125rem] leading-relaxed text-ink-muted">
                    {language.note}
                  </dd>
                </div>
              ))}
            </dl>
          </GlassCard>
        </RevealItem>
      </RevealGroup>
    </div>
  );
}
