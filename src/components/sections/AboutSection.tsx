import { ArrowUpRight, Diamond, Fingerprint, Layers2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, RevealGroup, RevealItem } from '@components/motion/Reveal';
import { GlassCard } from '@components/ui/GlassCard';
import { Section } from '@components/ui/Section';
import { profile } from '@data/profile';

const principleIcons = [Diamond, Fingerprint, Layers2];

export function AboutSection() {
  return (
    <Section spacing="custom" id="sobre-mi" className="home-section about-section">
      <div className="about-layout">
        <Reveal>
          <div className="section-kicker">
            <Diamond size={13} aria-hidden /> Sobre mí
          </div>
          <h2 className="about-heading">
            No estudio programación.
            <br />
            Construyo cosas y, de paso, estudio.
          </h2>
          <div className="about-story">
            {profile.story.slice(0, 2).map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <Link to="/about" className="text-link">
            Más sobre mi camino <ArrowUpRight size={15} />
          </Link>
        </Reveal>
        <RevealGroup className="principles" stagger={0.1}>
          {profile.principles.map((principle, index) => {
            const Icon = principleIcons[index];
            return (
              <RevealItem key={principle.id}>
                <GlassCard className="principle-card" glow>
                  <span className="principle-icon">
                    <Icon size={25} strokeWidth={1.5} aria-hidden />
                  </span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                  </div>
                </GlassCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
