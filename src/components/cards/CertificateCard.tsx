import { ExternalLink } from 'lucide-react';

import { TiltCard } from '@components/motion/TiltCard';
import { Badge } from '@components/ui/Badge';
import { GlassCard } from '@components/ui/GlassCard';
import { kindMeta } from '@data/certificates';
import { cn } from '@utils/cn';
import type { Certificate } from '@/types';

/**
 * A certificate card, drawn as a tree in the garden.
 *
 * The rings behind the header are not decoration for its own sake: they are the
 * growth rings of the tree this credential planted. It is the one metaphor that
 * survives being taken literally.
 */
export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const meta = kindMeta[certificate.kind];

  return (
    <TiltCard intensity={4} className="h-full">
      <GlassCard className="h-full p-6 sm:p-7" glow>
        <div data-cursor="card" className="flex h-full flex-col">
          {/* — Growth rings ————————————————————————— */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-14 -right-14 h-44 w-44 opacity-50"
          >
            {[0, 1, 2, 3].map((ring) => (
              <span
                key={ring}
                className="absolute inset-0 rounded-full border border-moss-400/20"
                style={{ transform: `scale(${1 - ring * 0.19})` }}
              />
            ))}
            <span className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-moss-400/50" />
          </div>

          <div className="relative flex items-start justify-between gap-4">
            <Badge className={cn(meta.tone)}>{meta.label}</Badge>
            <span className="font-mono text-[0.6875rem] text-ink-muted">{certificate.period}</span>
          </div>

          <h3 className="relative mt-5 font-display text-lg leading-snug font-semibold tracking-tight text-ink">
            {certificate.title}
          </h3>

          <p className="relative mt-1.5 text-[0.8125rem] text-moss-300">{certificate.issuer}</p>

          {certificate.badge && (
            <p className="relative mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-ember-400/35 bg-ember-400/10 px-3 py-1.5">
              <span aria-hidden className="text-pixel text-[0.5rem] text-ember-300">
                ★
              </span>
              <span className="text-[0.8125rem] font-medium text-ember-300">
                {certificate.badge}
              </span>
            </p>
          )}

          <p className="relative mt-4 flex-1 text-sm leading-relaxed text-ink-secondary">
            {certificate.description}
          </p>

          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="relative mt-6 inline-flex items-center gap-1.5 text-sm text-azure-300 transition-colors hover:text-azure-200"
            >
              Verificar credencial
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </GlassCard>
    </TiltCard>
  );
}
