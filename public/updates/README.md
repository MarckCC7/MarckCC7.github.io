# public/updates

Las fotos de las publicaciones de **Garden Updates** van aquí.

Se referencian por ruta absoluta desde `src/data/updates.ts`:

```ts
images: [
  {
    src: '/updates/turiston-2026-equipo.jpg',
    alt: 'El equipo presentando el prototipo ante el jurado',
    caption: 'Opcional: un pie de foto.',
  },
],
```

**Antes de subir una foto:**

- Redimensiónala a **1600 px de ancho como máximo**. Nadie necesita 4032 px en una
  tarjeta de 600.
- Usa `.webp` si puedes, `.jpg` si no. PNG solo para capturas con texto.
- Nombra el archivo con el slug de la publicación: `slug-descripcion.webp`.
- El `alt` **no es opcional**. Describe lo que se ve, no repitas el título.

Las imágenes cargan con `loading="lazy"`, así que una publicación con varias
fotos no penaliza el tiempo de carga de la lista.
