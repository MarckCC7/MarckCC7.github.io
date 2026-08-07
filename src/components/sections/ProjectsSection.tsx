import { ArrowRight } from 'lucide-react';

import { ProjectCard } from '@components/cards/ProjectCard';
import { Reveal, RevealGroup, RevealItem } from '@components/motion/Reveal';
import { ButtonLink } from '@components/ui/Button';
import { Section } from '@components/ui/Section';
import { SectionHeading } from '@components/ui/SectionHeading';
import { projects } from '@data/projects';

/**
 * Projects on the home page: the first four, featured ones first.
 *
 * Not all six — a grid that ends invites scrolling past it. A grid that
 * obviously continues sends people to `/projects`, which is where the filters
 * and the full set live.
 */
export function ProjectsSection() {
  const ordered = [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );
  const shown = ordered.slice(0, 4);

  return (
    <Section id="proyectos">
      <SectionHeading
        eyebrow="04 · Proyectos"
        title="Cada proyecto es una planta. Algunas son semillas, y lo dicen."
        description="Ninguno de estos está inflado. La etiqueta que ves es la etapa real en la que está — porque un proyecto bien pensado en fase de idea vale más que uno vago que dice estar terminado."
      />

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.1}>
        {shown.map((project) => (
          <RevealItem key={project.slug} className="h-full">
            <ProjectCard project={project} featured={project.featured} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-10 flex justify-center">
        <ButtonLink
          href="/projects"
          variant="secondary"
          size="lg"
          trailing={
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          }
        >
          Ver los {projects.length} proyectos
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
