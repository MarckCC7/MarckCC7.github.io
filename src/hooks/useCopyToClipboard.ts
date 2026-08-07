import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copies text and reports success for a moment so the UI can acknowledge it.
 * The timer is cleared on unmount to avoid setting state on a dead component.
 */
export function useCopyToClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetAfter);
        return true;
      } catch {
        return false;
      }
    },
    [resetAfter],
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return { copied, copy };
}
