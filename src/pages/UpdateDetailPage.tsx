import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { Reveal } from '@components/motion/Reveal';
import { Seo } from '@components/seo/Seo';
import { Container } from '@components/ui/Container';
import { GlassCard } from '@components/ui/GlassCard';
import { getUpdateBySlug, getUpdateNeighbours, updateKindMeta } from '@data/updates';
import { articleJsonLd } from '@lib/seo';
import { formatDate } from '@utils/format';
import { cn } from '@utils/cn';

export function UpdateDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const update = slug ? getUpdateBySlug(slug) : undefined;

  if (!update) return <Navigate to="/updates" replace />;

  const meta = updateKindMeta[update.kind];
  const { previous, next } = getUpdateNeighbours(update.slug);

  return (
    <>
      <Seo
        title={update.title}
        path={`/updates/${update.slug}`}
        description={update.excerpt}
        type="article"
        publishedTime={update.date}
        tags={update.tags}
        image={update.images?.[0]?.src}
        jsonLd={articleJsonLd({
          title: update.title,
          description: update.excerpt,
          path: `/updates/${update.slug}`,
          date: update.date,
        })}
      />

      <Container size="prose" className="pt-36 pb-section sm:pt-40">
        <Reveal>
          <Link
            to="/updates"
            data-cursor="link"
            className="inline-flex items-center gap-2 text-sm text-ink-secondary transition-colors hover:text-moss-200"
          >
            <ArrowLeft size={15} />
            Garden Updates
          </Link>
        </Reveal>

        <article className="mt-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1',
                  'font-mono text-[0.625rem] tracking-[0.08em] uppercase',
                  meta.tone,
                )}
              >
                <span aria-hidden>{meta.glyph}</span>
                {meta.label}
              </span>
              <time dateTime={update.date} className="font-mono text-xs text-ink-muted">
                {formatDate(update.date)}
              </time>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 font-display text-4xl leading-[1.1] font-semibold tracking-tight text-ink sm:text-5xl">
              {update.title}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 text-lg leading-relaxed text-ink-secondary">{update.excerpt}</p>
          </Reveal>

          <div className="hairline my-10" />

          {/* — Body ————————————————————————————————
              The tiny format described in `data/updates.ts`: `## ` is a
              heading, `- ` is a list item, anything else is a paragraph. */}
          <div className="space-y-6">
            {update.body.map((block, index) => (
              <Reveal key={index} delay={Math.min(index * 0.04, 0.2)}>
                <Block text={block} />
              </Reveal>
            ))}
          </div>

          {/* — Images ——————————————————————————————— */}
          {update.images && update.images.length > 0 && (
            <div className="mt-12 space-y-6">
              {update.images.map((image) => (
                <Reveal key={image.src}>
                  <figure>
                    <div className="overflow-hidden rounded-2xl border border-line-subtle">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        data-cursor="image"
                        className="w-full object-cover"
                      />
                    </div>
                    {image.caption && (
                      <figcaption className="mt-3 text-center text-xs text-ink-muted">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          )}

          {/* — Tags ————————————————————————————————— */}
          {update.tags && update.tags.length > 0 && (
            <Reveal className="mt-12">
              <ul className="flex flex-wrap gap-2">
                {update.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-lg border border-line-subtle px-2.5 py-1 font-mono text-[0.6875rem] text-ink-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {update.links && update.links.length > 0 && (
            <Reveal className="mt-8">
              <GlassCard className="p-6">
                <h2 className="text-pixel text-[0.5rem] text-ink-muted">Enlaces</h2>
                <ul className="mt-4 space-y-2.5">
                  {update.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="link"
                        className="inline-flex items-center gap-2 text-sm text-azure-300 hover:text-azure-200"
                      >
                        {link.label}
                        <ExternalLink size={13} />
                      </a>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          )}
        </article>

        {/* — Neighbours ————————————————————————————— */}
        <nav aria-label="Más publicaciones" className="mt-16 grid gap-3 sm:grid-cols-2">
          {previous && <NeighbourLink update={previous} direction="previous" />}
          {next && <NeighbourLink update={next} direction="next" />}
        </nav>
      </Container>
    </>
  );
}

function Block({ text }: { text: string }) {
  if (text.startsWith('## ')) {
    return (
      <h2 className="pt-4 font-display text-xl font-semibold tracking-tight text-ink">
        {text.slice(3)}
      </h2>
    );
  }

  if (text.startsWith('- ')) {
    return (
      <p className="flex items-start gap-3">
        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-400" />
        <span className="leading-relaxed text-base text-ink-secondary">{text.slice(2)}</span>
      </p>
    );
  }

  return <p className="leading-relaxed text-base text-ink-secondary">{text}</p>;
}

function NeighbourLink({
  update,
  direction,
}: {
  update: { slug: string; title: string };
  direction: 'previous' | 'next';
}) {
  const isNext = direction === 'next';

  return (
    <Link
      to={`/updates/${update.slug}`}
      data-cursor="card"
      className={cn(
        'glass group flex flex-col gap-2 rounded-2xl p-5 transition-colors duration-500 hover:border-line-strong',
        isNext && 'sm:col-start-2 sm:items-end sm:text-right',
      )}
    >
      <span className="text-pixel inline-flex items-center gap-1.5 text-[0.5rem] text-ink-muted">
        {!isNext && <ArrowLeft size={11} />}
        {isNext ? 'Más reciente' : 'Anterior'}
        {isNext && <ArrowRight size={11} />}
      </span>
      <span className="font-display font-semibold tracking-tight text-base text-ink transition-colors group-hover:text-moss-100">
        {update.title}
      </span>
    </Link>
  );
}
