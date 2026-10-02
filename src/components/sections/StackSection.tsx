import { ChevronDown } from 'lucide-react';
import type { CSSProperties } from 'react';
import { RevealGroup, RevealItem } from '@components/motion/Reveal';
import { GlassCard } from '@components/ui/GlassCard';
import { Section } from '@components/ui/Section';
import { SectionRail } from '@components/ui/SectionRail';
import { stack, levelLabel } from '@data/stack';
import type { StackItem } from '@/types';

export function StackSection() {
  const core = stack.filter(
    (item) => item.category === 'languages' || item.category === 'frontend',
  );
  const more = stack.filter(
    (item) => item.category !== 'languages' && item.category !== 'frontend',
  );
  return (
    <Section spacing="custom" id="stack" className="home-section">
      <SectionRail
        title="Lenguajes y herramientas"
        description="Herramientas que uso, con el nivel real en el que estoy."
      />
      <RevealGroup className="toolbox-grid" stagger={0.04}>
        {core.map((item) => (
          <RevealItem key={item.name}>
            <TechCard item={item} />
          </RevealItem>
        ))}
      </RevealGroup>
      {more.length > 0 && (
        <details className="more-tools">
          <summary>
            También cultivo {more.map((item) => item.name).join(', ')}{' '}
            <ChevronDown size={15} aria-hidden />
          </summary>
          <div className="toolbox-grid">
            {more.map((item) => (
              <TechCard key={item.name} item={item} />
            ))}
          </div>
        </details>
      )}
    </Section>
  );
}

function TechCard({ item }: { item: StackItem }) {
  return (
    <GlassCard className="tech-card" spotlight>
      <div className="tech-layout" style={{ '--tech-color': item.accent } as CSSProperties}>
        <span className="tech-monogram" aria-hidden>
          {item.mark}
        </span>
        <div className="tech-content">
          <div className="tech-heading">
            <h3>{item.name}</h3>
            <span>{levelLabel[item.level]}</span>
          </div>
          <div
            className="tech-level"
            role="img"
            aria-label={`Nivel ${item.level} de 5: ${levelLabel[item.level]}`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className={index < item.level ? 'is-filled' : undefined} />
            ))}
          </div>
          <p>{item.note}</p>
        </div>
      </div>
    </GlassCard>
  );
}
