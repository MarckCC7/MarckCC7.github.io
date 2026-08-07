import { motion } from 'framer-motion';

import { usePrefersReducedMotion } from '@hooks/useMediaQuery';

/**
 * The three life forms of the garden.
 *
 * All three are pure SVG, sized by a single `scale` prop and swayed by a shared
 * animation. They intentionally share a visual grammar — same stroke weights,
 * same palette, same rounded organic curves — so the plot reads as one
 * ecosystem rather than three clip-art sets.
 */

interface OrganismProps {
  /** 0–1. Drives height, fullness and glow. */
  scale: number;
  /** Staggers the sway so the plot never breathes in unison. */
  seed?: number;
  accent?: string;
}

function useSway(seed: number) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return {};

  return {
    animate: { rotate: [-1.6, 1.6, -1.6] },
    transition: {
      duration: 5.5 + (seed % 5) * 0.7,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay: (seed % 7) * 0.35,
    },
  };
}

/* ── Plant — a project ──────────────────────────────────────────────────── */

export function Plant({ scale, seed = 0, accent = 'var(--moss-300)' }: OrganismProps) {
  const sway = useSway(seed);

  // Two things drive the silhouette. `scale` is the honest one: it comes from
  // the project's stage and must stay readable at a glance, so the range is
  // wide (35px → 118px). The `seed` term is cosmetic — a few pixels of jitter,
  // because six plants at the identical height read as a chart, not a garden.
  const height = 35 + scale * 83 + (seed % 3) * 5;
  const leafCount = 1 + Math.round(scale * 4);

  return (
    <motion.svg
      viewBox="0 0 60 130"
      width="60"
      height="130"
      fill="none"
      className="overflow-visible"
      style={{ transformOrigin: '30px 128px' }}
      {...sway}
    >
      {/* stem */}
      <motion.path
        d={`M30 128 C30 ${128 - height * 0.4} 26 ${128 - height * 0.7} 30 ${128 - height}`}
        stroke="var(--moss-500)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* leaves, alternating sides up the stem */}
      {Array.from({ length: leafCount }, (_, index) => {
        const t = (index + 1) / (leafCount + 1);
        const y = 128 - height * t;
        const left = index % 2 === 0;
        // Lower leaves are the oldest, so they are the largest.
        const rx = 13 - index * 1.2;

        return (
          <motion.ellipse
            key={index}
            cx={left ? 18 : 42}
            cy={y}
            rx={rx}
            ry={rx * 0.42}
            fill="var(--moss-500)"
            fillOpacity="0.45"
            stroke="var(--moss-400)"
            strokeWidth="1"
            transform={`rotate(${left ? -26 : 26} ${left ? 18 : 42} ${y})`}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.4 + index * 0.12,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            style={{ transformOrigin: `${left ? 18 : 42}px ${y}px` }}
          />
        );
      })}

      {/* bud — brighter the further along the project is */}
      <motion.circle
        cx="30"
        cy={128 - height}
        r={2.5 + scale * 3}
        fill={accent}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ filter: `drop-shadow(0 0 ${4 + scale * 8}px ${accent})` }}
      />
    </motion.svg>
  );
}

/* ── Tree — a certificate ───────────────────────────────────────────────── */

export function Tree({ scale, seed = 0 }: OrganismProps) {
  const sway = useSway(seed + 3);
  const canopy = 24 + scale * 16;

  return (
    <motion.svg
      viewBox="0 0 90 150"
      width="90"
      height="150"
      fill="none"
      className="overflow-visible"
      style={{ transformOrigin: '45px 148px' }}
      {...sway}
    >
      {/* trunk */}
      <motion.path
        d="M45 148 L45 96"
        stroke="var(--moss-700)"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* two lower limbs */}
      {[
        { d: 'M45 118 L28 104', delay: 0.5 },
        { d: 'M45 110 L62 96', delay: 0.62 },
      ].map((limb) => (
        <motion.path
          key={limb.d}
          d={limb.d}
          stroke="var(--moss-700)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: limb.delay }}
        />
      ))}

      {/* canopy — three overlapping blooms */}
      {[
        { cx: 45, cy: 72, r: canopy, delay: 0.75, opacity: 0.5 },
        { cx: 28, cy: 88, r: canopy * 0.7, delay: 0.85, opacity: 0.4 },
        { cx: 62, cy: 86, r: canopy * 0.72, delay: 0.95, opacity: 0.4 },
      ].map((blob) => (
        <motion.circle
          key={`${blob.cx}-${blob.cy}`}
          cx={blob.cx}
          cy={blob.cy}
          r={blob.r}
          fill="var(--moss-500)"
          fillOpacity={blob.opacity}
          stroke="var(--moss-400)"
          strokeWidth="1"
          strokeOpacity="0.5"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: blob.delay, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: `${blob.cx}px ${blob.cy}px` }}
        />
      ))}
    </motion.svg>
  );
}

/* ── Flower — a Garden Update ───────────────────────────────────────────── */

export function Flower({ scale, seed = 0, accent = 'var(--ember-300)' }: OrganismProps) {
  const sway = useSway(seed + 6);
  const height = 40 + scale * 34;

  return (
    <motion.svg
      viewBox="0 0 50 110"
      width="50"
      height="110"
      fill="none"
      className="overflow-visible"
      style={{ transformOrigin: '25px 108px' }}
      {...sway}
    >
      <motion.path
        d={`M25 108 C25 ${108 - height * 0.5} 22 ${108 - height * 0.75} 25 ${108 - height}`}
        stroke="var(--moss-500)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <ellipse
        cx="15"
        cy={108 - height * 0.45}
        rx="9"
        ry="4"
        fill="var(--moss-500)"
        fillOpacity="0.4"
        transform={`rotate(-24 15 ${108 - height * 0.45})`}
      />

      {/* petals */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: `25px ${108 - height}px` }}
      >
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            cx="25"
            cy={108 - height - 6}
            rx="4"
            ry="7"
            fill={accent}
            fillOpacity="0.7"
            transform={`rotate(${angle} 25 ${108 - height})`}
          />
        ))}
        <circle
          cx="25"
          cy={108 - height}
          r="3.5"
          fill="var(--moss-100)"
          style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
        />
      </motion.g>
    </motion.svg>
  );
}
