/**
 * La lista de rutas del sitio, en un solo lugar.
 *
 * La consumen dos cosas que TIENEN que coincidir o el SEO se rompe en silencio:
 *
 *   1. `generate-sitemap.mjs`  → declara estas URLs a los buscadores
 *   2. el plugin `garden:prerender-routes` de `vite.config.ts`
 *      → escribe un `index.html` real en cada una
 *
 * Si el sitemap anuncia una ruta que no existe como archivo, GitHub Pages
 * responde 404 y el buscador la descarta. Por eso ambos leen de aquí.
 *
 * Los slugs se extraen de `src/data/*.ts` con una expresión regular en vez de
 * importarlos: importar significaría compilar TypeScript dentro de un script de
 * Node — toda una cadena de herramientas para leer diez cadenas de texto. El
 * patrón está anclado a la forma exacta `slug: '…'` que el sistema de tipos ya
 * garantiza.
 */
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Rutas fijas y cada cuánto vale la pena volver a rastrearlas. */
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/garden', changefreq: 'weekly', priority: '0.9' },
  { path: '/projects', changefreq: 'weekly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/updates', changefreq: 'weekly', priority: '0.8' },
];

async function slugsFrom(file) {
  const source = await readFile(join(root, 'src', 'data', file), 'utf8');
  return [...source.matchAll(/^\s{4}slug:\s*'([a-z0-9-]+)',/gm)].map((match) => match[1]);
}

/**
 * Todas las rutas del sitio, con sus metadatos de sitemap.
 * @returns {Promise<{ routes: {path: string, changefreq: string, priority: string}[], projectSlugs: string[], updateSlugs: string[] }>}
 */
export async function collectRoutes() {
  const [projectSlugs, updateSlugs] = await Promise.all([
    slugsFrom('projects.ts'),
    slugsFrom('updates.ts'),
  ]);

  const routes = [
    ...STATIC_ROUTES,
    ...projectSlugs.map((slug) => ({
      path: `/projects/${slug}`,
      changefreq: 'monthly',
      priority: '0.7',
    })),
    ...updateSlugs.map((slug) => ({
      path: `/updates/${slug}`,
      changefreq: 'yearly',
      priority: '0.6',
    })),
  ];

  return { routes, projectSlugs, updateSlugs };
}
