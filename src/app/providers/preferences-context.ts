import { createContext } from 'react';

import type { Blip } from '@lib/audio';

export type Theme = 'dark' | 'light';

export interface PreferencesValue {
  theme: Theme;
  toggleTheme: () => void;

  /** The pixel-art easter egg. Off by default; discovered, not advertised. */
  pixelMode: boolean;
  togglePixelMode: () => void;

  /** Chiptune feedback. Opt-in — a site that makes noise unasked is a bad guest. */
  soundEnabled: boolean;
  toggleSound: () => void;
  /** Plays a blip only when sound is enabled. Safe to call anywhere. */
  play: (blip: Blip) => void;
}

/**
 * Undefined by default so `usePreferences` can throw a useful error when a
 * component is rendered outside the provider, instead of silently reading
 * meaningless defaults.
 */
export const PreferencesContext = createContext<PreferencesValue | undefined>(undefined);
