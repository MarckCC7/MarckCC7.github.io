import { Link } from 'react-router-dom';

import { Reveal } from '@components/motion/Reveal';
import { BrandIcon } from '@components/ui/BrandIcon';
import { Container } from '@components/ui/Container';
import { homeSections, primaryNav } from '@data/navigation';
import { profile } from '@data/profile';
import { site } from '@data/site';
import { socials } from '@data/socials';

/**
 * The footer is the last thing a visitor reads, so it is written like a note
 * rather than a legal notice. It also carries the honest "still growing"
 * message the whole concept rests on.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-section border-t border-line-subtle">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* — Note ————————————————————————————— */}
          <Reveal className="max-w-md">
            <p className="text-pixel text-[0.5625rem] text-moss-300">Este jardín sigue creciendo</p>

            <p className="mt-5 font-display text-2xl leading-snug tracking-tight text-ink">
              Si estás leyendo esto, vuelve en unos meses.
              <span className="text-ink-muted"> Va a estar distinto.</span>
            </p>

            <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
              Cada proyecto que sale de aquí empezó siendo una nota suelta. Nada de lo que ves
              estaba planeado hace un año — y eso es exactamente lo que me gusta de construir.
            </p>

            <p className="mt-6 flex items-center gap-2 text-sm text-ink-muted">
              <span aria-hidden className="h-1.5 w-1.5 animate-pixel-blink bg-moss-400" />
              {profile.location}
            </p>
          </Reveal>

          {/* — Sitemap ——————————————————————————— */}
          <Reveal delay={0.05}>
            <h2 className="text-pixel text-[0.5rem] text-ink-muted">Navegar</h2>
            <ul className="mt-5 space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    data-cursor="link"
                    className="text-sm text-ink-secondary transition-colors duration-300 hover:text-moss-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {homeSections.slice(0, 3).map((section) => (
                <li key={section.id}>
                  <Link
                    to={`/#${section.id}`}
                    data-cursor="link"
                    className="text-sm text-ink-secondary transition-colors duration-300 hover:text-moss-200"
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* — Contact ——————————————————————————— */}
          <Reveal delay={0.1}>
            <h2 className="text-pixel text-[0.5rem] text-ink-muted">Encontrarme</h2>
            <ul className="mt-5 space-y-2.5">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="group inline-flex items-center gap-2.5 text-sm text-ink-secondary transition-colors duration-300 hover:text-moss-200"
                  >
                    <BrandIcon
                      id={social.id}
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                    />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="hairline mt-14" />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">
            © {site.plantedYear}
            {year > site.plantedYear && `–${year}`} {site.name}. Sembrado con cuidado.
          </p>

          <p className="text-pixel text-[0.5rem] text-moss-400/70">{site.motto}</p>
        </div>
      </Container>
    </footer>
  );
}
