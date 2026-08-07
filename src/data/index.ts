/**
 * Content barrel.
 *
 * Components import from `@data` and never reach into individual files, so the
 * data layer can be reorganised (split, merged, moved to Markdown, fetched from
 * an API) without touching a single component.
 */
export * from './certificates';
export * from './navigation';
export * from './profile';
export * from './projects';
export * from './roadmap';
export * from './site';
export * from './socials';
export * from './stack';
export * from './updates';
