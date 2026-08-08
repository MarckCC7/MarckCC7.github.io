/**
 * Genera `public/sitemap.xml` y `public/robots.txt`.
 *
 *   npm run sitemap        (se ejecuta solo antes de cada build)
 *
 * Las rutas vienen de `routes.mjs`, el mismo módulo que usa el plugin de
 * prerenderizado en `vite.config.ts`. Esa es la pieza clave: si el sitemap
 * anunciara una URL que no existe como archivo en `dist/`, GitHub Pages
 * respondería 404 y el buscador la descartaría.
 *
 * `VITE_SITE_URL` controla el origen.
 */
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { collectRoutes } from './routes.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const origin = (process.env.VITE_SITE_URL ?? 'https://marckcc7.github.io').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const { routes, projectSlugs, updateSlugs } = await collectRoutes();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
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
  `  ✓ public/sitemap.xml — ${routes.length} URLs ` +
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
