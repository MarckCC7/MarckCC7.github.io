import type { ExperienceEntry } from '@/types';

/**
 * Experiencia laboral.
 *
 * No todo lo que suma a un ingeniero es código. Un trabajo cara a cara enseña a
 * escuchar un problema antes de proponer una solución, y eso es exactamente lo
 * que separa a alguien que implementa tickets de alguien que diseña producto.
 * Por eso está aquí, sin disculpas y sin disfrazarlo de algo técnico.
 *
 * Para añadir una experiencia: agrega una entrada al array. Nada más.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'claro-peru',
    role: 'Asesor',
    organisation: 'Claro Perú',
    period: '2025',
    summary:
      'Atención directa a clientes: entender un problema real, explicarlo en palabras que la otra persona entienda y cerrar un acuerdo con el que ambas partes se queden tranquilas.',
    skills: ['Comunicación', 'Negociación', 'Trabajo en equipo', 'Proactividad'],
  },
];
