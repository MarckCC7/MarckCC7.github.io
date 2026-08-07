import { absoluteUrl, site } from '@data/site';

export interface SeoInput {
  /** Page title without the site suffix. Omit on the home page. */
  title?: string;
  description?: string;
  /** Path only, e.g. `/projects/condo-os`. */
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  /** ISO date — only meaningful for `type: 'article'`. */
  publishedTime?: string;
  tags?: string[];
  noIndex?: boolean;
}

export interface ResolvedSeo {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: NonNullable<SeoInput['type']>;
  publishedTime?: string;
  tags?: string[];
  noIndex: boolean;
}

/**
 * Normalises page-level SEO input against the site defaults.
 *
 * Kept as a pure function so it can be unit-tested and reused by the sitemap
 * script without dragging React in.
 */
export function resolveSeo(input: SeoInput = {}): ResolvedSeo {
  const title = input.title ? site.titleTemplate.replace('%s', input.title) : site.title;

  return {
    title,
    description: input.description ?? site.description,
    canonical: absoluteUrl(input.path ?? '/'),
    image: absoluteUrl(input.image ?? site.ogImage),
    type: input.type ?? 'website',
    publishedTime: input.publishedTime,
    tags: input.tags,
    noIndex: input.noIndex ?? false,
  };
}

/** Person schema, embedded once on the home page. */
export function personJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: site.url,
    jobTitle: site.role,
    description: site.description,
    knowsAbout: site.keywords,
  });
}

/** Article schema for a Garden Update. */
export function articleJsonLd(update: {
  title: string;
  description: string;
  path: string;
  date: string;
}): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: update.title,
    description: update.description,
    datePublished: update.date,
    url: absoluteUrl(update.path),
    author: { '@type': 'Person', name: site.name, url: site.url },
  });
}
