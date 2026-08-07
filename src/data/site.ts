/**
 * Global site configuration.
 *
 * Change the canonical URL through `VITE_SITE_URL` (see `.env.example`) rather
 * than editing the fallback — that keeps preview deployments honest about their
 * own canonical tags.
 */
export const site = {
  name: 'Marco Collado',
  shortName: 'Marco C.',
  title: 'Marco Collado — The Digital Garden',
  titleTemplate: '%s · Marco Collado',
  role: 'Estudiante de Ingeniería de Software',
  motto: 'Hazlo con pasión o no lo hagas.',
  description:
    'El jardín digital de Marco Collado: proyectos, aprendizajes y experimentos de un estudiante de Ingeniería de Software construyendo software que resuelve problemas reales.',
  locale: 'es_ES',
  lang: 'es',
  url: import.meta.env.VITE_SITE_URL ?? 'https://marcocollado.dev',
  ogImage: '/og-image.png',
  themeColor: '#070908',
  keywords: [
    'Marco Collado',
    'ingeniería de software',
    'portafolio desarrollador',
    'digital garden',
    'React',
    'TypeScript',
    'inteligencia artificial',
    'startup',
    'Perú',
  ],
  /** Shown in the footer and used as the copyright start year. */
  plantedYear: 2026,
} as const;

/** Absolute URL builder for canonical tags, sitemaps and OG metadata. */
export function absoluteUrl(path = '/'): string {
  const base = site.url.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
