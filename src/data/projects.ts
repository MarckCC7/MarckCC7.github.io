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
    slug: 'tracereq',
    title: 'TraceReq',
    tagline: 'Gestión de requerimientos, casos de uso y trazabilidad en una sola plataforma.',
    problem:
      'Los requerimientos funcionales y no funcionales suelen terminar dispersos entre documentos, hojas de cálculo y conversaciones. Cuando el proyecto crece, se vuelve difícil saber qué caso de uso cubre cada requisito y qué cambios afectan al resto.',
    approach:
      'Una aplicación web que organiza proyectos, RF, RNF y casos de uso; registra relaciones entre requisitos, construye una matriz de cobertura y muestra métricas en un dashboard. También permite exportar la información a CSV o JSON.',
    stage: 'prototype',
    year: 2026,
    stack: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'JavaScript'],
    highlights: [
      'Identificadores automáticos para RF, RNF y casos de uso.',
      'Matriz de cobertura y grafo interactivo de dependencias.',
      'Despliegue público verificado en Vercel con autenticación.',
    ],
    links: [
      { label: 'Código', href: 'https://github.com/MarckCC7/tracereq' },
      { label: 'Ver sistema', href: 'https://tracereq.vercel.app' },
    ],
    featured: true,
    glyph: '↯',
  },
  {
    slug: 'jardin-digital',
    title: 'The Digital Garden',
    tagline: 'Mi jardín digital: proyectos, aprendizajes y experimentos que crecen en público.',
    problem:
      'Un portafolio tradicional congela el trabajo en una foto perfecta y envejece rápido. Necesitaba un espacio que pudiera mostrar tanto lo terminado como lo que todavía está creciendo, sin inflar etapas ni habilidades.',
    approach:
      'Un sitio personal construido como jardín: cada proyecto es una planta, cada certificado un árbol y cada publicación una flor. Todo el contenido vive en datos tipados para que el sitio pueda mantenerse y crecer sin reescribir componentes.',
    stage: 'shipped',
    year: 2026,
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
    highlights: [
      'Sistema visual completo con temas oscuro y claro.',
      'Contenido tipado, rutas prerenderizadas y sitemap automático.',
      'Despliegue público verificado en GitHub Pages.',
    ],
    links: [
      { label: 'Código', href: 'https://github.com/MarckCC7/MarckCC7.github.io' },
      { label: 'Ver sitio', href: 'https://marckcc7.github.io/' },
    ],
    featured: true,
    glyph: '✦',
  },
  {
    slug: 'portafolio-danza',
    title: 'Portafolio de danza',
    tagline: 'Una identidad digital para presentar mi trabajo en marinera y danza peruana.',
    problem:
      'Las presentaciones, fotografías y experiencia artística estaban repartidas y no existía una pieza digital clara para compartirlas con academias, organizadores o nuevas colaboraciones.',
    approach:
      'Una landing de una sola página donde la fotografía guía la experiencia. Está construida con HTML, CSS y JavaScript puros, con medios optimizados y una paleta inspirada en las propias imágenes.',
    stage: 'shipped',
    year: 2026,
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    highlights: [
      'Sin dependencias ni proceso de build.',
      'Fotografías WebP y video optimizado para carga rápida.',
      'Despliegue público verificado en Vercel.',
    ],
    links: [
      { label: 'Código', href: 'https://github.com/MarckCC7/dancer-portafolio' },
      { label: 'Ver sitio', href: 'https://mcollado-marinera-arequipa.vercel.app' },
    ],
    featured: true,
    glyph: '◒',
  },
  {
    slug: 'caballo-de-paso-system',
    title: 'Caballo Peruano de Paso',
    tagline: 'Calificaciones, categorías y resultados para concursos de Caballos Peruanos de Paso.',
    problem:
      'Organizar un concurso exige coordinar ejemplares, categorías, jueces, criterios ponderados y resultados sin perder trazabilidad. Hacerlo en hojas sueltas vuelve difícil validar inscripciones y explicar cómo se obtuvo cada puesto.',
    approach:
      'Un sistema web que centraliza caballos, concursos, jueces y planillas de calificación. Calcula resultados por promedio, mediana, descarte de extremos o suma de puestos, y consolida rankings por categoría, criador y expositor.',
    stage: 'prototype',
    year: 2026,
    stack: ['Node.js', 'Express', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Motor de calificación con criterios ponderados y reglas de desempate.',
      'Validación de edad y sexo al inscribir cada ejemplar en una categoría.',
      'API REST, datos de demostración y pruebas automatizadas del dominio.',
    ],
    private: true,
    featured: true,
    glyph: '♞',
  },
  {
    slug: 'concurso-marinera-system',
    title: 'Mesa de control de Marinera',
    tagline: 'Programa, paletas, rondas y resultados para operar concursos de marinera.',
    problem:
      'Un concurso de marinera reúne modalidades, categorías, tandas, jurados y desempates que deben avanzar en un orden claro. Registrar paletas a mano dificulta detectar pendientes, conservar el historial y publicar resultados consistentes.',
    approach:
      'Una aplicación local para que el operador prepare hasta 45 competencias, distribuya participantes en tandas, registre paletas y gestione clasificaciones, finales y desempates. Conserva concursos cerrados y permite respaldar o exportar los resultados.',
    stage: 'prototype',
    year: 2026,
    stack: ['JavaScript', 'Node.js', 'HTML', 'CSS', 'LocalStorage'],
    highlights: [
      'Flujo completo desde la preparación del programa hasta el cierre del concurso.',
      'Entre 3 y 10 jurados, rondas protegidas y desempates con historial.',
      'Respaldo y restauración en JSON, además de exportación de resultados en CSV.',
    ],
    private: true,
    featured: true,
    glyph: '♫',
  },
  {
    slug: 'cidaf-waylluy-tusuy',
    title: 'CIDAF Waylluy Tusuy',
    tagline: 'Sitio del elenco arequipeño dedicado a la danza y el folklore peruano.',
    problem:
      'El elenco necesitaba reunir su identidad, repertorio, convocatorias, presentaciones y canales de contacto en una experiencia digital propia, clara tanto para nuevos integrantes como para organizadores de eventos.',
    approach:
      'Un sitio estático de una sola página, diseñado desde cero alrededor de su identidad cultural. Integra galería, videos, convocatorias con fecha de cierre, postulación, preguntas frecuentes y contacto para presentaciones.',
    stage: 'shipped',
    year: 2026,
    stack: ['HTML', 'CSS', 'JavaScript', 'Web estática'],
    highlights: [
      'Convocatorias editables que calculan su vigencia y se cierran automáticamente.',
      'Galería, repertorio y videos reunidos en una navegación adaptable.',
      'Despliegue público verificado en el dominio de Mostrarte Perú.',
    ],
    links: [{ label: 'Ver sitio', href: 'https://waylluytusuy.mostrarteperu.com/' }],
    private: true,
    featured: true,
    glyph: '❋',
  },
  {
    slug: 'mostrarte-peru',
    title: 'Mostrarte Perú',
    tagline: 'Una presencia digital renovada para una productora cultural peruana.',
    problem:
      'El sitio anterior partía de una plantilla genérica y mezclaba contenido real con textos, páginas y datos de demostración. La empresa necesitaba comunicar su trabajo cultural con una identidad propia y una navegación más clara.',
    approach:
      'Un rediseño estático de varias páginas que organiza producción cultural, formación artística, comunicación creativa y el elenco CIDAF Waylluy Tusuy. La experiencia incorpora animación progresiva, galería y contacto directo sin depender de un framework.',
    stage: 'shipped',
    year: 2026,
    stack: ['HTML', 'CSS', 'JavaScript', 'Apache', 'SEO'],
    highlights: [
      'Sistema visual adaptable con movimiento respetuoso de las preferencias de accesibilidad.',
      'Contenido, rutas históricas, metadatos y sitemap preparados para buscadores.',
      'Despliegue público verificado en el dominio de la organización.',
    ],
    links: [{ label: 'Ver sitio', href: 'https://mostrarteperu.com/' }],
    private: true,
    featured: true,
    glyph: '✺',
  },
  {
    slug: 'suyu',
    title: 'Suyu',
    tagline: 'Rutas accesibles y un copiloto inteligente para descubrir Arequipa.',
    problem:
      'La información sobre accesibilidad, aforo y servicios de los atractivos de Arequipa está dispersa o no existe. Esto complica el viaje de personas con movilidad reducida, familias y visitantes que necesitan aprovechar un día limitado.',
    approach:
      'Una PWA offline-first que construye rutas accesibles, muestra el estado de los lugares y propone alternativas cuando un destino está saturado. Incluye mapa, itinerario, servicios formalizados y un copiloto que combina Claude con un motor de reglas local.',
    stage: 'shipped',
    year: 2026,
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MapLibre', 'Supabase', 'Claude API'],
    highlights: [
      'Ruta peatonal y para silla de ruedas con funcionamiento degradado sin proveedores externos.',
      'PWA instalable, datos esenciales locales y experiencia completa sin conexión.',
      'Diseño accesible con mascota contextual, modo oscuro y adaptación móvil.',
    ],
    collaboration:
      'Proyecto desarrollado en equipo para TURISTON 2026. Mi trabajo se concentró en la interfaz, la experiencia móvil, la identidad visual y la representación de rutas.',
    links: [{ label: 'Ver aplicación', href: 'https://suyu-two.vercel.app/' }],
    private: true,
    featured: true,
    glyph: '⌖',
  },
  {
    slug: 'aegis',
    title: 'Aegis',
    tagline: 'Un agente financiero con límites verificables y operaciones sobre Stellar.',
    problem:
      'Quienes reciben ingresos irregulares deben decidir en cada pago cuánto reservar, repartir o ahorrar. Un agente financiero puede reducir esa carga, pero necesita límites técnicos que no dependan de que la IA decida obedecerlos.',
    approach:
      'Un agente propone cómo repartir cada ingreso y un Policy Engine aplica límites definidos por el usuario. Antes de ejecutar, un Guardian analiza el riesgo y explica la operación; Stellar testnet conserva la evidencia y permite delegar un firmante revocable.',
    stage: 'prototype',
    year: 2026,
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Stellar', 'MCP'],
    highlights: [
      'Pagos reales de extremo a extremo sobre Stellar testnet.',
      'Policy Engine, reserva mínima, límites por operación y bitácora encadenada.',
      'Integración MCP para que otros agentes propongan operaciones sin saltarse las políticas.',
    ],
    collaboration:
      'Proyecto construido en equipo. Contribuí al frontend, las pruebas del flujo que mueve dinero, la estabilidad E2E y la preparación del pitch y la demostración.',
    links: [{ label: 'Código del equipo', href: 'https://github.com/Seb0401/Aegis' }],
    featured: true,
    glyph: '⛨',
  },
  {
    slug: 'perfil-github',
    title: 'Perfil de GitHub',
    tagline: 'Una portada técnica que reúne mi stack, mi ruta de aprendizaje y mis enlaces.',
    problem:
      'El perfil predeterminado de GitHub muestra actividad, pero no explica quién soy, qué estoy aprendiendo ni cómo se conectan mis repositorios con mi objetivo profesional.',
    approach:
      'Un README de perfil que resume mi presentación, herramientas, niveles reales, roadmap, certificados y formas de contacto, conectado visualmente con el jardín digital.',
    stage: 'shipped',
    year: 2026,
    stack: ['Markdown', 'GitHub', 'SVG'],
    highlights: [
      'Presentación consistente con la identidad del jardín digital.',
      'Niveles de herramientas deliberadamente conservadores.',
      'Visible directamente en el perfil público de GitHub.',
    ],
    links: [
      { label: 'Código', href: 'https://github.com/MarckCC7/MarckCC7' },
      { label: 'Ver perfil', href: 'https://github.com/MarckCC7' },
    ],
    featured: true,
    glyph: '@',
  },
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
