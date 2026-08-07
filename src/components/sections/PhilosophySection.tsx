import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { Container } from '@components/ui/Container';
import { site } from '@data/site';
import { usePrefersReducedMotion } from '@hooks/useMediaQuery';
import { splitWords } from '@utils/text';

/**
 * A full-width pause between the roadmap and the projects.
 *
 * Every long page needs at least one moment that carries almost no information.
 * It resets the reader's attention, and it is the only place the motto is
 * allowed to be loud.
 *
 * ── The one place GSAP is used ─────────────────────────────────────────────
 *
 * The motto lights up word by word, scrubbed to scroll position: reading speed
 * is literally tied to scrolling speed. That is a timeline across N independent
 * targets driven by scroll — ScrollTrigger's exact strength, and the one effect
 * on this site that would be worse hand-rolled. Everything else stays in Framer.
 */
export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // A slow drift makes the statement feel like it is passing by rather than
  // sitting still — the difference between a quote and a moment.
  const driftRight = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  useEffect(() => {
    const container = wordsRef.current;
    if (!container || reducedMotion) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    // GSAP arrives in its own chunk, after first paint, and never at all for
    // visitors who prefer reduced motion. See the note in `lib/gsap.ts`.
    void import('@lib/gsap').then(({ gsap }) => {
      if (cancelled) return;

      // `gsap.context` scopes every selector and tween to this element and
      // reverts them all on cleanup — the only safe way to use GSAP under
      // StrictMode's double-invoked effects.
      ctx = gsap.context(() => {
        gsap.fromTo(
          '[data-word]',
          { opacity: 0.16, filter: 'blur(3px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'none',
            stagger: 0.5,
            scrollTrigger: {
              trigger: container,
              start: 'top 78%',
              end: 'bottom 42%',
              scrub: 0.6,
            },
          },
        );
      }, container);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reducedMotion]);

  const words = splitWords(site.motto);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-section">
      {/* Ghost line drifting behind the statement */}
      <motion.p
        aria-hidden
        style={reducedMotion ? undefined : { x: driftRight }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[18vw] leading-none font-bold tracking-tighter text-ink opacity-[0.028] select-none"
      >
        PASIÓN
      </motion.p>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-pixel text-[0.5625rem] text-moss-300">Filosofía</span>

          {/* Solid colour, not `.text-gradient`: `background-clip: text` turns
              the glyphs into a mask for the parent's background, and a child's
              opacity does not affect that mask — the words would never dim. */}
          <p ref={wordsRef} aria-label={site.motto} className="mt-8 text-display-md text-ink">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} data-word aria-hidden className="inline-block">
                {word}
                {index < words.length - 1 && ' '}
              </span>
            ))}
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-8 max-w-xl leading-relaxed text-base text-ink-secondary"
          >
            No es una frase motivacional. Es un filtro. Si una idea no me quita el sueño, no la
            empiezo — porque construir algo que dure exige más constancia de la que cabe en el
            entusiasmo prestado.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
