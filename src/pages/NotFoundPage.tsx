import { motion } from 'framer-motion';

import { PixelSprite } from '@components/easter-eggs/PixelSprite';
import { GARDENER, SAPLING } from '@components/easter-eggs/sprites';
import { Seo } from '@components/seo/Seo';
import { ButtonLink } from '@components/ui/Button';
import { Container } from '@components/ui/Container';
import { usePrefersReducedMotion } from '@hooks/useMediaQuery';

/**
 * 404.
 *
 * The gardener walks in and tells you there is nothing planted here. A dead end
 * is the cheapest place on a site to show personality, because nobody expected
 * anything from it.
 */
export function NotFoundPage() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <>
      <Seo title="Aquí no crece nada" path="/404" noIndex />

      <Container className="flex min-h-[80svh] flex-col items-center justify-center py-32 text-center">
        {/* The gardener walks in from the left; the one sapling that did take
            root here is already waiting. */}
        <div className="flex items-end gap-8">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="block"
              animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <PixelSprite frame={GARDENER} scale={6} />
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="origin-bottom"
          >
            <motion.span
              className="block"
              animate={reducedMotion ? undefined : { rotate: [-3, 3, -3] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'bottom center' }}
            >
              <PixelSprite frame={SAPLING} scale={6} />
            </motion.span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-pixel mt-12 text-[0.625rem] text-moss-300"
        >
          404 — TERRENO VACÍO
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-6 max-w-2xl text-display-sm text-ink"
        >
          Aquí todavía no he plantado nada.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-5 max-w-md leading-relaxed text-base text-ink-secondary"
        >
          Esta parcela está vacía. Puede que lo esté por ahora, o puede que nunca haya existido — en
          un jardín las dos cosas pasan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <ButtonLink href="/" variant="primary" size="lg">
            Volver al inicio
          </ButtonLink>
          <ButtonLink href="/garden" variant="secondary" size="lg">
            Explorar el jardín
          </ButtonLink>
        </motion.div>
      </Container>
    </>
  );
}
