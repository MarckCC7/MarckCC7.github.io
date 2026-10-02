import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Flower, Plant, Tree } from '@components/garden/GardenOrganisms';
import { GlassCard } from '@components/ui/GlassCard';
import { Section } from '@components/ui/Section';
import { SectionRail } from '@components/ui/SectionRail';
import { certificates } from '@data/certificates';
import { projects, stageMeta } from '@data/projects';
import { updates } from '@data/updates';
import { usePrefersReducedMotion } from '@hooks/useMediaQuery';

export function GardenOverview() {
  const reducedMotion = usePrefersReducedMotion();
  const beds = [
    {
      title: 'Proyectos',
      count: `${projects.length} plantas`,
      href: '/projects',
      kind: 'plants',
      description: 'Cada planta crece según la etapa real del proyecto.',
    },
    {
      title: 'Certificados',
      count: `${certificates.length} árboles`,
      href: '/#certificados',
      kind: 'trees',
      description: 'Lo que ya echó raíz y sigue creciendo conmigo.',
    },
    {
      title: 'Updates',
      count: `${updates.length} flores`,
      href: '/updates',
      kind: 'flowers',
      description: 'Cada publicación abre una nueva flor.',
    },
  ];
  return (
    <Section spacing="custom" id="mi-jardin" className="home-section">
      <SectionRail
        title="Mi jardín"
        description="Cada parte de mi jardín representa una etapa de mi camino."
      />
      <div className="garden-overview-grid">
        {beds.map((bed) => (
          <GlassCard key={bed.kind} className="garden-overview-card" glow>
            <Link to={bed.href} className="garden-overview-link" data-cursor="card">
              <h3>{bed.title}</h3>
              <p className="garden-count">{bed.count}</p>
              <motion.div
                className="garden-miniature"
                aria-hidden
                initial={reducedMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {bed.kind === 'plants' &&
                  projects.slice(0, 6).map((project, index) => (
                    <Plant
                      key={project.slug}
                      scale={stageMeta[project.stage].growth}
                      seed={index}
                    />
                  ))}
                {bed.kind === 'trees' &&
                  certificates
                    .slice(0, 4)
                    .map((certificate, index) => (
                      <Tree key={certificate.id} scale={0.65} seed={index} />
                    ))}
                {bed.kind === 'flowers' &&
                  updates
                    .slice(0, 4)
                    .map((update, index) => (
                      <Flower
                        key={update.slug}
                        scale={0.65}
                        seed={index}
                        accent="var(--azure-300)"
                      />
                    ))}
              </motion.div>
              <div className="garden-overview-foot">
                <p>{bed.description}</p>
                <span className="circle-arrow">
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
