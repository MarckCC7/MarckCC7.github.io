import type { NavItem } from '@/types';

/** Primary navigation. Anchors (`/#id`) scroll within the home page. */
export const primaryNav: NavItem[] = [
  { label: 'Jardín', href: '/garden' },
  { label: 'Proyectos', href: '/projects' },
  { label: 'Sobre mí', href: '/about' },
  { label: 'Updates', href: '/updates' },
];

/** Home-page section ids, used by the scroll-spy and the footer sitemap. */
export const homeSections = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'stack', label: 'Stack' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'certificados', label: 'Certificados' },
  { id: 'updates', label: 'Garden Updates' },
  { id: 'contacto', label: 'Contacto' },
] as const;
