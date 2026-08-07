import { motion, useScroll, useTransform } from 'framer-motion';

import { usePrefersReducedMotion } from '@hooks/useMediaQuery';

import { ParticleField } from './ParticleField';

/**
 * The living backdrop, fixed behind every page.
 *
 * Four layers, cheapest first:
 *   1. a static vignette that anchors the composition
 *   2. three slow aurora blooms (CSS-animated, no JS per frame)
 *   3. a faint grid that gives the glass something to refract
 *   4. the particle canvas
 *   5. film grain, which is what stops the gradients from banding
 *
 * `pointer-events-none` throughout — the background is scenery, never a target.
 */
export function AmbientBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();

  // The aurora drifts a little as the page scrolls: depth without parallax cost.
  const auroraY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* 1 — vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,var(--surface-raised),var(--surface-base)_58%)]" />

      {/* 2 — aurora blooms */}
      <motion.div style={reducedMotion ? undefined : { y: auroraY }} className="absolute inset-0">
        <div className="absolute -top-[18%] left-[-10%] h-[52vmax] w-[52vmax] animate-breathe rounded-full bg-[radial-gradient(circle,var(--ambient-a),transparent_66%)] blur-[70px]" />
        <div
          className="absolute top-[28%] right-[-14%] h-[46vmax] w-[46vmax] animate-breathe rounded-full bg-[radial-gradient(circle,var(--ambient-b),transparent_66%)] blur-[80px]"
          style={{ animationDelay: '-3.5s' }}
        />
        <div
          className="absolute bottom-[-16%] left-[24%] h-[40vmax] w-[40vmax] animate-breathe rounded-full bg-[radial-gradient(circle,var(--ambient-c),transparent_70%)] blur-[90px]"
          style={{ animationDelay: '-6s' }}
        />
      </motion.div>

      {/* 3 — grid */}
      <div
        className="mask-fade-b absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(var(--line-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--line-subtle) 1px, transparent 1px)',
          backgroundSize: '68px 68px',
        }}
      />

      {/* 4 — pollen and leaves */}
      <ParticleField className="absolute inset-0" />

      {/* 5 — grain */}
      <GrainOverlay />
    </div>
  );
}

/**
 * Film grain as an inline SVG data URI.
 *
 * `feTurbulence` generates the noise on the GPU at paint time — no texture to
 * download, no extra request, and it scales to any display density for free.
 */
function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 mix-blend-soft-light"
      style={{
        opacity: 'var(--grain-opacity)',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
