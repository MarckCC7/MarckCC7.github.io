import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { GlassCard } from '@components/ui/GlassCard';
import { updateKindMeta } from '@data/updates';
import { usePreferences } from '@hooks/usePreferences';
import { formatDate } from '@utils/format';
import { cn } from '@utils/cn';
import type { GardenUpdate } from '@/types';

/**
 * A Garden Update card — one flower in the log.
 *
 * The cover falls back to a generated gradient plate when the entry has no
 * image, so publishing never requires opening a design tool first. Friction is
 * the reason personal sites stop being updated.
 */
export function UpdateCard({
  update,
  compact = false,
}: {
  update: GardenUpdate;
  compact?: boolean;
}) {
  const meta = updateKindMeta[update.kind];
  const cover = update.images?.[0];
  const { play } = usePreferences();

  return (
    <GlassCard className="h-full" glow>
      <Link
        to={`/updates/${update.slug}`}
        data-cursor="card"
        data-cursor-label="LEER"
        onMouseEnter={() => play('hover')}
        className="flex h-full flex-col"
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-t-3xl border-b border-line-subtle',
            compact ? 'h-32' : 'h-44',
          )}
        >
          {cover ? (
            <img
              src={cover.src}
              alt={cover.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-garden group-hover/card:scale-[1.04]"
            />
          ) : (
            <FallbackCover glyph={meta.glyph} />
          )}

          <span className="absolute top-3 left-3">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border bg-base/70 px-2.5 py-1 backdrop-blur-md',
                'font-mono text-[0.625rem] tracking-[0.08em] uppercase',
                meta.tone,
              )}
            >
              <span aria-hidden>{meta.glyph}</span>
              {meta.label}
            </span>
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <time dateTime={update.date} className="font-mono text-[0.6875rem] text-ink-muted">
            {formatDate(update.date)}
          </time>

          <h3 className="mt-2.5 font-display text-lg leading-snug font-semibold tracking-tight text-ink transition-colors duration-300 group-hover/card:text-moss-100">
            {update.title}
          </h3>

          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-secondary">
            {update.excerpt}
          </p>

          <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-moss-300">
            Leer
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 ease-garden group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </GlassCard>
  );
}

/** Generated cover for entries without a photograph. */
function FallbackCover({ glyph }: { glyph: string }) {
  return (
    <div className="relative grid h-full w-full place-items-center bg-[radial-gradient(120%_120%_at_20%_0%,var(--surface-overlay),var(--surface-base))]">
      <span
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(var(--line-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--line-subtle) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <span
        aria-hidden
        className="relative animate-float text-4xl text-moss-300/60 transition-transform duration-700 group-hover/card:scale-110"
      >
        {glyph}
      </span>
    </div>
  );
}
