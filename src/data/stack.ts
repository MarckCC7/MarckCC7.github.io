import type { SkillLevel, StackCategory, StackItem } from '@/types';

/**
 * The toolbox.
 *
 * `level` is a self-assessment, and the site says so out loud. Claiming 5/5 on
 * everything is the fastest way to lose a reviewer's trust; an honest 2 next to
 * a specific note reads as someone who knows what they don't know yet.
 */
export const stack: StackItem[] = [
  // — Languages ————————————————————————————————
  {
    name: 'JavaScript',
    category: 'languages',
    level: 3,
    note: 'Mi lenguaje de todos los días. Donde más rápido paso de idea a algo que se puede tocar.',
    accent: '#E9C46A',
    mark: 'JS',
  },
  {
    name: 'Python',
    category: 'languages',
    level: 3,
    note: 'Para datos, automatización y todo lo que involucre IA. El que uso cuando quiero pensar, no pelear.',
    accent: '#5B84FB',
    mark: 'Py',
  },
  {
    name: 'C#',
    category: 'languages',
    level: 3,
    note: 'Entré por Unity y me quedé por el lenguaje. Tipado fuerte que no estorba.',
    accent: '#8FCAAC',
    mark: 'C#',
  },
  {
    name: 'Java',
    category: 'languages',
    level: 2,
    note: 'Donde aprendí de verdad qué significa orientación a objetos, más allá de la definición del examen.',
    accent: '#E07A5F',
    mark: 'Jv',
  },
  {
    name: 'C',
    category: 'languages',
    level: 2,
    note: 'El lenguaje que me obligó a entender qué hay debajo. Nada es gratis y aquí se nota.',
    accent: '#A7B2AD',
    mark: 'C',
  },
  {
    name: 'C++',
    category: 'languages',
    level: 2,
    note: 'Estructuras de datos y rendimiento. Complejo por diseño, y por eso enseña tanto.',
    accent: '#7A9EFF',
    mark: 'C+',
  },

  // — Frontend ——————————————————————————————————
  {
    name: 'React',
    category: 'frontend',
    level: 3,
    note: 'Mi forma de pensar interfaces: composición, estado explícito, componentes que se explican solos.',
    accent: '#66D9E8',
    mark: 'Re',
  },
  {
    name: 'HTML',
    category: 'frontend',
    level: 4,
    note: 'Semántica primero. Un documento bien estructurado ya es accesible antes de tocar CSS.',
    accent: '#E76F51',
    mark: '<>',
  },
  {
    name: 'CSS',
    category: 'frontend',
    level: 4,
    note: 'Layout, transiciones y sistemas de diseño. Aquí es donde una interfaz deja de sentirse genérica.',
    accent: '#5B84FB',
    mark: '#',
  },

  // — Game dev ——————————————————————————————————
  {
    name: 'Unity',
    category: 'gamedev',
    level: 3,
    note: 'Donde entendí que un sistema se siente bien mucho antes de que sepas explicar por qué.',
    accent: '#CBD3CF',
    mark: 'U',
  },

  // — Tools —————————————————————————————————————
  {
    name: 'Git',
    category: 'tools',
    level: 3,
    note: 'Historial limpio, ramas con propósito. El registro de cómo se tomó cada decisión.',
    accent: '#E3B269',
    mark: 'Gt',
  },
  {
    name: 'Linux',
    category: 'tools',
    level: 2,
    note: 'Terminal, permisos y servicios. Saber dónde vive el software cambia cómo lo escribes.',
    accent: '#66B38C',
    mark: 'Lx',
  },
];

/* ── Metadata ───────────────────────────────────────────────────────────── */

export const categoryMeta: Record<StackCategory, { label: string; caption: string }> = {
  languages: { label: 'Lenguajes', caption: 'Cómo le hablo a la máquina' },
  frontend: { label: 'Interfaz', caption: 'Cómo la máquina le habla a la gente' },
  gamedev: { label: 'Motores', caption: 'Donde los sistemas se vuelven experiencia' },
  tools: { label: 'Entorno', caption: 'Dónde vive y cómo se mantiene' },
};

export const categoryOrder: StackCategory[] = ['languages', 'frontend', 'gamedev', 'tools'];

export const levelLabel: Record<SkillLevel, string> = {
  1: 'Explorando',
  2: 'Aprendiendo',
  3: 'Cómodo',
  4: 'Con confianza',
  5: 'Fluido',
};

/** Groups the flat list by category, preserving `categoryOrder`. */
export function groupedStack(): { category: StackCategory; items: StackItem[] }[] {
  return categoryOrder.map((category) => ({
    category,
    items: stack.filter((item) => item.category === category),
  }));
}
