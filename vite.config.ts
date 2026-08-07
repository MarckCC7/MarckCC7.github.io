import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Vite configuration.
 *
 * Path aliases mirror the folder structure inside `src/` so imports stay stable
 * even when files move around. Keep this list in sync with `tsconfig.app.json`.
 */
const alias = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],

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
