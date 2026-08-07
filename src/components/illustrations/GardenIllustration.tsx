import { motion } from 'framer-motion';

import { usePrefersReducedMotion } from '@hooks/useMediaQuery';
import { cn } from '@utils/cn';

/**
 * The hero illustration: a terrarium holding a growing system.
 *
 * Hand-authored SVG rather than a stock 3D render or a photograph. Three
 * reasons, in order of importance:
 *
 *   1. It is the only image on the site that cannot exist on anyone else's.
 *   2. It weighs a few kilobytes and stays razor sharp on any display.
 *   3. Every element is animatable, so the plant literally grows on load —
 *      which is the entire thesis of the site, stated without a sentence.
 *
 * The geometry is deliberately abstract: a stem, branches, nodes. It reads as
 * a plant and as a dependency graph at the same time.
 */
export function GardenIllustration({ className }: { className?: string }) {
  const reducedMotion = usePrefersReducedMotion();

  /** Skips entrance choreography but keeps the final composition intact. */
  const entrance = (delay: number, duration = 1.2) =>
    reducedMotion
      ? { initial: false as const }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const pop = (delay: number) =>
    reducedMotion
      ? { initial: false as const }
      : {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.7, delay, ease: [0.34, 1.56, 0.64, 1] as const },
        };

  return (
    <div className={cn('relative aspect-square w-full', className)}>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        role="img"
        aria-label="Ilustración de un jardín digital: un sistema que crece desde una semilla"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="stem-gradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--moss-600)" />
            <stop offset="60%" stopColor="var(--moss-400)" />
            <stop offset="100%" stopColor="var(--moss-200)" />
          </linearGradient>

          <linearGradient id="leaf-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--moss-300)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--moss-600)" stopOpacity="0.25" />
          </linearGradient>

          <radialGradient id="halo" cx="50%" cy="50%">
            <stop offset="0%" stopColor="var(--moss-400)" stopOpacity="0.22" />
            <stop offset="70%" stopColor="var(--moss-500)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          <filter id="soft-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* — Halo ————————————————————————————————— */}
        <circle cx="200" cy="205" r="185" fill="url(#halo)" />

        {/* — Orbit rings: the system around the plant ——— */}
        {[
          { r: 150, duration: 68, dash: '1 13', opacity: 0.5 },
          { r: 118, duration: 48, dash: '1 9', opacity: 0.38 },
          { r: 86, duration: 34, dash: '1 7', opacity: 0.26 },
        ].map((ring, index) => (
          <motion.circle
            key={ring.r}
            cx="200"
            cy="205"
            r={ring.r}
            stroke="var(--moss-300)"
            strokeWidth="1.5"
            strokeDasharray={ring.dash}
            strokeLinecap="round"
            opacity={ring.opacity}
            style={{ transformOrigin: '200px 205px' }}
            animate={reducedMotion ? undefined : { rotate: index % 2 === 0 ? 360 : -360 }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {/* — Soil line ————————————————————————————— */}
        <motion.path
          d="M96 318 H304"
          stroke="var(--line-strong)"
          strokeWidth="1.5"
          strokeLinecap="round"
          {...entrance(0.1, 0.9)}
        />

        {/* — Main stem ————————————————————————————— */}
        <motion.path
          d="M200 318 C200 280 196 250 200 214 C203 186 199 160 200 132"
          stroke="url(#stem-gradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          {...entrance(0.25, 1.5)}
        />

        {/* — Branches ——————————————————————————————
            Each branch ends in a node: a project growing off the trunk.   */}
        {BRANCHES.map((branch, index) => (
          <g key={branch.id}>
            <motion.path
              d={branch.path}
              stroke="var(--moss-500)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={0.9}
              {...entrance(0.75 + index * 0.16, 0.8)}
            />

            <motion.ellipse
              cx={branch.leaf.x}
              cy={branch.leaf.y}
              rx="19"
              ry="8.5"
              fill="url(#leaf-gradient)"
              stroke="var(--moss-400)"
              strokeWidth="1"
              transform={`rotate(${branch.leaf.angle} ${branch.leaf.x} ${branch.leaf.y})`}
              style={{ transformOrigin: `${branch.leaf.x}px ${branch.leaf.y}px` }}
              {...pop(1.0 + index * 0.16)}
            />

            <motion.circle
              cx={branch.node.x}
              cy={branch.node.y}
              r="3.5"
              fill="var(--moss-200)"
              filter="url(#soft-glow)"
              {...pop(1.15 + index * 0.16)}
            />
          </g>
        ))}

        {/* — Crown bud: the thing still forming ————————— */}
        <motion.g {...pop(1.75)} style={{ transformOrigin: '200px 132px' }}>
          <motion.circle
            cx="200"
            cy="132"
            r="13"
            fill="var(--azure-500)"
            fillOpacity="0.12"
            stroke="var(--azure-400)"
            strokeWidth="1.5"
            animate={reducedMotion ? undefined : { r: [13, 15.5, 13], opacity: [0.9, 0.55, 0.9] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="200" cy="132" r="4.5" fill="var(--azure-300)" filter="url(#soft-glow)" />
        </motion.g>

        {/* — Pixel sprout: the RPG detail, one per illustration ————— */}
        <motion.g {...pop(2)}>
          {PIXEL_SPROUT.map((pixel, index) => (
            <motion.rect
              key={`${pixel.x}-${pixel.y}`}
              x={pixel.x}
              y={pixel.y}
              width="6"
              height="6"
              fill={pixel.fill}
              animate={reducedMotion ? undefined : { opacity: [1, 0.35, 1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.22,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.g>

        {/* — Floating motes ————————————————————————— */}
        {MOTES.map((mote, index) => (
          <motion.circle
            key={`${mote.cx}-${mote.cy}`}
            cx={mote.cx}
            cy={mote.cy}
            r={mote.r}
            fill={mote.fill}
            opacity="0.7"
            animate={reducedMotion ? undefined : { y: [0, -22, 0], opacity: [0.25, 0.75, 0.25] }}
            transition={{
              duration: 6 + index * 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.7,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ── Geometry ───────────────────────────────────────────────────────────── */

const BRANCHES = [
  {
    id: 'left-low',
    path: 'M199 268 C176 262 158 250 143 236',
    leaf: { x: 133, y: 230, angle: -28 },
    node: { x: 143, y: 236 },
  },
  {
    id: 'right-mid',
    path: 'M201 236 C226 231 246 219 262 203',
    leaf: { x: 272, y: 197, angle: 28 },
    node: { x: 262, y: 203 },
  },
  {
    id: 'left-high',
    path: 'M199 200 C180 194 166 184 154 172',
    leaf: { x: 144, y: 166, angle: -32 },
    node: { x: 154, y: 172 },
  },
  {
    id: 'right-high',
    path: 'M201 172 C219 167 232 158 243 147',
    leaf: { x: 253, y: 141, angle: 32 },
    node: { x: 243, y: 147 },
  },
] as const;

/** A four-pixel seedling poking out of the soil, left of the main stem. */
const PIXEL_SPROUT = [
  { x: 141, y: 306, fill: 'var(--moss-400)' },
  { x: 141, y: 300, fill: 'var(--moss-300)' },
  { x: 135, y: 300, fill: 'var(--moss-500)' },
  { x: 147, y: 294, fill: 'var(--moss-200)' },
] as const;

const MOTES = [
  { cx: 108, cy: 168, r: 2.5, fill: 'var(--moss-200)' },
  { cx: 296, cy: 244, r: 2, fill: 'var(--azure-300)' },
  { cx: 262, cy: 108, r: 1.8, fill: 'var(--moss-300)' },
  { cx: 132, cy: 96, r: 2.2, fill: 'var(--azure-400)' },
  { cx: 320, cy: 176, r: 1.6, fill: 'var(--moss-200)' },
] as const;
