import { ArrowUpRight, Music2, Sparkles } from 'lucide-react';

import { Reveal } from '@components/motion/Reveal';
import { ButtonLink } from '@components/ui/Button';
import { GlassCard } from '@components/ui/GlassCard';
import { Section } from '@components/ui/Section';
import { SectionRail } from '@components/ui/SectionRail';

const ARTISTIC_PORTFOLIO_URL = 'https://mcollado-marinera-arequipa.vercel.app';

export function ArtisticSection() {
  return (
    <Section spacing="custom" id="danza" className="home-section artistic-section">
      <SectionRail title="Mi lado artístico" description="También cuento historias bailando." />

      <Reveal>
        <GlassCard className="artistic-feature" glow>
          <div className="artistic-copy">
            <p className="artistic-label">
              <Music2 size={15} aria-hidden />
              Marinera · Danza peruana
            </p>
            <h2>Cuando no estoy programando, bailo.</h2>
            <p>
              Me encanta bailar. La marinera y las danzas peruanas son otra forma de expresar lo que
              soy: disciplina, presencia, identidad y una historia que también se construye sobre el
              escenario.
            </p>
            <ButtonLink
              href={ARTISTIC_PORTFOLIO_URL}
              variant="moss"
              trailing={<ArrowUpRight size={16} />}
            >
              Ver portafolio artístico
            </ButtonLink>
          </div>

          <div className="artistic-visual" aria-hidden>
            <span className="artistic-orbit artistic-orbit-outer" />
            <span className="artistic-orbit artistic-orbit-inner" />
            <span className="artistic-spark artistic-spark-one">
              <Sparkles size={15} />
            </span>
            <span className="artistic-spark artistic-spark-two">
              <Sparkles size={11} />
            </span>
            <span className="artistic-mark">
              <Music2 size={48} strokeWidth={1.35} />
            </span>
            <span className="artistic-caption">RITMO · IDENTIDAD · CONSTANCIA</span>
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
