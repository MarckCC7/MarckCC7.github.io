import type { SocialLink } from '@/types';

import { profile } from './profile';

/**
 * Contact channels.
 *
 * `id` selects the icon in `<BrandIcon />`; to add a channel you must also add
 * its mark there. TypeScript will tell you if you forget.
 */
export const socials: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@MarcoCollado',
    href: 'https://github.com/MarcoCollado',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Marco Collado',
    href: 'https://www.linkedin.com/in/marco-collado/',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@marco.collado',
    href: 'https://www.instagram.com/marco.collado/',
  },
  {
    id: 'mail',
    label: 'Correo',
    handle: profile.email,
    href: `mailto:${profile.email}`,
  },
];

/** The two links surfaced in the hero. Order matters. */
export const heroSocials = socials.filter((s) => s.id === 'github' || s.id === 'linkedin');
