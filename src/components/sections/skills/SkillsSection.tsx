import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Tag } from "@/components/shared/Tag";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { skillDomains } from "@/content/skills";

export function SkillsSection() {
  return (
    <Section
      id="skills"
      ariaLabelledBy="skills-heading"
      className="bg-bg-secondary/30"
    >
      <Container>
        <SectionHeading
          id="skills-heading"
          label="Technical Expertise"
          title="Skills"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillDomains.map((domain, i) => (
            <AnimateIn key={domain.title} delay={i * 80} direction="up">
              <div
                className="p-6 rounded-card bg-bg-secondary border border-border-subtle hover:border-border-strong transition-colors duration-200"
                aria-labelledby={`skill-domain-${i}`}
              >
                <p
                  id={`skill-domain-${i}`}
                  className="font-mono text-xs font-semibold tracking-widest uppercase text-accent mb-4"
                >
                  {domain.title}
                </p>
                <div className="flex flex-wrap gap-2" role="list" aria-label={`${domain.title} skills`}>
                  {domain.skills.map((skill) => (
                    <div key={skill} role="listitem">
                      <Tag label={skill} variant="default" />
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
