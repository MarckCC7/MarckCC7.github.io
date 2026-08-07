import { Reveal, RevealGroup, RevealItem } from '@components/motion/Reveal';
import { Parallax } from '@components/motion/Parallax';
import { GlassCard } from '@components/ui/GlassCard';
import { Section } from '@components/ui/Section';
import { SectionHeading } from '@components/ui/SectionHeading';
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
      <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
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
