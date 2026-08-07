import { useEffect, useRef } from 'react';

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
] as const;

/**
 * Listens for the Konami code and calls `onUnlock` when it completes.
 *
 * The progress index lives in a ref: re-rendering on every keypress would be
 * pure waste, and the listener must not be torn down mid-sequence.
 */
export function useKonamiCode(onUnlock: () => void): void {
  const index = useRef(0);
  const handler = useRef(onUnlock);

  // Keep the latest callback without resubscribing the listener.
  useEffect(() => {
    handler.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Never hijack keys while someone is typing.
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;

      const expected = SEQUENCE[index.current];
      const pressed = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      if (pressed === expected) {
        index.current += 1;
        if (index.current === SEQUENCE.length) {
          index.current = 0;
          handler.current();
        }
      } else {
        // A wrong key may still be the start of a fresh attempt.
        index.current = pressed === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
