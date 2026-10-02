import { ProjectCard } from '@components/cards/ProjectCard';
import { RevealGroup, RevealItem } from '@components/motion/Reveal';
import { Section } from '@components/ui/Section';
import { SectionRail } from '@components/ui/SectionRail';
import { projects } from '@data/projects';

export function ProjectsSection() {
  const ordered = [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );
  return (
    <Section spacing="custom" id="proyectos" className="home-section">
      <SectionRail
        title="Proyectos"
        description="Sistemas públicos y privados, productos desplegados e ideas que sigo cultivando."
      />
      <RevealGroup className="projects-grid" stagger={0.06}>
        {ordered.map((project) => (
          <RevealItem key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
