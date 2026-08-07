import type { Project, ProjectStage } from '@/types';

/**
 * Every plant in the garden.
 *
 * Honesty is the feature here: a project marked `idea` is labelled `idea`.
 * Recruiters can smell inflated status from a mile away, and a well-articulated
 * idea beats a vague "completed" every time.
 *
 * To add a project: append an entry. Nothing else in the codebase changes.
 */
export const projects: Project[] = [
  {
    slug: 'condo-os',
    title: 'CondoOS',
    tagline:
      'Un sistema operativo para condominios, con IA que administra lo que nadie quiere administrar.',
    problem:
      'La administración de un condominio vive en grupos de WhatsApp, cuadernos y hojas de cálculo que solo entiende una persona. Las cuotas se pierden, las incidencias se olvidan y las asambleas se deciden sin datos.',
    approach:
      'Un núcleo único que modela el condominio como un sistema: unidades, personas, dinero, incidencias y accesos. Encima, una capa de IA que redacta actas, detecta morosidad antes de que ocurra y responde en lenguaje natural a preguntas como "¿cuánto gastamos en mantenimiento este año?".',
    stage: 'research',
    year: 2026,
    stack: ['React', 'TypeScript', 'Python', 'PostgreSQL', 'LLM'],
    highlights: [
      'Multi-tenant desde el día uno: un edificio o cien, la misma base.',
      'La IA no es un chatbot pegado encima; opera sobre el modelo de datos real.',
      'Diseñado para que lo use una junta directiva sin conocimientos técnicos.',
    ],
    featured: true,
    glyph: '⌂',
  },
  {
    slug: 'memoria-familiar',
    title: 'Raíz',
    tagline: 'Memoria digital familiar: el lugar donde una familia no pierde su historia.',
    problem:
      'Las fotos se quedan en teléfonos que se rompen, las historias se van con los abuelos y nadie sabe quién era quién en esa foto de 1978. La memoria de una familia es el dato más valioso que existe y el peor almacenado.',
    approach:
      'Un archivo vivo: línea de tiempo, árbol genealógico y relatos, con reconocimiento de rostros para etiquetar automáticamente y transcripción de audio para conservar voces. Pensado para durar décadas, con exportación completa siempre disponible.',
    stage: 'idea',
    year: 2026,
    stack: ['React', 'TypeScript', 'Python', 'Visión por computador'],
    highlights: [
      'Privado por defecto: los datos de una familia no son producto.',
      'Formato de exportación abierto — si el proyecto muere, la memoria no.',
    ],
    featured: true,
    glyph: '❧',
  },
  {
    slug: 'lupa',
    title: 'Lupa',
    tagline: 'Plataforma para investigar corrupción cruzando datos públicos que nadie cruza.',
    problem:
      'La información para detectar corrupción ya es pública: contrataciones, sanciones, registros societarios. El problema es que vive en portales distintos, en formatos distintos, y conectarla a mano toma semanas.',
    approach:
      'Ingesta y normalización de fuentes abiertas, un grafo de relaciones entre personas, empresas y contratos, y detección de patrones anómalos: proveedores creados días antes de una licitación, direcciones compartidas, adjudicaciones concentradas.',
    stage: 'idea',
    year: 2026,
    stack: ['Python', 'Grafos', 'React', 'NLP'],
    highlights: [
      'Cada hallazgo enlaza a su fuente oficial. Sin fuente, no hay afirmación.',
      'Herramienta de investigación, no de acusación: expone patrones, no veredictos.',
    ],
    glyph: '◎',
  },
  {
    slug: 'ganado',
    title: 'Establo',
    tagline: 'Gestión ganadera para el productor pequeño, el que nunca fue el cliente objetivo.',
    problem:
      'El software ganadero está hecho para operaciones grandes y precios grandes. El ganadero con veinte cabezas lleva todo en una libreta: partos, vacunas, peso, ventas. Cuando la libreta se moja, se pierde el historial de años.',
    approach:
      'Registro por animal con historial completo, alertas de vacunación y parto, y control de costos por cabeza para saber cuál realmente da ganancia. Offline-first, porque en el campo no hay señal.',
    stage: 'idea',
    year: 2026,
    stack: ['React', 'TypeScript', 'SQLite', 'PWA'],
    highlights: [
      'Offline-first real: sincroniza cuando puede, funciona siempre.',
      'Interfaz pensada para usarse con una mano y guantes puestos.',
    ],
    glyph: '⚘',
  },
  {
    slug: 'iglesia-os',
    title: 'Congregatio',
    tagline: 'Sistema operativo para iglesias: comunidad, recursos y logística en un solo lugar.',
    problem:
      'Una iglesia coordina personas, donaciones, eventos, grupos y voluntarios con las mismas herramientas que una familia usa para organizar un cumpleaños. La carga administrativa recae en gente que preferiría dedicarse a su comunidad.',
    approach:
      'Directorio de miembros, gestión de grupos y ministerios, calendario de eventos con asignación de voluntarios, y trazabilidad transparente de donaciones. La transparencia como funcionalidad, no como reporte anual.',
    stage: 'idea',
    year: 2026,
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    highlights: ['Roles y permisos finos: quién ve qué es la decisión más delicada del sistema.'],
    glyph: '✛',
  },
  {
    slug: 'mercado-b2b',
    title: 'Nexo',
    tagline: 'Mercado inteligente B2B donde el emparejamiento lo hace el sistema, no el catálogo.',
    problem:
      'Un negocio pequeño que necesita un proveedor confiable lo busca por recomendación o por suerte. Los marketplaces B2B existentes son catálogos gigantes sin contexto: no saben que tu restaurante necesita quince kilos de tomate cada martes.',
    approach:
      'Perfiles de demanda y oferta que el sistema aprende con el tiempo, emparejamiento por compatibilidad real —volumen, frecuencia, distancia, historial de cumplimiento— y reputación construida sobre transacciones verificadas.',
    stage: 'idea',
    year: 2026,
    stack: ['TypeScript', 'Python', 'Sistemas de recomendación'],
    highlights: ['El valor no está en el catálogo; está en el emparejamiento.'],
    glyph: '⇄',
  },
];

/* ── Derived views — components consume these, never re-sort inline ────── */

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Visual + copy metadata for each stage. Order defines the growth sequence. */
export const stageMeta: Record<
  ProjectStage,
  { label: string; description: string; tone: string; dot: string; growth: number }
> = {
  idea: {
    label: 'Idea',
    description: 'Semilla plantada. El problema está identificado, la solución todavía no.',
    tone: 'text-graphite-300 border-line-strong bg-graphite-800/40',
    dot: 'bg-graphite-300',
    growth: 0.2,
  },
  research: {
    label: 'Investigación',
    description: 'Midiendo el terreno: usuarios reales, restricciones reales, viabilidad.',
    tone: 'text-azure-300 border-azure-500/30 bg-azure-500/10',
    dot: 'bg-azure-400',
    growth: 0.4,
  },
  building: {
    label: 'En desarrollo',
    description: 'Creciendo. Hay código, hay commits, hay decisiones que ya no son reversibles.',
    tone: 'text-ember-300 border-ember-400/30 bg-ember-400/10',
    dot: 'bg-ember-400',
    growth: 0.65,
  },
  prototype: {
    label: 'Prototipo',
    description:
      'Funciona de punta a punta. Todavía no soporta el mundo real, pero se puede tocar.',
    tone: 'text-moss-200 border-moss-400/30 bg-moss-500/10',
    dot: 'bg-moss-300',
    growth: 0.85,
  },
  shipped: {
    label: 'Completado',
    description: 'En manos de alguien que no soy yo. Ahí empieza lo difícil.',
    tone: 'text-moss-100 border-moss-300/40 bg-moss-400/15',
    dot: 'bg-moss-200',
    growth: 1,
  },
};

/** Stage filter order for the projects page. */
export const stageOrder: ProjectStage[] = ['idea', 'research', 'building', 'prototype', 'shipped'];
