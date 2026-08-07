/**
 * Who Marco is, in his own words.
 *
 * This is the only place the "about" copy lives. Edit here, never in the
 * components.
 */
export const profile = {
  name: 'Marco Collado',
  headline: 'Construyo software con la intención de que sobreviva a mí.',

  /** Hero paragraph. Two sentences maximum — the hero must breathe. */
  intro:
    'Estudiante de Ingeniería de Software. Analizo sistemas, diseño soluciones y construyo productos que resuelven problemas reales — con la meta de fundar una startup y crear software que use gente de verdad.',

  /** Long-form "Sobre mí". Each string is a paragraph. */
  story: [
    'Empecé programando por curiosidad: quería entender por qué las cosas funcionan como funcionan. Esa curiosidad no se me fue, solo cambió de escala. Antes desarmaba programas; ahora desarmo problemas.',
    'Estudio Ingeniería de Software, pero lo que realmente hago es construir. Cada idea que se me ocurre pasa por el mismo filtro: ¿esto le resuelve algo real a alguien real? Si la respuesta es sí, empieza a crecer. Si no, la dejo como abono para la siguiente.',
    'Me interesa el punto donde la inteligencia artificial deja de ser una demo y se vuelve infraestructura: sistemas que entienden un condominio, una iglesia, un ganadero pequeño, una familia que quiere no olvidar. Lugares donde el software casi nunca llega, y donde más falta hace.',
    'Los videojuegos me enseñaron algo que ninguna clase me enseñó: un buen sistema se siente bien antes de que entiendas por qué. Esa obsesión por el detalle es la que traigo a todo lo que diseño.',
    'Todavía soy principiante en muchas cosas, y lo digo sin incomodidad. Este jardín no es una vitrina de lo que ya sé — es el registro público de lo que estoy aprendiendo a construir.',
  ],

  /**
   * The three ideas that should survive if a recruiter reads nothing else.
   * Keep them to three: a fourth dilutes all of them.
   */
  principles: [
    {
      id: 'curiosity',
      title: 'Curiosidad primero',
      body: 'No aprendo tecnologías, aprendo sistemas. La herramienta cambia cada tres años; entender cómo encajan las piezas no caduca.',
      glyph: '◈',
    },
    {
      id: 'consistency',
      title: 'Constancia sobre talento',
      body: 'Un jardín no crece por un día heroico. Crece porque alguien vuelve todos los días, incluso cuando no se ve el progreso.',
      glyph: '◍',
    },
    {
      id: 'vision',
      title: 'Construir para durar',
      body: 'Escribo código pensando en quién lo va a mantener dentro de cinco años. Normalmente ese alguien soy yo.',
      glyph: '◇',
    },
  ],

  /** Facts, not claims. Rendered as the hero's understated stat row. */
  facts: [
    { label: 'Ideas en el jardín', value: 6, suffix: '' },
    { label: 'Lenguajes en uso', value: 8, suffix: '' },
    { label: 'Sembrado en', value: 2026, suffix: '', raw: true },
  ],

  location: 'Arequipa, Perú',
  availability: 'Abierto a prácticas, colaboraciones y equipos que construyan cosas difíciles.',
  email: 'marcocdo65@gmail.com',
} as const;
