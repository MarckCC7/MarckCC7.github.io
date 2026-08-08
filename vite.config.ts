import { copyFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

/**
 * Vite configuration.
 *
 * Path aliases mirror the folder structure inside `src/` so imports stay stable
 * even when files move around. Keep this list in sync with `tsconfig.app.json`.
 */
const alias = (path: string) => fileURLToPath(new URL(path, import.meta.url));

/** Canonical origin. Overridden per-deploy through `VITE_SITE_URL`. */
const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://marckcc7.github.io').replace(/\/$/, '');

/**
 * Rewrites the hard-coded origin in `index.html` at build time.
 *
 * The static HTML carries the canonical link, the Open Graph URLs and the
 * JSON-LD — all of which crawlers read *without* running JavaScript, so the
 * runtime `<Seo>` component cannot fix them. Injecting here keeps one source of
 * truth (`VITE_SITE_URL`) instead of a URL that silently rots in the markup.
 */
function injectSiteUrl(): Plugin {
  return {
    name: 'garden:inject-site-url',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
    },
  };
}

/**
 * Writes `dist/404.html` as a byte-for-byte copy of `index.html`.
 *
 * GitHub Pages has no rewrite rules, so a direct hit on `/projects` never
 * reaches the SPA — it serves the 404 page. Making the 404 page *be* the app
 * lets React Router take over and render the right route. It is the standard
 * workaround, and without it every internal link breaks on refresh or when
 * someone opens a shared URL.
 *
 * The response still carries HTTP 404 for those deep links; the SPA renders
 * correctly regardless. Hosts with real rewrites (Vercel, Netlify) do not need
 * this file and simply ignore it.
 */
function spaFallback(): Plugin {
  return {
    name: 'garden:spa-fallback',
    apply: 'build',
    async closeBundle() {
      await copyFile('dist/index.html', 'dist/404.html');
      this.info?.('dist/404.html generado (fallback SPA para GitHub Pages)');
    },
  };
}

export default defineConfig({
  // '/' is correct for a user site (marckcc7.github.io) and for any custom
  // domain. A PROJECT site served from a subdirectory would need
  // base: '/nombre-del-repo/' — and every absolute asset path would have to
  // change with it. That is the main reason a user site is worth the rename.
  base: '/',

  plugins: [react(), tailwindcss(), injectSiteUrl(), spaFallback()],

  resolve: {
    alias: {
      '@': alias('./src'),
      '@app': alias('./src/app'),
      '@assets': alias('./src/assets'),
      '@components': alias('./src/components'),
      '@data': alias('./src/data'),
      '@hooks': alias('./src/hooks'),
      '@layouts': alias('./src/layouts'),
      '@lib': alias('./src/lib'),
      '@pages': alias('./src/pages'),
      '@styles': alias('./src/styles'),
      '@utils': alias('./src/utils'),
      '@animations': alias('./src/animations'),
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  preview: {
    port: 4173,
  },

  build: {
    target: 'es2022',
    // Explicit CSS target so vendor prefixing is deterministic rather than
    // inherited from the JS target. Never hand-write `-webkit-` pairs in the
    // stylesheets — the minifier collapses them and can keep the wrong one.
    cssTarget: ['chrome111', 'edge111', 'firefox113', 'safari16.4'],
    sourcemap: false,
    // Keep the initial payload small: heavy, rarely-changing vendors are split
    // into their own long-lived cacheable chunks.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          // Both entries, or Rollup emits the core and the plugin as two
          // separate chunks that then have to round-trip the network twice.
          // This chunk is async-only — see the note in `src/lib/gsap.ts`.
          gsap: ['gsap', 'gsap/ScrollTrigger'],
        },
      },
    },
  },
});
