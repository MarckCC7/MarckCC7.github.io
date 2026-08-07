import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { RootLayout } from '@layouts/RootLayout';
import { HomePage } from '@pages/HomePage';

import { RouteFallback } from './RouteFallback';

/**
 * Routes.
 *
 * The home page is bundled eagerly because it is where almost everyone lands;
 * every other route is code-split, so the first paint never pays for pages the
 * visitor may not open. `React.lazy` + `Suspense` is enough here — the chunks
 * are small and the fallback is a single frame in practice.
 */
const GardenPage = lazy(() => import('@pages/GardenPage').then((m) => ({ default: m.GardenPage })));
const ProjectsPage = lazy(() =>
  import('@pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })),
);
const ProjectDetailPage = lazy(() =>
  import('@pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })),
);
const UpdatesPage = lazy(() =>
  import('@pages/UpdatesPage').then((m) => ({ default: m.UpdatesPage })),
);
const UpdateDetailPage = lazy(() =>
  import('@pages/UpdateDetailPage').then((m) => ({ default: m.UpdateDetailPage })),
);
const AboutPage = lazy(() => import('@pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const NotFoundPage = lazy(() =>
  import('@pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

/** Wraps a lazy page in the shared loading fallback. */
const deferred = (element: ReactNode) => (
  <Suspense fallback={<RouteFallback />}>{element}</Suspense>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'garden', element: deferred(<GardenPage />) },
      { path: 'projects', element: deferred(<ProjectsPage />) },
      { path: 'projects/:slug', element: deferred(<ProjectDetailPage />) },
      { path: 'updates', element: deferred(<UpdatesPage />) },
      { path: 'updates/:slug', element: deferred(<UpdateDetailPage />) },
      { path: 'about', element: deferred(<AboutPage />) },
      { path: '*', element: deferred(<NotFoundPage />) },
    ],
  },
];

export const router = createBrowserRouter(routes);
