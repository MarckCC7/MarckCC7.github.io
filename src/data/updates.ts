import type { GardenUpdate, UpdateKind } from '@/types';
import { byDateDesc } from '@utils/format';

/**
 * GARDEN UPDATES — the growth log.
 *
 * ── Cómo publicar algo nuevo ───────────────────────────────────────────────
 *
 *  1. Copia una entrada de abajo y pégala al inicio del array.
 *  2. Cambia `slug` (único, en minúsculas y con guiones — no lo cambies nunca
 *     después de publicar: rompe los enlaces que ya existen).
 *  3. Pon la fecha real en formato `YYYY-MM-DD`.
 *  4. Escribe `body` como un array: cada string es un párrafo.
 *       · Un string que empieza con `## ` se convierte en subtítulo.
 *       · Un string que empieza con `- ` se convierte en un punto de lista.
 *  5. Si tienes fotos, ponlas en `public/updates/` y referencia
 *     `/updates/tu-foto.jpg`. El `alt` no es opcional.
 *
 * Eso es todo. No hay CMS, no hay build step, no hay panel. Editas este
 * archivo, guardas, y el jardín crece.
 */
export const updates: GardenUpdate[] = [
  {
    slug: 'tercer-puesto-turiston-2026',
    title: 'Tercer puesto en TURISTON 2026',
    date: '2026-06-20',
    kind: 'hackathon',
    excerpt:
      'Dos días, un equipo, un problema de turismo real y un prototipo defendido frente a jurado. Terminamos terceros.',
    body: [
      'Entré a TURISTON sin saber exactamente qué esperar. Salí con algo que ninguna clase me había dado todavía: la experiencia de construir bajo presión con gente que acabo de conocer.',
      '## Lo que construimos',
      'Un prototipo funcional para un problema concreto del sector turismo, de la idea al demo en el tiempo que duró la hackathon. La restricción de tiempo obliga a decidir rápido qué es esencial y qué es adorno — y casi todo resulta ser adorno.',
      '## Lo que me llevo',
      '- Un prototipo que se puede tocar convence más que diez diapositivas que lo explican.',
      '- Discutir arquitectura durante dos horas cuando quedan diez es la forma más cara de perder.',
      '- El equipo importa más que el stack. Siempre.',
      'Tercer puesto. Y una lista de cosas que haría distinto, que es el verdadero premio.',
    ],
    tags: ['Hackathon', 'Turismo', 'Trabajo en equipo', 'Prototipado'],
  },
  {
    slug: 'ccna-introduction-to-networks',
    title: 'Cerrando CCNA: Introduction to Networks',
    date: '2026-04-12',
    kind: 'milestone',
    excerpt:
      'Terminé el primer módulo del CCNA con Cisco Networking Academy. La red dejó de ser una caja negra.',
    body: [
      'Durante mucho tiempo la red fue para mí una caja negra: el request sale, la respuesta vuelve, y en el medio hay magia. Este curso abrió la caja.',
      '## Lo que cambió en cómo programo',
      '- Ahora pienso en latencia antes de escribir la primera llamada a una API.',
      '- Entiendo por qué una decisión de topología puede costar más que una de algoritmo.',
      '- Configurar un router a mano enseña algo que ningún diagrama transmite: todo lo que asumimos automático fue configurado por alguien.',
      'Es de esos aprendizajes que no se ven en el producto final, pero se notan en todas las decisiones.',
    ],
    tags: ['Redes', 'Cisco', 'CCNA', 'Infraestructura'],
  },
  {
    slug: 'pmi-arequipa-2026',
    title: 'PMI Arequipa 2026',
    date: '2026-03-08',
    kind: 'event',
    excerpt:
      'Un evento sobre gestión de proyectos que me hizo entender por qué mueren los proyectos técnicos buenos.',
    body: [
      'Fui esperando escuchar sobre cronogramas. Me encontré con algo bastante más incómodo: la mayoría de los proyectos que fracasan no fracasan por razones técnicas.',
      'Fracasan porque nadie definió el alcance, porque el riesgo se descubrió tarde, o porque dos personas entendieron cosas distintas de la misma frase.',
      '## La conclusión que me llevé',
      'Saber programar te permite construir. Saber gestionar es lo que permite que lo construido llegue a alguien. Como alguien que quiere fundar una startup, ignorar esa mitad del oficio sería ingenuo.',
    ],
    tags: ['Gestión de proyectos', 'PMI', 'Evento'],
  },
  {
    slug: 'sembrando-este-jardin',
    title: 'Sembrando este jardín',
    date: '2026-01-15',
    kind: 'launch',
    excerpt: 'Por qué construí esto como un jardín digital y no como un portafolio más.',
    body: [
      'Un portafolio es una foto: te muestra a alguien en su mejor momento, congelado. Este sitio quiere ser otra cosa.',
      'Un jardín digital se ve inacabado a propósito. Hay ideas que son solo semillas, proyectos a medio crecer y ramas que todavía no existen. Eso no es una debilidad de la presentación — es la presentación.',
      '## La regla que me puse',
      'Nada aquí va a estar inflado. Si un proyecto es una idea, dice "Idea". Si estoy aprendiendo algo, dice que lo estoy aprendiendo. La única forma de que este sitio valga algo dentro de diez años es que hoy sea honesto.',
      'Vuelve en unos meses. Va a estar distinto.',
    ],
    tags: ['Meta', 'Digital Garden', 'React', 'Diseño'],
  },
];

/* ── Derived views ──────────────────────────────────────────────────────── */

/** Newest first. The only ordering the UI should ever use. */
export const sortedUpdates: GardenUpdate[] = [...updates].sort(byDateDesc);

export function getUpdateBySlug(slug: string): GardenUpdate | undefined {
  return updates.find((u) => u.slug === slug);
}

/** Previous / next for the detail page footer, in reading order. */
export function getUpdateNeighbours(slug: string): {
  previous?: GardenUpdate;
  next?: GardenUpdate;
} {
  const index = sortedUpdates.findIndex((u) => u.slug === slug);
  if (index === -1) return {};
  return {
    previous: sortedUpdates[index + 1],
    next: sortedUpdates[index - 1],
  };
}

export const updateKindMeta: Record<UpdateKind, { label: string; tone: string; glyph: string }> = {
  event: { label: 'Evento', tone: 'text-azure-300 border-azure-500/30', glyph: '◈' },
  hackathon: { label: 'Hackathon', tone: 'text-ember-300 border-ember-400/35', glyph: '⚡' },
  launch: { label: 'Lanzamiento', tone: 'text-moss-200 border-moss-400/35', glyph: '✦' },
  milestone: { label: 'Logro', tone: 'text-moss-100 border-moss-300/40', glyph: '◉' },
  note: { label: 'Nota', tone: 'text-graphite-300 border-line-strong', glyph: '·' },
};
