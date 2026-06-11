import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateIn } from "@/components/shared/AnimateIn";

export function AboutSection() {
  return (
    <Section id="about" ariaLabelledBy="about-heading">
      <Container>
        <SectionHeading
          id="about-heading"
          label="Background"
          title="About"
        />

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-10 lg:gap-16 items-start">
          {/* Profile image */}
          <AnimateIn direction="left" delay={0}>
            <div className="relative mx-auto md:mx-0 w-40 h-40 md:w-full md:h-auto md:aspect-square">
              <div
                className="relative w-40 h-40 md:w-full md:aspect-square rounded-card overflow-hidden border border-accent-border shadow-accent"
                style={{ maxWidth: "240px" }}
              >
                <Image
                  src="/images/profile/mahmoud.jpg"
                  alt="Mahmoud Anwar — Unity Gameplay Programmer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 160px, 240px"
                  priority
                />
              </div>
              {/* Accent corner decoration */}
              <div
                className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-accent opacity-40 rounded-br-sm"
                aria-hidden="true"
              />
            </div>
          </AnimateIn>

          {/* Bio */}
          <AnimateIn direction="up" delay={100}>
            <div className="flex flex-col gap-5">
              <p className="text-base text-text-secondary leading-relaxed">
                I&apos;m a gameplay systems engineer focused on the architecture behind the experience
                — the AI that makes enemies feel alive, the modular systems that let designers iterate
                fast, and the rendering work that makes worlds feel real.
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                I&apos;ve shipped code on console hardware at{" "}
                <span className="text-gold font-medium">Double Eleven</span>, built production
                pipelines for mobile and AR products, and worked across genres from action RPG to
                live-service survival multiplayer.
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                My background in audio programming gives me an unusual cross-discipline perspective
                — I think about how systems{" "}
                <span className="text-text-primary font-medium italic">feel</span>, not just how they
                function.
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                Currently based in{" "}
                <span className="text-text-primary font-medium">Kuala Lumpur</span>. Open to studio
                roles, remote contracts, and international opportunities.
              </p>

              {/* Education callout */}
              <div className="flex items-center gap-3 pt-2 border-t border-border-subtle">
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest">Education</span>
                <span className="text-sm text-text-secondary">
                  BCompSc (Hons) Game Development — University of Wollongong Malaysia, 2024
                </span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </Section>
  );
}
