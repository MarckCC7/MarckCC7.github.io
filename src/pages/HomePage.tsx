import { Seo } from '@components/seo/Seo';
import { AboutSection } from '@components/sections/AboutSection';
import { CertificatesSection } from '@components/sections/CertificatesSection';
import { ContactSection } from '@components/sections/ContactSection';
import { Hero } from '@components/sections/Hero';
import { GardenOverview } from '@components/sections/GardenOverview';
import { PhilosophySection } from '@components/sections/PhilosophySection';
import { ProjectsSection } from '@components/sections/ProjectsSection';
import { RoadmapSection } from '@components/sections/RoadmapSection';
import { StackSection } from '@components/sections/StackSection';
import { UpdatesSection } from '@components/sections/UpdatesSection';
import { personJsonLd } from '@lib/seo';

/**
 * The home page.
 *
 * The compact home follows the garden reference: introduction, principles,
 * tools, garden beds and projects. Credentials and the growth log follow;
 * the longer learning path remains available near the contact section.
 */
export function HomePage() {
  return (
    <>
      <Seo jsonLd={personJsonLd()} />

      <Hero />
      <AboutSection />
      <StackSection />
      <GardenOverview />
      <ProjectsSection />
      <CertificatesSection />
      <UpdatesSection />
      <RoadmapSection />
      <PhilosophySection />
      <ContactSection />
    </>
  );
}
