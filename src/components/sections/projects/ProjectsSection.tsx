import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/content/projects";

export function ProjectsSection() {
  const [rust, ar, rickshaw, ryder] = projects;

  return (
    <Section id="projects" ariaLabelledBy="projects-heading">
      <Container>
        <SectionHeading
          id="projects-heading"
          label="Selected Work"
          title="Featured Projects"
          subtitle="Case studies of shipped products and the systems behind them — built in production contexts, across console, mobile, and AR."
        />

        <div className="flex flex-col gap-5 lg:gap-6">
          <ProjectCard project={rust} index={0} layout="full-left" number="01" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            <ProjectCard project={ar} index={1} layout="half" number="02" />
            <ProjectCard project={rickshaw} index={2} layout="half" number="03" />
          </div>

          <ProjectCard project={ryder} index={3} layout="full-right" number="04" />
        </div>
      </Container>
    </Section>
  );
}
