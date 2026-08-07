import { CertificateCard } from '@components/cards/CertificateCard';
import { RevealGroup, RevealItem } from '@components/motion/Reveal';
import { Section } from '@components/ui/Section';
import { SectionHeading } from '@components/ui/SectionHeading';
import { certificates } from '@data/certificates';

/** Certificates, awards and events — the trees of the garden. */
export function CertificatesSection() {
  return (
    <Section id="certificados">
      <SectionHeading
        eyebrow="05 · Certificados"
        title="Los árboles del jardín."
        description="Lo que tomó tiempo y dejó marca. Cada uno cambió algo concreto en cómo trabajo, y eso es lo que está escrito aquí — no el título del diploma."
      />

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3" stagger={0.1}>
        {certificates.map((certificate) => (
          <RevealItem key={certificate.id} className="h-full">
            <CertificateCard certificate={certificate} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
