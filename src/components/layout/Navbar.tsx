import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, Volume2, VolumeX, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { Magnetic } from '@components/motion/Magnetic';
import { Container } from '@components/ui/Container';
import { primaryNav } from '@data/navigation';
import { site } from '@data/site';
import { usePreferences } from '@hooks/usePreferences';
import { cn } from '@utils/cn';

/**
 * Fixed navigation.
 *
 * Starts transparent over the hero and condenses into a glass bar once the
 * page scrolls — the classic Apple move, and the reason it works is that the
 * hero never competes with a chrome bar for attention.
 */
export function Navbar() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (value) => setCondensed(value > 24));

  // Close the mobile sheet whenever the route changes — including on browser
  // back/forward, which no click handler would catch.
  //
  // Adjusted during render rather than in an effect: React discards this render
  // and immediately re-runs with the corrected state, so the menu never paints
  // open on the new page. An effect would run *after* that paint.
  const [menuPath, setMenuPath] = useState(location.pathname);
  if (menuPath !== location.pathname) {
    setMenuPath(location.pathname);
    if (menuOpen) setMenuOpen(false);
  }

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed top-4 left-4 z-[60] rounded-xl bg-azure-500 px-4 py-2 text-sm font-medium text-white"
      >
        Saltar al contenido
      </a>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <Container>
          <div
            className={cn(
              'garden-navbar mt-3 flex h-16 items-center justify-between rounded-3xl px-3 transition-all duration-500 ease-garden sm:px-4',
              condensed
                ? 'glass-strong border border-line-subtle shadow-lift'
                : 'glass border-line-default border',
            )}
          >
            <Wordmark />

            <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
              {primaryNav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  data-cursor="link"
                  className={({ isActive }) =>
                    cn(
                      'relative rounded-xl px-3.5 py-2 text-sm transition-colors duration-300',
                      isActive ? 'text-ink' : 'text-ink-secondary hover:text-ink',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-xl border border-line-subtle bg-elevated/70"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {item.label}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <PreferenceToggles />
              <Link
                to="/#contacto"
                className="nav-contact hidden lg:inline-flex"
                data-cursor="button"
              >
                Contacto <ArrowUpRight size={15} />
              </Link>
              <button
                id="mobile-menu-toggle"
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={menuOpen}
                data-cursor="button"
                className="grid h-9 w-9 place-items-center rounded-xl text-ink-secondary transition-colors hover:bg-elevated/60 hover:text-ink md:hidden"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </Container>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

/* ── Wordmark ───────────────────────────────────────────────────────────── */

function Wordmark() {
  return (
    <Magnetic strength={0.2}>
      <Link
        to="/"
        data-cursor="link"
        aria-label={`${site.name} — inicio`}
        className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5"
      >
        {/* A sprout, drawn as four pixels. The smallest possible RPG detail. */}
        <span aria-hidden className="relative grid h-6 w-6 place-items-center">
          <span className="absolute h-1.5 w-1.5 translate-y-1.5 bg-moss-400 transition-transform duration-500 ease-garden group-hover:translate-y-2" />
          <span className="absolute h-1.5 w-1.5 -translate-x-1.5 -translate-y-0.5 bg-moss-300 transition-transform duration-500 ease-garden group-hover:-translate-x-2" />
          <span className="absolute h-1.5 w-1.5 translate-x-1.5 -translate-y-0.5 bg-moss-300 transition-transform duration-500 ease-garden group-hover:translate-x-2" />
          <span className="absolute h-1.5 w-1.5 -translate-y-2.5 animate-pixel-blink bg-moss-200" />
        </span>

        <span className="font-display text-[0.9375rem] font-semibold tracking-tight text-ink">
          Marco
          <span className="brand-surname text-ink-muted"> Collado C.</span>
        </span>
      </Link>
    </Magnetic>
  );
}

/* ── Preference toggles ─────────────────────────────────────────────────── */

function PreferenceToggles() {
  const { theme, toggleTheme, soundEnabled, toggleSound } = usePreferences();

  const buttonClass =
    'grid h-9 w-9 place-items-center rounded-xl text-ink-secondary transition-colors duration-300 hover:bg-elevated/60 hover:text-ink';

  return (
    <>
      <button
        type="button"
        onClick={toggleSound}
        data-cursor="button"
        aria-label={soundEnabled ? 'Desactivar sonido' : 'Activar sonido'}
        aria-pressed={soundEnabled}
        className={buttonClass}
      >
        {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
      </button>

      <button
        type="button"
        onClick={toggleTheme}
        data-cursor="button"
        aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        className={buttonClass}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="grid place-items-center"
          >
            {theme === 'dark' ? <Moon size={17} /> : <Sun size={17} />}
          </motion.span>
        </AnimatePresence>
      </button>
    </>
  );
}

/* ── Mobile sheet ───────────────────────────────────────────────────────── */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    menu?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !menu) return;
      const controls = menu.querySelectorAll<HTMLElement>('a, button');
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.getElementById('mobile-menu-toggle')?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 md:hidden"
        >
          <div aria-hidden className="absolute inset-0 bg-base/95 backdrop-blur-xl" />

          <motion.nav
            aria-label="Principal móvil"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-full flex-col gap-1 overflow-y-auto px-gutter pt-28 pb-8"
          >
            {primaryNav.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * index + 0.08, duration: 0.45 }}
              >
                <NavLink
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'block py-3 font-display text-4xl tracking-tight transition-colors',
                      isActive ? 'text-moss-300' : 'text-ink hover:text-moss-200',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}

            <Link
              to="/#contacto"
              onClick={onClose}
              className="mt-4 inline-flex w-fit items-center gap-3 rounded-xl border border-line-strong px-5 py-3 text-moss-300"
            >
              Contacto <ArrowUpRight size={18} />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 inline-flex w-fit items-center gap-2 py-2 text-sm text-ink-secondary"
            >
              <X size={16} /> Cerrar menú
            </button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-6 font-mono text-xs text-moss-300"
            >
              {site.motto}
            </motion.p>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
