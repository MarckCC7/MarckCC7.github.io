import { useContext } from 'react';

import { PreferencesContext, type PreferencesValue } from '@app/providers/preferences-context';

/** Access theme, pixel mode and sound. Must be used inside `PreferencesProvider`. */
export function usePreferences(): PreferencesValue {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within <PreferencesProvider>.');
  }
  return context;
}
