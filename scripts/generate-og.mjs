/**
 * Generates every raster asset the site needs, from SVG sources defined here.
 *
 *   npm run og
 *
 * Rasterising at build time (rather than committing binaries edited by hand)
 * means the social card and the PWA icons can never drift out of sync with the
 * design tokens — change a colour below, re-run, done.
 *
 * Outputs into `public/`:
 *   og-image.png            1200×630  social preview
 *   icon-192.png            192×192   PWA
 *   icon-512.png            512×512   PWA
 *   icon-maskable-512.png   512×512   PWA, with safe-area padding
 *   apple-touch-icon.png    180×180   iOS home screen
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

/* ── Tokens (mirror of src/styles/tokens.css) ───────────────────────────── */

const C = {
  base: '#070908',
  raised: '#0c100e',
  moss200: '#b8deca',
  moss300: '#8fcaac',
  moss400: '#66b38c',
  moss500: '#45996f',
  moss700: '#245f43',
  azure400: '#7a9eff',
  ink: '#ecf1ee',
  inkMuted: '#67736d',
  inkSecondary: '#97a39d',
};

/**
 * A font stack that resolves on Windows, macOS and Linux CI alike.
 * librsvg falls through the list until it finds something installed.
 */
const SANS = "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, 'DejaVu Sans', sans-serif";

/* ── The sprout mark, shared by every icon ──────────────────────────────── */

function sproutMark(x, y, unit) {
  const u = unit;
  // Asymmetric on purpose: two leaves at the same height read as a plus sign,
  // not a plant. Offsetting the right leaf by one cell is the whole trick.
  return `
    <rect x="${x + u * 2}" y="${y + u * 4}" width="${u * 2}" height="${u * 4}" fill="${C.moss500}"/>
    <rect x="${x + u * 2}" y="${y + u * 2}" width="${u * 2}" height="${u * 2}" fill="${C.moss400}"/>
    <rect x="${x}"         y="${y + u * 3}" width="${u * 2}" height="${u * 2}" fill="${C.moss400}"/>
    <rect x="${x + u * 4}" y="${y + u}"     width="${u * 2}" height="${u * 2}" fill="${C.moss300}"/>
    <rect x="${x + u * 2}" y="${y}"         width="${u * 2}" height="${u * 2}" fill="${C.moss200}"/>
  `;
}

/* ── Social card ────────────────────────────────────────────────────────── */

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bloomA" cx="12%" cy="0%" r="70%">
      <stop offset="0%" stop-color="${C.moss400}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${C.moss400}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bloomB" cx="92%" cy="88%" r="66%">
      <stop offset="0%" stop-color="${C.azure400}" stop-opacity="0.24"/>
      <stop offset="100%" stop-color="${C.azure400}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="stem" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="${C.moss700}"/>
      <stop offset="100%" stop-color="${C.moss200}"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0 H0 V48" fill="none" stroke="${C.ink}" stroke-opacity="0.045" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="${C.base}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#bloomA)"/>
  <rect width="1200" height="630" fill="url(#bloomB)"/>

  <!-- Plant, right side -->
  <g transform="translate(940, 118)">
    <circle cx="0" cy="200" r="176" fill="none" stroke="${C.moss300}" stroke-opacity="0.16" stroke-width="2" stroke-dasharray="2 14"/>
    <circle cx="0" cy="200" r="126" fill="none" stroke="${C.moss300}" stroke-opacity="0.12" stroke-width="2" stroke-dasharray="2 10"/>
    <path d="M0 372 C0 300 -6 250 0 176" stroke="url(#stem)" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M-1 300 C-42 292 -66 268 -84 244" stroke="${C.moss500}" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M1 246 C42 238 68 214 86 190" stroke="${C.moss500}" stroke-width="4" stroke-linecap="round" fill="none"/>
    <ellipse cx="-96" cy="238" rx="34" ry="15" fill="${C.moss500}" fill-opacity="0.5" transform="rotate(-28 -96 238)"/>
    <ellipse cx="98" cy="184" rx="34" ry="15" fill="${C.moss500}" fill-opacity="0.5" transform="rotate(28 98 184)"/>
    <circle cx="0" cy="176" r="16" fill="${C.moss300}"/>
    <circle cx="0" cy="176" r="30" fill="none" stroke="${C.moss300}" stroke-opacity="0.35" stroke-width="2"/>
    ${sproutMark(-150, 330, 9)}
  </g>

  <!-- Copy, left side -->
  <g font-family="${SANS}">
    <text x="88" y="196" fill="${C.moss300}" font-size="21" letter-spacing="5" font-weight="600">
      THE DIGITAL GARDEN
    </text>

    <text x="86" y="304" fill="${C.ink}" font-size="94" font-weight="700" letter-spacing="-3">
      Marco Collado
    </text>

    <text x="88" y="360" fill="${C.inkSecondary}" font-size="27" font-weight="500">
      Estudiante de Ingeniería de Software
    </text>

    <rect x="88" y="404" width="3" height="42" fill="${C.moss400}"/>
    <text x="108" y="436" fill="${C.ink}" font-size="30" font-weight="600">
      Hazlo con pasión o no lo hagas.
    </text>

    <text x="88" y="522" fill="${C.inkMuted}" font-size="21">
      Proyectos · Aprendizajes · Experimentos
    </text>
  </g>

  <rect x="0" y="626" width="1200" height="4" fill="${C.moss500}"/>
</svg>
`;

/* ── App icons ──────────────────────────────────────────────────────────── */

function iconSvg(size, { padded = false } = {}) {
  // Maskable icons must keep their content inside the middle 80%, or Android
  // will crop the sprout when it applies a circular mask.
  const unit = Math.round((size / 32) * (padded ? 2.6 : 3.4));
  const markWidth = unit * 6;
  const x = Math.round((size - markWidth) / 2);
  const y = Math.round(size / 2 - unit * 3);
  const radius = padded ? 0 : Math.round(size * 0.22);

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${C.raised}"/>
  ${sproutMark(x, y, unit)}
</svg>`;
}

/* ── Run ────────────────────────────────────────────────────────────────── */

const targets = [
  { name: 'og-image.png', svg: ogSvg },
  { name: 'icon-192.png', svg: iconSvg(192) },
  { name: 'icon-512.png', svg: iconSvg(512) },
  { name: 'icon-maskable-512.png', svg: iconSvg(512, { padded: true }) },
  { name: 'apple-touch-icon.png', svg: iconSvg(180) },
];

await mkdir(publicDir, { recursive: true });

for (const target of targets) {
  const buffer = await sharp(Buffer.from(target.svg)).png({ compressionLevel: 9 }).toBuffer();
  await writeFile(join(publicDir, target.name), buffer);
  console.log(`  ✓ public/${target.name}  ${(buffer.length / 1024).toFixed(1)} kB`);
}

console.log('\nAssets generados.');
