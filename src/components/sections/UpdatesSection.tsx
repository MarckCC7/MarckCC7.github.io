import { ArrowRight } from 'lucide-react';

import { UpdateCard } from '@components/cards/UpdateCard';
import { Reveal, RevealGroup, RevealItem } from '@components/motion/Reveal';
import { ButtonLink } from '@components/ui/Button';
import { Section } from '@components/ui/Section';
import { SectionRail } from '@components/ui/SectionRail';
import { sortedUpdates } from '@data/updates';

/** The three most recent entries in the growth log. */
export function UpdatesSection() {
  const recent = sortedUpdates.slice(0, 3);

  return (
    <Section spacing="custom" id="updates" className="home-section">
      <SectionRail title="Garden Updates" description="El registro de lo que está creciendo." />

      <RevealGroup className="grid gap-4 md:grid-cols-3" stagger={0.1}>
        {recent.map((update) => (
          <RevealItem key={update.slug} className="h-full">
            <UpdateCard update={update} compact />
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
