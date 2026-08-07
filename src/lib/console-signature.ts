import { profile } from '@data/profile';
import { site } from '@data/site';

/**
 * A note for whoever opens DevTools.
 *
 * Anyone technical enough to inspect a portfolio is exactly the audience worth
 * writing to directly — and it costs a few hundred bytes.
 */
export function printConsoleSignature(): void {
  if (import.meta.env.DEV) return;

  const heading = [
    'color:#8fcaac',
    'font-family:monospace',
    'font-size:12px',
    'line-height:1.7',
  ].join(';');

  const body = ['color:#97a39d', 'font-family:monospace', 'font-size:11px', 'line-height:1.8'].join(
    ';',
  );

  /* eslint-disable no-console */
  console.log(
    `%c
   ┌─────────────────────────────┐
   │   THE DIGITAL GARDEN        │
   │   ${site.name.padEnd(26)}│
   └─────────────────────────────┘
`,
    heading,
  );

  console.log(
    `%c${site.motto}

Si llegaste hasta la consola, probablemente construyes cosas también.
Escríbeme: ${profile.email}

Pista: prueba con las flechas del teclado. Arriba, arriba, abajo, abajo…`,
    body,
  );
  /* eslint-enable no-console */
}
