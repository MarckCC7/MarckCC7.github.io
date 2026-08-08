/**
 * Generates `public/sitemap.xml` from the content files.
 *
 *   npm run sitemap        (also runs automatically before every build)
 *
 * The slugs are extracted straight from `src/data/*.ts` with a regex rather
 * than by importing them. Importing would mean compiling TypeScript inside a
 * plain Node script — a whole toolchain to read six strings. The regex is
 * pinned to the exact `slug: '…'` shape the type system already enforces, so
 * if it ever stops matching, the sitemap is short and the diff makes it
 * obvious.
 *
 * Set VITE_SITE_URL to control the origin; it falls back to the production one.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const origin = (process.env.VITE_SITE_URL ?? 'https://marckcc7.github.io').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

/** Static routes and how often each is worth re-crawling. */
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

const [projectSlugs, updateSlugs] = await Promise.all([
  slugsFrom('projects.ts'),
  slugsFrom('updates.ts'),
]);

const urls = [
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

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${origin}${url.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

await writeFile(join(root, 'public', 'sitemap.xml'), xml, 'utf8');

console.log(
  `  ✓ public/sitemap.xml — ${urls.length} URLs ` +
    `(${projectSlugs.length} proyectos, ${updateSlugs.length} updates)`,
);

/* robots.txt se genera aquí también: lleva la URL del sitemap dentro, y un
   robots.txt apuntando a un dominio antiguo es peor que no tenerlo — le dice
   al crawler que vaya a buscar el índice al sitio equivocado. */
const robots = `# The Digital Garden — Marco Collado C.
User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

await writeFile(join(root, 'public', 'robots.txt'), robots, 'utf8');
console.log(`  ✓ public/robots.txt — sitemap en ${origin}`);

if (projectSlugs.length === 0 || updateSlugs.length === 0) {
  console.warn('  ! No se encontraron slugs. Revisa el formato de src/data/*.ts');
}
