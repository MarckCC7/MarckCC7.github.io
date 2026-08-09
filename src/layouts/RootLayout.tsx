import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';

import { pageTransition } from '@animations/variants';
import { AmbientBackground } from '@components/background/AmbientBackground';
import { CustomCursor } from '@components/cursor/CustomCursor';
import { EasterEggLayer } from '@components/easter-eggs/EasterEggLayer';
import { Footer } from '@components/layout/Footer';
import { Navbar } from '@components/layout/Navbar';
import { ScrollProgress } from '@components/layout/ScrollProgress';
import { ScrollRestoration } from '@components/layout/ScrollRestoration';
import { usePrefersReducedMotion } from '@hooks/useMediaQuery';
import { useSmoothScroll } from '@hooks/useSmoothScroll';

/**
 * The application shell.
 *
 * Everything persistent lives here — background, cursor, chrome, easter eggs —
 * so route changes only swap the content between them. That is what makes page
 * transitions feel like moving through one space instead of loading documents.
 */
export function RootLayout() {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();

  useSmoothScroll();

  return (
    <>
      <AmbientBackground />
      <ScrollProgress />
      <CustomCursor />
      <ScrollRestoration />

      <Navbar />

      <main id="main" className="relative">
        {/* `mode="wait"` lets the outgoing page finish before the next arrives,
            which keeps the scroll position from jumping mid-crossfade.

            OJO con `initial`: hay que dejarlo activado (su valor por defecto).
            Poniéndolo en `false` no solo se salta la entrada de esta capa —
            Framer propaga ese `false` por contexto a TODO lo que haya debajo,
            así que en la primera carga cada hijo se pintaba directamente en su
            estado final. La web entraba congelada: la planta del hero ya
            dibujada, las secciones ya reveladas. Solo al navegar a otra ruta y
            volver aparecían las animaciones, porque para entonces ya no era el
            montaje inicial. Justo al revés de lo que queremos: la primera
            visita es la única que importa. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={reducedMotion ? undefined : pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <EasterEggLayer />
    </>
  );
}
