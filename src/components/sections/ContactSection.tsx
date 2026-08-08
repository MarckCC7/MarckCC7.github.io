import { Check, Copy, MapPin } from 'lucide-react';

import { Magnetic } from '@components/motion/Magnetic';
import { Reveal, RevealGroup, RevealItem } from '@components/motion/Reveal';
import { BrandIcon } from '@components/ui/BrandIcon';
import { GlassCard } from '@components/ui/GlassCard';
import { Section } from '@components/ui/Section';
import { profile } from '@data/profile';
import { socials } from '@data/socials';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { usePreferences } from '@hooks/usePreferences';
import { cn } from '@utils/cn';

/**
 * Contact.
 *
 * The email is copyable rather than only a `mailto:` link — most people read
 * portfolios on a machine where clicking `mailto:` opens an email client they
 * have never configured.
 */
export function ContactSection() {
  const { copied, copy } = useCopyToClipboard();
  const { play } = usePreferences();

  return (
    <Section id="contacto">
      <GlassCard className="overflow-hidden px-gutter py-16 sm:py-20" spotlight>
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="text-pixel text-[0.5625rem] text-moss-300">07 · Contacto</span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-6 text-display-sm text-ink">
              ¿Estás construyendo algo?
              <span className="block text-ink-muted">Hablemos.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-base text-ink-secondary">
              {profile.availability}
            </p>
          </Reveal>

          {/* — Email ————————————————————————————————— */}
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={`mailto:${profile.email}`}
                data-cursor="button"
                className="glass-strong group/mail inline-flex h-13 items-center gap-3 rounded-2xl px-6 font-mono text-sm text-ink transition-colors duration-300 hover:border-line-strong"
              >
                {profile.email}
              </a>

              <button
                type="button"
                onClick={() => {
                  play('select');
                  void copy(profile.email);
                }}
                data-cursor="button"
                aria-label="Copiar correo al portapapeles"
                className={cn(
                  'glass inline-flex h-13 items-center gap-2 rounded-2xl px-5 text-sm transition-colors duration-300',
                  copied ? 'text-moss-200' : 'text-ink-secondary hover:text-ink',
                )}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>
          </Reveal>

          {/* — Channels —————————————————————————————— */}
          <RevealGroup className="mt-10 flex flex-wrap justify-center gap-3" stagger={0.07}>
            {socials.map((social) => (
              <RevealItem key={social.id}>
                <Magnetic strength={0.3}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    data-cursor="button"
                    onMouseEnter={() => play('hover')}
                    className="glass group/social flex items-center gap-3 rounded-2xl px-5 py-3.5 transition-colors duration-300 hover:border-line-strong"
                  >
                    <BrandIcon
                      id={social.id}
                      className="h-[18px] w-[18px] text-ink-secondary transition-colors duration-300 group-hover/social:text-moss-200"
                    />
                    <span className="flex flex-col items-start leading-tight">
                      <span className="text-sm text-ink">{social.label}</span>
                      <span className="font-mono text-[0.625rem] text-ink-muted">
                        {social.handle}
                      </span>
                    </span>
                  </a>
                </Magnetic>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.28}>
            <p className="mt-10 inline-flex items-center gap-2 text-sm text-ink-muted">
              <MapPin size={14} />
              {profile.location}
            </p>
          </Reveal>
        </div>
      </GlassCard>
    </Section>
  );
}
