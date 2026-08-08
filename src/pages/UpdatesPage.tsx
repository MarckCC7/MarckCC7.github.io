import { UpdateCard } from '@components/cards/UpdateCard';
import { RevealGroup, RevealItem } from '@components/motion/Reveal';
import { Seo } from '@components/seo/Seo';
import { Container } from '@components/ui/Container';
import { PageHeader } from '@layouts/PageHeader';
import { sortedUpdates } from '@data/updates';
import { formatMonth } from '@utils/format';

/**
 * Garden Updates, grouped by month.
 *
 * Grouping instead of one long grid: it makes gaps visible, and the whole point
 * of a growth log is that the rhythm is part of the information.
 */
export function UpdatesPage() {
  const groups = groupByMonth();

  return (
    <>
      <Seo
        title="Garden Updates"
        path="/updates"
        description="La bitácora del jardín de Marco Collado C.: eventos, hackathons, logros y proyectos nuevos."
      />

      <PageHeader
        eyebrow="Garden Updates"
        title="La bitácora del jardín."
        description="Todo lo que va pasando: eventos, hackathons, certificados nuevos, proyectos que arrancan. En orden, sin retoques."
      />

      <Container className="pb-section">
        <div className="space-y-14">
          {groups.map(([month, entries]) => (
            <section key={month}>
              <div className="mb-5 flex items-center gap-4">
                <h2 className="font-mono text-xs tracking-[0.08em] text-ink-muted uppercase">
                  {month}
                </h2>
                <span className="h-px flex-1 bg-line-subtle" />
                <span className="font-mono text-xs text-ink-muted">
                  {entries.length} {entries.length === 1 ? 'entrada' : 'entradas'}
                </span>
              </div>

              <RevealGroup className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" stagger={0.08}>
                {entries.map((update) => (
                  <RevealItem key={update.slug} className="h-full">
                    <UpdateCard update={update} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}

/** Preserves the newest-first order of `sortedUpdates`. */
function groupByMonth() {
  const map = new Map<string, typeof sortedUpdates>();

  for (const update of sortedUpdates) {
    const key = formatMonth(update.date);
    const bucket = map.get(key);
    if (bucket) bucket.push(update);
    else map.set(key, [update]);
  }

  return [...map.entries()];
}
