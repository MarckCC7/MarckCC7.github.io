import { useSyncExternalStore } from 'react';

/**
 * Subscribes to a CSS media query.
 *
 * `useSyncExternalStore` rather than `useState` + `useEffect`: it reads the
 * correct value during the very first render, so nothing flashes at the wrong
 * breakpoint before hydration settles.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (onChange: () => void) => {
    const list = window.matchMedia(query);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  };

  const getSnapshot = () => window.matchMedia(query).matches;

  // Server / prerender fallback: assume the query does not match.
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True when the visitor asked their OS to reduce motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** True on devices whose primary input is a finger — no hover, no cursor. */
export function useIsTouchDevice(): boolean {
  return useMediaQuery('(hover: none), (pointer: coarse)');
}

/** True below the `lg` breakpoint. */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 1023px)');
}
