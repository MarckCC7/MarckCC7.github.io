import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* Fonts are bundled, not fetched from a CDN: no third-party request on the
   critical path, no layout shift, and the site keeps working offline.
   SF Pro is never shipped — the token stack falls back to it natively on
   Apple devices, which is the only licence-clean way to use it. */
import '@fontsource-variable/inter';
import '@fontsource-variable/geist';
import '@fontsource-variable/jetbrains-mono';
/* The pixel font only ever renders short ASCII labels, so the latin subset is
   all it will ever need — no reason to ship Cyrillic and Greek @font-face
   blocks for a string that says "MODO PIXEL". */
import '@fontsource/press-start-2p/latin-400.css';

import '@styles/index.css';

import { App } from '@app/App';
import { printConsoleSignature } from '@lib/console-signature';

const container = document.getElementById('root');

if (!container) {
  throw new Error('No se encontró #root. Revisa index.html.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

printConsoleSignature();
