import type { Certificate, CertificateKind } from '@/types';

/**
 * Trees in the garden — the things that took time and left a mark.
 *
 * Add `credentialUrl` whenever the credential is verifiable online. A
 * verifiable certificate is worth several unverifiable ones.
 */
export const certificates: Certificate[] = [
  {
    id: 'alumno-destacado-2026-ii',
    title: 'Alumno destacado — periodo 2026-II',
    issuer: 'Universidad La Salle',
    period: '2026-II',
    kind: 'award',
    badge: 'Alumno destacado',
    description:
      'Reconocimiento académico recibido por el desempeño alcanzado durante el periodo 2026-II.',
  },
  {
    id: 'pmi-universidad-la-salle',
    title: 'Constancia de participación — Evento PMI',
    issuer: 'PMI · Universidad La Salle',
    period: '2026',
    kind: 'event',
    description:
      'Constancia de participación en el evento organizado por el PMI en la Universidad La Salle, enfocado en gestión de proyectos y formación profesional.',
  },
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
  {
    id: 'ideaton-13-monjas-2025',
    title: 'IDEATÓN 2025 — 13 Monjas',
    issuer: '13 Monjas · Universidad La Salle',
    period: '2025',
    kind: 'award',
    badge: 'Segundo puesto',
    description:
      'Segundo puesto en la IDEATÓN organizada por 13 Monjas en la Universidad La Salle, una jornada dedicada a convertir ideas en propuestas con impacto.',
  },
];

export const kindMeta: Record<CertificateKind, { label: string; tone: string }> = {
  certification: { label: 'Certificación', tone: 'text-azure-300 border-azure-500/30' },
  course: { label: 'Curso', tone: 'text-moss-200 border-moss-400/30' },
  award: { label: 'Reconocimiento', tone: 'text-ember-300 border-ember-400/35' },
  event: { label: 'Evento', tone: 'text-graphite-300 border-line-strong' },
};
