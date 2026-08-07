import { useCallback, useEffect, useMemo, type ReactNode } from 'react';

import { useLocalStorage } from '@hooks/useLocalStorage';
import { playBlip, type Blip } from '@lib/audio';

import { PreferencesContext, type PreferencesValue, type Theme } from './preferences-context';

const KEYS = {
  theme: 'garden:theme',
  pixel: 'garden:pixel-mode',
  sound: 'garden:sound',
} as const;

/**
 * Holds every visitor preference in one place, persisted and mirrored onto
 * `<html>` as data attributes so CSS can react without a single re-render.
 */
export function PreferencesProvider({ children }: { children: ReactNode }) {
  // Dark by default — the garden was designed at night.
  const [theme, setTheme] = useLocalStorage<Theme>(KEYS.theme, 'dark');
  const [pixelMode, setPixelMode] = useLocalStorage<boolean>(KEYS.pixel, false);
  const [soundEnabled, setSoundEnabled] = useLocalStorage<boolean>(KEYS.sound, false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (pixelMode) root.dataset.pixel = 'on';
    else delete root.dataset.pixel;
  }, [pixelMode]);

  const play = useCallback(
    (blip: Blip) => {
      if (soundEnabled) playBlip(blip);
    },
    [soundEnabled],
  );

  const value = useMemo<PreferencesValue>(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
      pixelMode,
      togglePixelMode: () => setPixelMode((current) => !current),
      soundEnabled,
      toggleSound: () =>
        setSoundEnabled((current) => {
          // Confirm the new state audibly: turning sound ON should be heard.
          if (!current) playBlip('select');
          return !current;
        }),
      play,
    }),
    [theme, pixelMode, soundEnabled, play, setTheme, setPixelMode, setSoundEnabled],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}
