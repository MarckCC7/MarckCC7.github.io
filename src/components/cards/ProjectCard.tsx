import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Plant } from '@components/garden/GardenOrganisms';
import { Badge } from '@components/ui/Badge';
import { GlassCard } from '@components/ui/GlassCard';
import { stageMeta } from '@data/projects';
import { usePrefersReducedMotion } from '@hooks/useMediaQuery';
import type { Project } from '@/types';

export function ProjectCard({ project }: { project: Project }) {
  const stage = stageMeta[project.stage];
  const reducedMotion = usePrefersReducedMotion();
  return (
    <GlassCard className="project-card h-full" glow>
      <Link
        to={`/projects/${project.slug}`}
        data-cursor="card"
        data-cursor-label="ABRIR"
        className="project-card-link"
      >
        <div className="project-meta">
          <Badge className={stage.tone} dot={stage.dot}>
            {stage.label}
          </Badge>
          <span>{project.year}</span>
        </div>
        <motion.div
          className="project-plant"
          aria-hidden
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Plant scale={stage.growth} />
        </motion.div>
        <h3>{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>
        <div className="project-stack">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
          {project.stack.length > 3 && (
            <span className="project-stack-more">+{project.stack.length - 3}</span>
          )}
        </div>
        <div className="project-card-foot">
          <span>
            Ver detalle <ArrowUpRight size={13} />
          </span>
          <span className="circle-arrow">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>
    </GlassCard>
  );
}
