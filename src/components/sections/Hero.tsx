import { motion } from 'framer-motion';
import { ArrowRight, Sprout } from 'lucide-react';
import { GardenIllustration } from '@components/illustrations/GardenIllustration';
import { BrandIcon } from '@components/ui/BrandIcon';
import { ButtonLink } from '@components/ui/Button';
import { Container } from '@components/ui/Container';
import { profile } from '@data/profile';
import { activeStage } from '@data/roadmap';
import { site } from '@data/site';
import { heroSocials } from '@data/socials';
import { usePrefersReducedMotion } from '@hooks/useMediaQuery';

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const rise = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };
  return (
    <section className="garden-hero">
      <Container>
        <div className="hero-layout">
          <div className="hero-copy">
            <motion.div {...rise(0.1)} className="hero-status">
              <span className="status-light" aria-hidden />
              Creciendo ahora <span aria-hidden>·</span> {activeStage.title}
            </motion.div>
            <motion.h1 {...rise(0.2)} className="hero-name">
              <span>Marco</span>
              <span className="hero-surname">Collado C.</span>
            </motion.h1>
            <motion.p {...rise(0.3)} className="hero-motto">
              {site.motto}
            </motion.p>
            <motion.p {...rise(0.4)} className="hero-description">
              {profile.intro}
            </motion.p>
            <motion.div {...rise(0.5)} className="hero-actions">
              <ButtonLink href="/projects" trailing={<ArrowRight size={16} />}>
                Ver proyectos
              </ButtonLink>
              <ButtonLink href="/garden" variant="secondary" leading={<Sprout size={17} />}>
                Explorar jardín
              </ButtonLink>
              <div className="hero-socials">
                {heroSocials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="hero-social"
                    data-cursor="button"
                  >
                    <BrandIcon id={social.id} className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div {...rise(0.25)} className="hero-garden">
            <GardenIllustration />
            <div className="hero-garden-words" aria-hidden>
              <span>Ideas</span>
              <span>Código</span>
              <span>Aprendizaje</span>
              <span>Proyectos</span>
              <span>Personas</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
