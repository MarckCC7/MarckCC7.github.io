<div align="center">

# The Digital Garden

**La marca personal de Marco Collado C.**
Proyectos, aprendizajes y experimentos de alguien que está construyendo, en público.

_“Hazlo con pasión o no lo hagas.”_

<sub>React · Vite · TypeScript · Tailwind CSS · Framer Motion · GSAP</sub>

</div>

---

## Qué es esto

No es un portafolio. Un portafolio es una foto: te muestra en tu mejor momento, congelado.

Esto es un **jardín digital**. Cada proyecto es una planta cuya altura corresponde a su etapa
real. Cada certificado es un árbol. Cada publicación es una flor. Se ve inacabado a propósito,
porque lo está — y esa es exactamente la idea que tiene que quedarle a quien lo visite.

La regla que sostiene todo el sitio: **nada está inflado**. Si un proyecto es una idea, la
etiqueta dice `Idea`. Si un nivel de skill es 2 de 5, dice 2 de 5. Un jardín honesto envejece
bien; un catálogo inflado no aguanta la primera pregunta en una entrevista.

---

## Arranque rápido

```bash
npm install
npm run dev          # http://localhost:5173
```

Requiere **Node 20.19+**.

| Script              | Qué hace                                                        |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo con HMR                                  |
| `npm run build`     | Typecheck + build de producción a `dist/` (regenera el sitemap) |
| `npm run preview`   | Sirve `dist/` para revisar el build real                        |
| `npm run typecheck` | Solo TypeScript                                                 |
| `npm run lint`      | ESLint                                                          |
| `npm run lint:fix`  | ESLint con autofix                                              |
| `npm run format`    | Prettier sobre todo el repo                                     |
| `npm run og`        | Regenera `og-image.png` y los iconos PWA                        |
| `npm run sitemap`   | Regenera `public/sitemap.xml`                                   |

---

## ✍️ Cómo actualizar el sitio

> **Esta es la sección importante.** Todo el contenido vive en `src/data/`. Nunca hace falta
> tocar un componente para publicar algo nuevo: editas un archivo de datos, guardas, y listo.
> TypeScript te avisa si te falta un campo.

| Quiero…                     | Edito                      |
| --------------------------- | -------------------------- |
| Agregar un proyecto         | `src/data/projects.ts`     |
| Agregar un certificado      | `src/data/certificates.ts` |
| Publicar en Garden Updates  | `src/data/updates.ts`      |
| Cambiar mis tecnologías     | `src/data/stack.ts`        |
| Mover el roadmap            | `src/data/roadmap.ts`      |
| Cambiar el texto "Sobre mí" | `src/data/profile.ts`      |
| Redes y correo              | `src/data/socials.ts`      |
| Título, dominio, SEO        | `src/data/site.ts`         |
| Menú de navegación          | `src/data/navigation.ts`   |

### Agregar un proyecto

Abre `src/data/projects.ts` y añade una entrada al array:

```ts
{
  slug: 'mi-proyecto',              // URL. NO lo cambies después de publicar.
  title: 'Mi Proyecto',
  tagline: 'Una línea. Menos de 90 caracteres.',
  problem: 'El problema real, en dos o tres frases.',
  approach: 'Cómo lo resuelve el software.',
  stage: 'building',                // idea | research | building | prototype | shipped
  year: 2026,
  stack: ['React', 'TypeScript'],
  highlights: ['Decisión no obvia número uno.'],
  featured: true,                   // opcional: lo destaca en la home
  glyph: '◈',                       // un carácter para la placa de la tarjeta
}
```

Eso es todo. Aparece en la home, en `/projects`, tiene su propia página en
`/projects/mi-proyecto`, entra en el sitemap y **le crece una planta nueva en `/garden`** cuya
altura sale automáticamente de `stage`.

### Publicar en Garden Updates

En `src/data/updates.ts`:

```ts
{
  slug: 'hackathon-de-octubre',
  title: 'Segundo puesto en la hackathon de octubre',
  date: '2026-10-14',               // YYYY-MM-DD, siempre
  kind: 'hackathon',                // event | hackathon | launch | milestone | note
  excerpt: 'Una o dos frases para la tarjeta.',
  body: [
    'Un párrafo normal.',
    '## Un subtítulo',
    '- Un punto de lista.',
  ],
  images: [{ src: '/updates/foto.jpg', alt: 'Descripción real de la foto' }],
  tags: ['Hackathon'],
}
```

El formato de `body` es todo lo que hay: cada string es un párrafo, `## ` lo convierte en
subtítulo y `- ` en punto de lista. **Sin CMS, sin base de datos, sin panel de administración.**

Las fotos van en `public/updates/`. El `alt` no es opcional: sin él la foto no existe para
quien usa lector de pantalla.

### Cambiar los colores del sitio entero

Todo el lenguaje visual sale de `src/styles/tokens.css`. Los tokens son variables CSS; el
`tailwind.config.js` solo las mapea a clases, y hasta las partículas del fondo las leen en
tiempo real. Cambia un valor ahí y cambia el sitio completo — UI, ilustraciones y canvas
incluidos. Nunca hardcodees un color en un componente.

---

## Arquitectura

```
src/
├── animations/     Variantes y curvas de Framer Motion. Un solo vocabulario de movimiento.
├── app/            Root, router y providers (tema, modo pixel, sonido).
├── components/
│   ├── background/ Fondo vivo: auroras, canvas de partículas, grano.
│   ├── cards/      Tarjetas de proyecto, certificado y update.
│   ├── cursor/     Cursor personalizado (punto + anillo).
│   ├── easter-eggs/ Lo que hay escondido. No lo leas si prefieres encontrarlo.
│   ├── garden/     La escena de /garden: plantas, árboles y flores en SVG.
│   ├── illustrations/ La ilustración del hero.
│   ├── layout/     Navbar, footer, progreso de scroll.
│   ├── motion/     Primitivas: Reveal, TextReveal, TiltCard, Parallax, Magnetic.
│   ├── sections/   Las secciones de la home.
│   ├── seo/        Metadatos por página.
│   └── ui/         Botones, tarjetas de vidrio, badges, placas pixel.
├── data/           ⬅ TODO el contenido. Es lo único que editas a diario.
├── hooks/          Hooks reutilizables.
├── layouts/        Shell de la app y cabecera de páginas internas.
├── lib/            Audio, SEO, GSAP, bus de scroll.
├── pages/          Una por ruta.
├── styles/         tokens · base · utilities. El sistema de diseño.
├── types/          Contratos de contenido. Cambia aquí y el compilador te guía.
└── utils/          Helpers puros.
```

### Decisiones que vale la pena conocer

**Los datos nunca están en los componentes.** Esa separación es la razón por la que este
sitio se puede mantener durante años: el contenido cambia cada semana, los componentes casi
nunca.

**Dark por defecto, con tema claro real.** El tema se aplica en un script inline en
`index.html` antes del primer pintado, así que no hay flash blanco al recargar.

**Framer Motion para casi todo; GSAP para una sola cosa.** Framer es mejor en animaciones
dirigidas por estado (entradas, layout, hover, transiciones de ruta). ScrollTrigger gana en un
único problema: hacer _scrub_ de una timeline sobre muchos objetivos siguiendo el scroll — el
efecto palabra-por-palabra de la sección de filosofía. GSAP se carga de forma **dinámica**, así
que sus ~45 kB nunca están en el arranque, y no se descargan si pides menos movimiento. Si un
efecto futuro no necesita scrub, no necesita GSAP: bórralo de `package.json` y del
`manualChunks` en `vite.config.ts`.

**Nada de logos de marca en el stack.** Cada tecnología usa un monograma pixel. Evita
problemas de marca registrada, encaja con el concepto RPG y —lo más importante— una pared de
logos oficiales es lo más genérico que puede hacer un portafolio de desarrollador.

**`prefers-reduced-motion` se respeta en serio.** No es un `@media` decorativo: los
componentes de movimiento devuelven un `div` estático, el cursor no se monta, Lenis no arranca,
las partículas dibujan un frame y se detienen, y GSAP ni siquiera se descarga.

**Cuidado al escribir CSS con prefijos.** No escribas pares `-webkit-` a mano en
`src/styles/`: el minificador colapsa declaraciones adyacentes y puede quedarse con la
prefijada, que Chrome moderno ya no reconoce. Es un bug que solo aparece en producción. Escribe
la propiedad estándar y deja que `build.cssTarget` ponga los prefijos.

---

## Accesibilidad

- Contraste AA en ambos temas.
- Enlace "Saltar al contenido" como primer elemento enfocable.
- Foco visible en todo lo interactivo (y solo con teclado).
- Toda animación es opcional vía `prefers-reduced-motion`.
- El sonido está **desactivado por defecto**. Un sitio que hace ruido sin permiso es mal
  invitado.
- El jardín de `/garden` es navegable con teclado; cada planta es un enlace real.

---

## SEO

- Metadatos por página con hoisting nativo de React 19 (sin dependencia tipo Helmet).
- Open Graph y Twitter Card, con `og-image.png` generado desde SVG por `npm run og`.
- JSON-LD `Person` en el HTML estático, para crawlers que no ejecutan JavaScript.
- `sitemap.xml` generado automáticamente en cada build desde los archivos de datos.
- `robots.txt`, `manifest.webmanifest` e iconos PWA.

Configura el dominio en `.env`:

```bash
cp .env.example .env
# VITE_SITE_URL=https://tu-dominio.com
```

---

## Despliegue

El sitio vive en **GitHub Pages** y se publica solo: cada push a `main` dispara
`.github/workflows/deploy.yml`, que verifica tipos, pasa el lint, compila y sube el resultado.
No se sube `dist/` al repositorio.

### Puesta en marcha (una sola vez)

1. El repositorio debe llamarse **`MarckCC7.github.io`**. Ese nombre es lo que hace que el
   sitio se sirva en la raíz del dominio en lugar de un subdirectorio.
2. `Settings → Pages → Build and deployment → Source:` **GitHub Actions**.
3. `Settings → Pages →` marca **Enforce HTTPS**.

### Mudarse a un dominio propio

Sin tocar código:

1. Crea `public/CNAME` con una sola línea: `tudominio.com`
2. En el registrador, apunta el dominio a GitHub Pages (registros `A` a las IPs de GitHub,
   o un `CNAME` a `marckcc7.github.io`).
3. Crea la variable de repositorio `SITE_URL` con `https://tudominio.com`
   (`Settings → Secrets and variables → Actions → Variables`).

El paso 3 es el que importa: `VITE_SITE_URL` alimenta el canonical, Open Graph, el JSON-LD,
`robots.txt` y el sitemap. Si se queda con el valor viejo, los buscadores seguirán indexando
la URL antigua.

### Por qué existe `dist/404.html`

GitHub Pages no tiene reglas de reescritura, así que una visita directa a `/projects` nunca
llega a la SPA. El plugin `garden:spa-fallback` en `vite.config.ts` copia `index.html` a
`404.html` en cada build: Pages sirve esa página, React Router lee la URL y pinta la ruta
correcta. Sin ese archivo, todos los enlaces internos se rompen al recargar o al abrir un
enlace compartido.

### Otros hosts

`vercel.json` y `public/_redirects` siguen en el repo y funcionan tal cual en Vercel y
Netlify. Esos dos hosts sí permiten cabeceras HTTP personalizadas (Pages no), así que si
algún día quieres CSP o `X-Frame-Options` reales, ahí ya está configurado.

---

## Easter eggs

Hay varios. No están documentados a propósito.

Uno de ellos empieza con las flechas del teclado. Otro aparece cuando llevas más de la mitad
de la página. Otro vive en la consola del navegador. Y hay algo en `/garden` que recuerda
cuántas veces volviste.

---

## Licencia

[MIT](./LICENSE) — © 2026 Marco Collado C.

El código es libre. El contenido (textos, proyectos, la marca personal) es de Marco: si
reutilizas la estructura, cámbialo por el tuyo.

---

<div align="center">
<sub>Este jardín sigue creciendo. Vuelve en unos meses — va a estar distinto.</sub>
</div>
