# src/assets

Assets que pasan por el build de Vite: se les aplica hash, se optimizan y se
inlinean si son pequeños.

```
assets/
├── images/   fotos y gráficos importados desde componentes
└── fonts/    solo si algún día se usa una fuente que no esté en npm
```

**Qué va aquí y qué no:**

| Tipo de archivo                                     | Dónde             | Por qué                                            |
| --------------------------------------------------- | ----------------- | -------------------------------------------------- |
| Imagen importada en un componente (`import x from`) | `src/assets/`     | Vite le pone hash → cacheable para siempre         |
| Foto de una publicación (`/updates/foto.jpg`)       | `public/updates/` | Se referencia por ruta desde `src/data/updates.ts` |
| Favicon, OG image, iconos PWA                       | `public/`         | Rutas fijas que exigen navegadores y crawlers      |

De momento está vacío a propósito: **todas las ilustraciones del sitio son SVG
inline** (`src/components/illustrations/` y `src/components/garden/`). Pesan unos
pocos kilobytes, se ven nítidas en cualquier pantalla y —lo importante— cada
elemento es animable y responde a los tokens de color, cosa que un PNG no puede
hacer.

Antes de meter un binario aquí, pregúntate si no debería ser un SVG.
