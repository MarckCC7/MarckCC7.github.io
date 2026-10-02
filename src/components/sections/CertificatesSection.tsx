import { CertificateCard } from '@components/cards/CertificateCard';
import { RevealGroup, RevealItem } from '@components/motion/Reveal';
import { Section } from '@components/ui/Section';
import { SectionRail } from '@components/ui/SectionRail';
import { certificates } from '@data/certificates';

/** Certificates, awards and events — the trees of the garden. */
export function CertificatesSection() {
  return (
    <Section spacing="custom" id="certificados" className="home-section">
      <SectionRail
        title="Certificados y reconocimientos"
        description="Aprendizajes que echaron raíz."
      />

      <RevealGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" stagger={0.1}>
        {certificates.map((certificate) => (
          <RevealItem key={certificate.id} className="h-full">
            <CertificateCard certificate={certificate} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
