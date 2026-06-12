import { Navbar } from "@/components/navigation/Navbar";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { ConsoleSignature } from "@/components/shared/ConsoleSignature";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { ExperienceRibbon } from "@/components/sections/experience/ExperienceRibbon";
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";
import { SkillsSection } from "@/components/sections/skills/SkillsSection";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export default function Home() {
  return (
    <>
      <ConsoleSignature />
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
