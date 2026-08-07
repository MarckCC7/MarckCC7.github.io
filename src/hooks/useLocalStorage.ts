import { useCallback, useEffect, useState } from 'react';

/**
 * State that survives a reload, and stays in sync across tabs.
 *
 * Every access is guarded: private browsing modes and storage-full errors throw
 * on `localStorage`, and a portfolio must never white-screen over a preference.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => read(key, initialValue));

  const update = useCallback(
    (next: T | ((current: T) => T)) => {
      setValue((current) => {
        const resolved = next instanceof Function ? next(current) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // Storage unavailable — keep the value in memory for this session.
        }
        return resolved;
      });
    },
    [key],
  );

  // Mirror changes made in other tabs.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setValue(JSON.parse(event.newValue) as T);
        } catch {
          /* ignore malformed payloads */
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  return [value, update] as const;
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
