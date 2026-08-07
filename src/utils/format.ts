import type { IsoDate } from '@/types';

const LOCALE = 'es-ES';

/** `2026-03-14` → `14 de marzo de 2026` */
export function formatDate(iso: IsoDate): string {
  return new Intl.DateTimeFormat(LOCALE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parseIso(iso));
}

/** `2026-03-14` → `mar 2026` — used on dense cards. */
export function formatMonth(iso: IsoDate): string {
  return new Intl.DateTimeFormat(LOCALE, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parseIso(iso));
}

/**
 * Parses an ISO date as UTC midnight.
 *
 * `new Date('2026-03-14')` is already UTC, but `new Date('2026-03-14T00:00')`
 * is local — being explicit here avoids the classic off-by-one-day bug for
 * users west of Greenwich.
 */
function parseIso(iso: IsoDate): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1));
}

/** Sorts newest first. Safe to use directly in `.sort()`. */
export function byDateDesc<T extends { date: IsoDate }>(a: T, b: T): number {
  return b.date.localeCompare(a.date);
}

/** `2` → `02` — keeps the roadmap and section counters visually aligned. */
export function pad(value: number, length = 2): string {
  return String(value).padStart(length, '0');
}
