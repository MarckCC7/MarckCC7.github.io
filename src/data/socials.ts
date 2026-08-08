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
    handle: '@MarckCC7',
    href: 'https://github.com/MarckCC7',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Marco Collado C.',
    href: 'https://www.linkedin.com/in/marco-antonio-collado-cardenas',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@marck_7cc',
    href: 'https://www.instagram.com/marck_7cc/',
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
