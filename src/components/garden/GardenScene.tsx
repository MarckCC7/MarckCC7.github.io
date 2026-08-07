import { AnimatePresence, motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { certificates } from '@data/certificates';
import { projects, stageMeta } from '@data/projects';
import { sortedUpdates } from '@data/updates';
import { usePreferences } from '@hooks/usePreferences';
import { formatMonth } from '@utils/format';
import { cn } from '@utils/cn';

import { Flower, Plant, Tree } from './GardenOrganisms';

interface Organism {
  id: string;
  label: string;
  caption: string;
  href: string;
  scale: number;
  accent?: string;
  render: (scale: number, seed: number, accent?: string) => ReactNode;
}

/**
 * The garden plot.
 *
 * Every organism is generated from real content — nothing here is decorative
 * filler. A project's plant height comes from its stage, a certificate's tree
 * is always full-grown (it is finished, by definition), and updates bloom in
 * the order they were written. Add a project to `data/projects.ts` and a new
 * plant appears in the soil.
 *
 * Laid out as three horizontally scrollable beds rather than a free-form
 * canvas: beds stay readable on a phone, keep every item keyboard-reachable,
 * and never turn browsing into a scavenger hunt.
 */
export function GardenScene() {
  const beds: { id: string; title: string; caption: string; organisms: Organism[] }[] = [
    {
      id: 'proyectos',
      title: 'Proyectos',
      caption: 'Cada planta crece según la etapa real del proyecto.',
      organisms: projects.map((project) => ({
        id: project.slug,
        label: project.title,
        caption: stageMeta[project.stage].label,
        href: `/projects/${project.slug}`,
        scale: stageMeta[project.stage].growth,
        render: (scale, seed) => <Plant scale={scale} seed={seed} />,
      })),
    },
    {
      id: 'certificados',
      title: 'Certificados',
      caption: 'Árboles: lo que ya echó raíz y no se mueve.',
      organisms: certificates.map((certificate) => ({
        id: certificate.id,
        label: certificate.title,
        caption: certificate.issuer,
        href: '/#certificados',
        scale: 1,
        render: (scale, seed) => <Tree scale={scale} seed={seed} />,
      })),
    },
    {
      id: 'updates',
      title: 'Garden Updates',
      caption: 'Flores: cada publicación abre una nueva.',
      organisms: sortedUpdates.map((update, index) => ({
        id: update.slug,
        label: update.title,
        caption: formatMonth(update.date),
        href: `/updates/${update.slug}`,
        // The most recent bloom is the fullest.
        scale: 1 - Math.min(index * 0.14, 0.5),
        render: (scale, seed) => <Flower scale={scale} seed={seed} />,
      })),
    },
  ];

  return (
    <div className="space-y-14">
      {beds.map((bed) => (
        <GardenBed key={bed.id} {...bed} />
      ))}
    </div>
  );
}

function GardenBed({
  title,
  caption,
  organisms,
}: {
  title: string;
  caption: string;
  organisms: Organism[];
}) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className="font-display font-semibold tracking-tight text-base text-ink">{title}</h2>
        <span className="text-xs text-ink-muted">{caption}</span>
      </div>

      <div className="glass relative overflow-hidden rounded-3xl">
        {/* soil texture */}
        <span
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(var(--line-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--line-subtle) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* light from above */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(70%_100%_at_50%_0%,var(--ambient-a),transparent)]"
        />

        {/* `justify-around` spreads the organisms across the bed instead of
            bunching them at the left edge. Only from `sm` up: when the row
            overflows on a phone, distributed alignment can make the first item
            unreachable by scrolling. */}
        <ul className="mask-fade-x relative flex items-end gap-3 overflow-x-auto px-6 pt-10 pb-8 sm:justify-around sm:gap-6">
          {organisms.map((organism, index) => (
            <GardenOrganism key={organism.id} organism={organism} seed={index} />
          ))}
        </ul>

        {/* ground line */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-8 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
        />
      </div>
    </section>
  );
}

function GardenOrganism({ organism, seed }: { organism: Organism; seed: number }) {
  const [hovered, setHovered] = useState(false);
  const { play } = usePreferences();

  return (
    <li className="relative shrink-0">
      <Link
        to={organism.href}
        data-cursor="card"
        data-cursor-label="VER"
        onMouseEnter={() => {
          setHovered(true);
          play('hover');
        }}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className={cn(
          'block rounded-2xl px-2 pb-2 transition-[transform,filter] duration-500 ease-garden',
          'hover:-translate-y-1 focus-visible:-translate-y-1',
          hovered ? 'brightness-115' : 'brightness-100',
        )}
      >
        <span className="sr-only">{organism.label}</span>
        {organism.render(organism.scale, seed, organism.accent)}
      </Link>

      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="glass-strong pointer-events-none absolute -top-2 left-1/2 z-20 w-max max-w-[13rem] -translate-x-1/2 rounded-xl px-3 py-2"
          >
            <span className="block text-xs font-medium text-ink">{organism.label}</span>
            <span className="mt-0.5 block text-[0.625rem] text-ink-muted">{organism.caption}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </li>
  );
}
