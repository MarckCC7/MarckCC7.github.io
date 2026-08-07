import { ArrowRight } from 'lucide-react';

import { UpdateCard } from '@components/cards/UpdateCard';
import { Reveal, RevealGroup, RevealItem } from '@components/motion/Reveal';
import { ButtonLink } from '@components/ui/Button';
import { Section } from '@components/ui/Section';
import { SectionHeading } from '@components/ui/SectionHeading';
import { sortedUpdates } from '@data/updates';

/** The three most recent entries in the growth log. */
export function UpdatesSection() {
  const recent = sortedUpdates.slice(0, 3);

  return (
    <Section id="updates">
      <SectionHeading
        eyebrow="06 · Garden Updates"
        title="El registro de lo que está creciendo."
        description="No es un blog. Es la bitácora del jardín: eventos, hackathons, logros y proyectos nuevos, en el orden en que pasaron."
      />

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.1}>
        {recent.map((update) => (
          <RevealItem key={update.slug} className="h-full">
            <UpdateCard update={update} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-10 flex justify-center">
        <ButtonLink
          href="/updates"
          variant="secondary"
          size="lg"
          trailing={
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          }
        >
          Ver todas las publicaciones
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
