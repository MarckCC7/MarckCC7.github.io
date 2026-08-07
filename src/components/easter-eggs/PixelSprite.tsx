import { cn } from '@utils/cn';

import type { SpriteFrame } from './sprites';

/**
 * A pixel-art sprite rendered with `box-shadow`.
 *
 * The whole character is one element: each "pixel" is an offset shadow on a
 * single 1×1 box. It costs one DOM node instead of sixty, scales by changing a
 * single number, and stays crisp at any zoom — which is exactly what you want
 * for a detail that has to feel effortless.
 */
export function PixelSprite({
  frame,
  scale = 4,
  className,
}: {
  frame: SpriteFrame;
  scale?: number;
  className?: string;
}) {
  const shadows: string[] = [];

  frame.rows.forEach((row, y) => {
    [...row].forEach((char, x) => {
      const colour = frame.palette[char];
      if (!colour) return; // '.' and unknown characters stay transparent
      shadows.push(`${x * scale}px ${y * scale}px 0 ${colour}`);
    });
  });

  const width = (frame.rows[0]?.length ?? 0) * scale;
  const height = frame.rows.length * scale;

  return (
    <span aria-hidden className={cn('relative block', className)} style={{ width, height }}>
      <span
        className="absolute top-0 left-0 block"
        style={{ width: scale, height: scale, boxShadow: shadows.join(', ') }}
      />
    </span>
  );
}
