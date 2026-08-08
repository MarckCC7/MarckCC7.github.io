/**
 * Tipos para `routes.mjs`.
 *
 * El módulo se queda en JavaScript plano a propósito: lo importa
 * `generate-sitemap.mjs`, que corre con `node` directamente y sin compilar.
 * Esta declaración le da tipado a `vite.config.ts`, que sí pasa por TypeScript.
 */
export interface SiteRoute {
  /** Ruta absoluta, empezando por `/`. */
  path: string;
  changefreq: string;
  priority: string;
}

export interface CollectedRoutes {
  routes: SiteRoute[];
  projectSlugs: string[];
  updateSlugs: string[];
}

export function collectRoutes(): Promise<CollectedRoutes>;
