import { RouterProvider } from 'react-router-dom';

import { PreferencesProvider } from './providers/PreferencesProvider';
import { router } from './router';

/**
 * Application root.
 *
 * Deliberately thin: providers, then the router. Anything that needs to live
 * "around the whole app" and touch the DOM belongs in `RootLayout`, which is
 * inside the router and therefore has access to routing context.
 */
export function App() {
  return (
    <PreferencesProvider>
      <RouterProvider router={router} />
    </PreferencesProvider>
  );
}
