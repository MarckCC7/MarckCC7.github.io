import type { Certificate, CertificateKind } from '@/types';

/**
 * Trees in the garden — the things that took time and left a mark.
 *
 * Add `credentialUrl` whenever the credential is verifiable online. A
 * verifiable certificate is worth several unverifiable ones.
 */
export const certificates: Certificate[] = [
  {
    id: 'ccna-itn',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    period: '2026',
    kind: 'certification',
    description:
      'Fundamentos de redes: modelo OSI, direccionamiento IPv4/IPv6, enrutamiento, switching y configuración de dispositivos Cisco. Entender la red cambió cómo diseño sistemas: la latencia y la topología dejaron de ser abstracciones.',
  },
  {
    id: 'turiston-2026',
    title: 'TURISTON 2026 — Hackathon de Turismo',
    issuer: 'Hackathon TURISTON',
    period: '2026',
    kind: 'award',
    badge: 'Tercer puesto',
    description:
      'Tercer puesto en una hackathon de innovación turística: de problema a prototipo funcional en tiempo limitado, con equipo, restricciones reales y una defensa frente a jurado.',
  },
];

export const kindMeta: Record<CertificateKind, { label: string; tone: string }> = {
  certification: { label: 'Certificación', tone: 'text-azure-300 border-azure-500/30' },
  course: { label: 'Curso', tone: 'text-moss-200 border-moss-400/30' },
  award: { label: 'Reconocimiento', tone: 'text-ember-300 border-ember-400/35' },
  event: { label: 'Evento', tone: 'text-graphite-300 border-line-strong' },
};
