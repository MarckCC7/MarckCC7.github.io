import { ProjectCard } from '@components/cards/ProjectCard';
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
      <div className="projects-grid">
        {ordered.map((project) => (
          <div key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </Section>
  );
}
