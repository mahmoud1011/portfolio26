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
          subtitle="Case studies of shipped products and systems built in production contexts."
        />

        <div className="flex flex-col gap-8">
          {/* Project 01 — Rust: Full width, media left */}
          <ProjectCard project={rust} index={0} layout="full-left" />

          {/* Projects 02 + 03 — Half width grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard project={ar} index={1} layout="half" />
            <ProjectCard project={rickshaw} index={2} layout="half" />
          </div>

          {/* Project 04 — RYDER: Full width, media right */}
          <ProjectCard project={ryder} index={3} layout="full-right" />
        </div>
      </Container>
    </Section>
  );
}
