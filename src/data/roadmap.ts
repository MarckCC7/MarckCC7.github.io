import type { RoadmapNode, RoadmapStatus } from '@/types';

/**
 * The growth tree.
 *
 * Not a timeline — a trunk. Each node is a branch that keeps growing after the
 * next one appears: learning Backend does not mean abandoning Frontend.
 *
 * Only ever ONE node should be `active`. Everything before it is `done`,
 * everything after is `next`.
 */
export const roadmap: RoadmapNode[] = [
  {
    id: 'seed',
    title: 'Semilla',
    description:
      'Los fundamentos: lógica, estructuras de datos, algoritmos y la costumbre de leer código ajeno sin miedo.',
    status: 'done',
    icon: 'seed',
    branches: ['Lógica de programación', 'Estructuras de datos', 'C · C++ · Java', 'Git'],
    horizon: '2024 – 2025',
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description:
      'Hacer que el software se sienta bien, no solo que funcione. Interfaces, accesibilidad y sistemas de diseño.',
    status: 'active',
    icon: 'frontend',
    branches: ['React', 'TypeScript', 'Diseño de interfaces', 'Animación · Accesibilidad'],
    horizon: '2026',
  },
  {
    id: 'backend',
    title: 'Backend',
    description:
      'Lo que sostiene todo por debajo: modelado de datos, APIs que no se rompen y decisiones que escalan.',
    status: 'next',
    icon: 'backend',
    branches: ['Node.js · Python', 'PostgreSQL', 'Diseño de APIs', 'Autenticación'],
    horizon: '2026 – 2027',
  },
  {
    id: 'cloud',
    title: 'Cloud',
    description:
      'Dónde vive el software cuando ya no vive en mi máquina. Infraestructura, costos y disponibilidad real.',
    status: 'next',
    icon: 'cloud',
    branches: ['AWS · Azure', 'Contenedores', 'Arquitectura distribuida', 'Observabilidad'],
    horizon: '2027',
  },
  {
    id: 'devops',
    title: 'DevOps',
    description:
      'Que desplegar deje de ser un evento. Automatización, CI/CD y la disciplina de dejar todo reproducible.',
    status: 'next',
    icon: 'devops',
    branches: ['CI/CD', 'Docker · Kubernetes', 'Infraestructura como código', 'Monitoreo'],
    horizon: '2027 – 2028',
  },
  {
    id: 'ai',
    title: 'Inteligencia Artificial',
    description:
      'El área que quiero entender de raíz, no consumir de plantilla: cómo se entrena, dónde falla y cuándo no usarla.',
    status: 'next',
    icon: 'ai',
    branches: ['Machine Learning', 'Sistemas con LLM', 'MLOps', 'Ética y sesgo'],
    horizon: '2028',
  },
  {
    id: 'startup',
    title: 'Startup',
    description:
      'El objetivo real: producto propio, equipo propio y software que use gente que nunca voy a conocer.',
    status: 'next',
    icon: 'startup',
    branches: ['Producto', 'Estrategia técnica', 'Equipo', 'Escala'],
    horizon: '2029 →',
  },
];

export const statusMeta: Record<
  RoadmapStatus,
  { label: string; tone: string; ring: string; dot: string }
> = {
  done: {
    label: 'Aprendido',
    tone: 'text-moss-200',
    ring: 'border-moss-400/40 bg-moss-500/10',
    dot: 'bg-moss-300',
  },
  active: {
    label: 'En progreso',
    tone: 'text-ember-300',
    ring: 'border-ember-400/45 bg-ember-400/10',
    dot: 'bg-ember-400',
  },
  next: {
    label: 'Próximo objetivo',
    tone: 'text-graphite-300',
    ring: 'border-line-strong bg-graphite-800/40',
    dot: 'bg-graphite-500',
  },
};

/** The stage currently being worked on — highlighted in the hero and nav. */
export const activeStage = roadmap.find((node) => node.status === 'active') ?? roadmap[0];
