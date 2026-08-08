import { useEffect } from 'react';

import { site } from '@data/site';
import { resolveSeo, type SeoInput } from '@lib/seo';

/**
 * Per-page metadata.
 *
 * React 19 hoists `<title>`, `<meta>` and `<link>` into `<head>` no matter how
 * deep they are rendered, so no Helmet-style dependency is needed. The JSON-LD
 * block is injected imperatively because React does not hoist inline scripts.
 */
export function Seo({ jsonLd, ...input }: SeoInput & { jsonLd?: string }) {
  const seo = resolveSeo(input);

  /**
   * Retira las etiquetas SEO estáticas de `index.html` en cuanto React monta
   * las suyas.
   *
   * Hacen falta las dos: las estáticas sirven a los rastreadores que no
   * ejecutan JavaScript, y las de React son las únicas correctas por página.
   * El problema es que React 19 las AÑADE, no las sustituye — y como cada ruta
   * prerenderizada es una copia del mismo `index.html`, cada subpágina acababa
   * con dos `canonical`, dos `og:url`, dos `title` y dos `description`. El
   * primero de cada par apuntaba a la portada.
   *
   * Con dos `canonical` en la misma página, Google ignora ambos: la estrategia
   * de canonical quedaba anulada en todo el sitio.
   *
   * Se ejecuta una sola vez; después de eso ya no queda nada estático que
   * limpiar en navegaciones sucesivas.
   */
  useEffect(() => {
    document.head.querySelectorAll('[data-seo="static"]').forEach((node) => node.remove());
  }, []);

  useEffect(() => {
    if (!jsonLd) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seo = 'page';
    script.textContent = jsonLd;
    document.head.appendChild(script);

    return () => script.remove();
  }, [jsonLd]);

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.canonical} />
      {seo.noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:type" content={seo.type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={site.locale} />
      {seo.publishedTime && <meta property="article:published_time" content={seo.publishedTime} />}
      {seo.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </>
  );
}
