import { motion } from 'framer-motion';
import { ArrowRight, Sprout } from 'lucide-react';

import { Magnetic } from '@components/motion/Magnetic';
import { TextReveal } from '@components/motion/TextReveal';
import { GardenIllustration } from '@components/illustrations/GardenIllustration';
import { BrandIcon } from '@components/ui/BrandIcon';
import { ButtonLink } from '@components/ui/Button';
import { Container } from '@components/ui/Container';
import { profile } from '@data/profile';
import { activeStage } from '@data/roadmap';
import { site } from '@data/site';
import { heroSocials } from '@data/socials';
import { usePrefersReducedMotion } from '@hooks/useMediaQuery';

/**
 * The hero.
 *
 * Sequenced, not simultaneous: status → name → motto → description → actions →
 * illustration. Everything arriving at once reads as a page load; things
 * arriving in the order you would read them reads as a composition.
 */
export function Hero() {
  const reducedMotion = usePrefersReducedMotion();

  const rise = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          {/* ── Copy ─────────────────────────────────────────────── */}
          <div className="relative z-10 max-w-2xl">
            {/* Status — currently growing */}
            <motion.div {...rise(0.15)} className="mb-8">
              <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss-300 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-moss-300" />
                </span>
                <span className="text-pixel text-[0.5rem] text-ink-secondary">
                  Creciendo ahora · {activeStage.title}
                </span>
              </span>
            </motion.div>

            {/* Name */}
            <h1 className="text-display-lg">
              <TextReveal immediate text="Marco" delay={0.3} className="text-gradient block" />
              <TextReveal
                immediate
                text="Collado C."
                delay={0.42}
                className="block text-ink-muted"
              />
            </h1>

            {/* Motto — the thesis of everything */}
            <motion.p
              {...rise(0.75)}
              className="mt-7 flex items-start gap-3 font-display text-lg leading-snug tracking-tight text-ink sm:text-xl"
            >
              <span aria-hidden className="mt-2 h-6 w-px shrink-0 bg-moss-400" />
              {site.motto}
            </motion.p>

            {/* Description */}
            <motion.p
              {...rise(0.88)}
              className="mt-6 max-w-xl leading-relaxed text-base text-ink-secondary sm:text-lg"
            >
              {profile.intro}
            </motion.p>

            {/* Actions */}
            <motion.div {...rise(1.02)} className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink
                href="/projects"
                size="lg"
                variant="primary"
                trailing={
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                }
              >
                Ver proyectos
              </ButtonLink>

              <ButtonLink
                href="/garden"
                size="lg"
                variant="secondary"
                leading={<Sprout size={17} className="text-moss-300" />}
              >
                Explorar jardín
              </ButtonLink>

              <div className="flex items-center gap-2">
                {heroSocials.map((social) => (
                  <Magnetic key={social.id} strength={0.35}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      data-cursor="button"
                      className="glass grid h-13 w-13 place-items-center rounded-2xl text-ink-secondary transition-colors duration-300 hover:border-line-strong hover:text-ink"
                    >
                      <BrandIcon id={social.id} className="h-5 w-5" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>

            {/* Facts */}
            <motion.dl {...rise(1.16)} className="mt-14 flex flex-wrap gap-x-10 gap-y-5">
              {profile.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[0.6875rem] tracking-[0.08em] text-ink-muted uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-mono text-2xl text-ink tabular-nums">
                    {fact.value}
                    {fact.suffix}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ── Illustration ─────────────────────────────────────── */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            >
              <GardenIllustration />
            </motion.div>
          </motion.div>
        </div>
      </Container>

      <ScrollCue />
    </section>
  );
}

/** A quiet nudge that there is more below. Fades out as soon as you scroll. */
function ScrollCue() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.8 }}
      className="absolute inset-x-0 bottom-8 hidden justify-center md:flex"
    >
      <a
        href="#sobre-mi"
        aria-label="Bajar a la siguiente sección"
        data-cursor="link"
        className="group flex flex-col items-center gap-2.5"
      >
        <span className="text-pixel text-[0.5rem] text-ink-muted transition-colors group-hover:text-moss-300">
          Sigue bajando
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-moss-300"
            animate={reducedMotion ? undefined : { y: [-16, 40] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </a>
    </motion.div>
  );
}
