/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical site origin, e.g. `https://marcocollado.dev`. No trailing slash. */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
