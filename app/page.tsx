import { Navbar } from "@/components/navigation/Navbar";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { ExperienceRibbon } from "@/components/sections/experience/ExperienceRibbon";
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";
import { SkillsSection } from "@/components/sections/skills/SkillsSection";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ExperienceRibbon />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
