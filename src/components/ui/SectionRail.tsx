import { Diamond } from 'lucide-react';

/** Compact heading connecting the home-page collections. */
export function SectionRail({ title, description }: { title: string; description: string }) {
  return (
    <div className="section-rail">
      <h2>
        <Diamond size={12} aria-hidden />
        {title}
      </h2>
      <span className="section-rail-line" aria-hidden />
      <p>{description}</p>
    </div>
  );
}
