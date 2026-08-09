import { motion, type Variants } from 'framer-motion';

/**
 * The three life forms of the garden.
 *
 * All three are pure SVG, sized by a single `scale` prop and swayed by a shared
 * animation. They intentionally share a visual grammar — same stroke weights,
 * same palette, same rounded organic curves — so the plot reads as one
 * ecosystem rather than three clip-art sets.
 *
 * Ninguno se dispara solo: ver la nota sobre el disparador, más abajo.
 */

interface OrganismProps {
  /** 0–1. Drives height, fullness and glow. */
  scale: number;
  /** Staggers the sway so the plot never breathes in unison. */
  seed?: number;
  accent?: string;
}

/* ── El disparador de la entrada NO vive aquí ───────────────────────────────
 *
 * Antes cada hoja, cada copa y cada pétalo llevaba su propio `whileInView`.
 * Dos problemas:
 *
 *   1. Son unos ochenta IntersectionObserver en una página con 17 organismos.
 *
 *   2. Y sobre todo: un elemento que arranca en `scale(0)` es INVISIBLE hasta
 *      que su propio observador dispara. Si ese observador no llega a
 *      dispararse nunca, la pieza no se queda a medias — desaparece del diseño
 *      para siempre. Y el tallo sí aparecía, porque se dibuja con `pathLength`
 *      sobre un elemento que siempre ocupa su sitio. De ahí el síntoma exacto
 *      que se veía en el móvil: canteros llenos de tallos pelados, sin una sola
 *      hoja.
 *
 * Ahora el disparador vive UNA sola vez por cantero, en `GardenScene`, sobre
 * una caja ancha que siempre ocupa espacio y nunca se escala a cero. Desde ahí
 * baja por el contexto de variantes de Framer, que viaja por el árbol de React:
 * los `<li>`, `<a>` y `<svg>` normales que hay en medio no lo cortan.
 *
 * Para quien edite esto: estos componentes SOLO declaran `variants`. En cuanto
 * uno lleve su propio `initial` o `animate`, se desengancha del cantero y el
 * problema vuelve.
 */

/** Traza un trazo de principio a fin. Para tallos, troncos y ramas. */
const draw = (delay: number, duration: number): Variants => ({
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

/** Brota desde nada. Para hojas, copas, pétalos y brotes. */
const sprout = (delay: number, duration = 0.6): Variants => ({
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration, delay, ease: [0.34, 1.56, 0.64, 1] },
  },
});

/**
 * El vaivén, en CSS y no en Framer.
 *
 * Son 17 organismos: 17 animaciones infinitas en JavaScript se notan en un
 * móvil de gama media. En CSS las lleva el compositor y, de regalo, la regla
 * global de `prefers-reduced-motion` de `base.css` ya las apaga sin que haya
 * que comprobar nada aquí.
 *
 * Además deja el `<svg>` como elemento normal, sin Framer encima. Eso importa:
 * un `<svg>` animado por Framer escribiría su propio `transform` y volvería a
 * chocar con las rotaciones de dentro.
 */
function sway(seed: number, origin: string) {
  return {
    className: 'animate-sway overflow-visible',
    style: {
      transformOrigin: origin,
      animationDuration: `${5.5 + (seed % 5) * 0.7}s`,
      animationDelay: `${(seed % 7) * 0.35}s`,
    },
  };
}

/** Cada organismo entra un poco después que el anterior: el cantero se siembra
 *  de izquierda a derecha en vez de aparecer de golpe. */
const stagger = (seed: number) => seed * 0.09;

/* ── Plant — a project ──────────────────────────────────────────────────── */

export function Plant({ scale, seed = 0, accent = 'var(--moss-300)' }: OrganismProps) {
  // Two things drive the silhouette. `scale` is the honest one: it comes from
  // the project's stage and must stay readable at a glance, so the range is
  // wide (35px → 118px). The `seed` term is cosmetic — a few pixels of jitter,
  // because six plants at the identical height read as a chart, not a garden.
  const height = 35 + scale * 83 + (seed % 3) * 5;
  const leafCount = 1 + Math.round(scale * 4);
  const from = stagger(seed);

  return (
    <svg viewBox="0 0 60 130" width="60" height="130" fill="none" {...sway(seed, '30px 128px')}>
      {/* stem */}
      <motion.path
        d={`M30 128 C30 ${128 - height * 0.4} 26 ${128 - height * 0.7} 30 ${128 - height}`}
        stroke="var(--moss-500)"
        strokeWidth="2.5"
        strokeLinecap="round"
        variants={draw(from, 1)}
      />

      {/* leaves, alternating sides up the stem */}
      {Array.from({ length: leafCount }, (_, index) => {
        const t = (index + 1) / (leafCount + 1);
        const y = 128 - height * t;
        const left = index % 2 === 0;
        const cx = left ? 18 : 42;
        // Lower leaves are the oldest, so they are the largest.
        const rx = 13 - index * 1.2;

        return (
          // El <g> lleva el ángulo, la elipse lleva la animación. Si se juntan
          // en el mismo elemento, el `transform` que escribe Framer borra el
          // `rotate` del atributo y la hoja sale plana.
          <g key={index} transform={`rotate(${left ? -26 : 26} ${cx} ${y})`}>
            <motion.ellipse
              cx={cx}
              cy={y}
              rx={rx}
              ry={rx * 0.42}
              fill="var(--moss-500)"
              fillOpacity="0.45"
              stroke="var(--moss-400)"
              strokeWidth="1"
              variants={sprout(from + 0.4 + index * 0.12)}
            />
          </g>
        );
      })}

      {/* bud — brighter the further along the project is */}
      <motion.circle
        cx="30"
        cy={128 - height}
        r={2.5 + scale * 3}
        fill={accent}
        variants={sprout(from + 0.9, 0.5)}
        style={{ filter: `drop-shadow(0 0 ${4 + scale * 8}px ${accent})` }}
      />
    </svg>
  );
}

/* ── Tree — a certificate ───────────────────────────────────────────────── */

export function Tree({ scale, seed = 0 }: OrganismProps) {
  const canopy = 24 + scale * 16;
  const from = stagger(seed);

  return (
    <svg viewBox="0 0 90 150" width="90" height="150" fill="none" {...sway(seed + 3, '45px 148px')}>
      {/* trunk */}
      <motion.path
        d="M45 148 L45 96"
        stroke="var(--moss-700)"
        strokeWidth="5"
        strokeLinecap="round"
        variants={draw(from, 0.8)}
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
          variants={draw(from + limb.delay, 0.5)}
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
          variants={sprout(from + blob.delay, 0.7)}
        />
      ))}
    </svg>
  );
}

/* ── Flower — a Garden Update ───────────────────────────────────────────── */

export function Flower({ scale, seed = 0, accent = 'var(--ember-300)' }: OrganismProps) {
  const height = 40 + scale * 34;
  const leafY = 108 - height * 0.45;
  const from = stagger(seed);

  return (
    <svg viewBox="0 0 50 110" width="50" height="110" fill="none" {...sway(seed + 6, '25px 108px')}>
      <motion.path
        d={`M25 108 C25 ${108 - height * 0.5} 22 ${108 - height * 0.75} 25 ${108 - height}`}
        stroke="var(--moss-500)"
        strokeWidth="2"
        strokeLinecap="round"
        variants={draw(from, 0.8)}
      />

      <g transform={`rotate(-24 15 ${leafY})`}>
        <motion.ellipse
          cx="15"
          cy={leafY}
          rx="9"
          ry="4"
          fill="var(--moss-500)"
          fillOpacity="0.4"
          variants={sprout(from + 0.45)}
        />
      </g>

      {/* petals — el grupo entero brota de una pieza, así que los pétalos de
          dentro pueden llevar su `rotate` tranquilos: Framer escribe sobre el
          <g>, no sobre ellos. */}
      <motion.g variants={sprout(from + 0.6)}>
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
    </svg>
  );
}
