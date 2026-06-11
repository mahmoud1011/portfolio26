import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Tag } from "@/components/shared/Tag";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { skillDomains } from "@/content/skills";

const domainNumbers = ["01", "02", "03", "04"];

export function SkillsSection() {
  return (
    <Section id="skills" ariaLabelledBy="skills-heading" className="bg-bg-secondary/30">
      <Container>
        <SectionHeading
          id="skills-heading"
          label="Technical Expertise"
          title="Skills & Systems"
          subtitle="The domains I work across — from low-level rendering on console hardware to designer-facing tooling."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {skillDomains.map((domain, i) => (
            <AnimateIn key={domain.title} delay={i * 80} direction="up">
              <div
                className="group relative h-full p-6 lg:p-7 rounded-card card-surface border border-border-subtle hover:border-border-strong transition-all duration-300 hover:shadow-card"
                aria-labelledby={`skill-domain-${i}`}
              >
                {/* number watermark */}
                <span
                  className="absolute top-5 right-6 font-mono text-xs font-medium text-text-faint group-hover:text-accent/40 transition-colors duration-300"
                  aria-hidden="true"
                >
                  {domainNumbers[i]}
                </span>

                <div className="flex items-center gap-2.5 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <p id={`skill-domain-${i}`} className="font-mono text-xs font-semibold tracking-widest uppercase text-accent">
                    {domain.title}
                  </p>
                </div>

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
