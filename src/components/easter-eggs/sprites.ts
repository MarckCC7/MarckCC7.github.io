/**
 * Sprite data for `<PixelSprite />`.
 *
 * Kept out of the component file so Fast Refresh keeps working: a module that
 * exports both components and constants loses its refresh boundary.
 *
 * Each string is one row. Every character maps to a colour in `palette`;
 * `.` is always transparent. Edit these like pixel art — they are pixel art.
 */
export interface SpriteFrame {
  rows: string[];
  palette: Record<string, string>;
}

const PALETTE = {
  g: 'var(--moss-400)', // hat / foliage
  l: 'var(--moss-200)', // highlight
  d: 'var(--moss-700)', // shadow
  s: 'var(--graphite-200)', // skin / stone
  e: 'var(--graphite-950)', // eyes
  b: 'var(--azure-400)', // clothing
};

/** The gardener. Nine pixels tall, and somehow still has a personality. */
export const GARDENER: SpriteFrame = {
  palette: PALETTE,
  rows: [
    '..ggg..',
    '.ggggg.',
    '.gsssg.',
    '.se.es.',
    '.sssss.',
    '..bbb..',
    '.bbbbb.',
    '.b.b.b.',
    '.s...s.',
  ],
};

/**
 * A sapling. The one thing that did take root on the 404 page.
 *
 * The leaves are staggered on purpose — two leaves on the same row read as a
 * plus sign, not a plant. Same reason the favicon sprout is asymmetric.
 */
export const SAPLING: SpriteFrame = {
  palette: PALETTE,
  rows: ['..l..', '.lg..', '..gl.', '..d..', '..d..'],
};
