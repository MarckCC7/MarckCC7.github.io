import { Seo } from '@components/seo/Seo';
import { AboutSection } from '@components/sections/AboutSection';
import { CertificatesSection } from '@components/sections/CertificatesSection';
import { ContactSection } from '@components/sections/ContactSection';
import { Hero } from '@components/sections/Hero';
import { PhilosophySection } from '@components/sections/PhilosophySection';
import { ProjectsSection } from '@components/sections/ProjectsSection';
import { RoadmapSection } from '@components/sections/RoadmapSection';
import { StackSection } from '@components/sections/StackSection';
import { UpdatesSection } from '@components/sections/UpdatesSection';
import { personJsonLd } from '@lib/seo';

/**
 * The home page.
 *
 * Section order is an argument, read top to bottom: who I am → what I can do →
 * where I am going → what I have built → what I have earned → what I am doing
 * right now → how to reach me. A recruiter who stops at any point has still
 * read a complete thought.
 */
export function HomePage() {
  return (
    <>
      <Seo jsonLd={personJsonLd()} />

      <Hero />
      <AboutSection />
      <StackSection />
      <RoadmapSection />
      <PhilosophySection />
      <ProjectsSection />
      <CertificatesSection />
      <UpdatesSection />
      <ContactSection />
    </>
  );
}
