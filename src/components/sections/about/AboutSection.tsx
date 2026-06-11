import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateIn } from "@/components/shared/AnimateIn";

const focusAreas = [
  "Gameplay Architecture",
  "AI & Behaviour Systems",
  "Rendering & Shaders",
  "Editor Tooling",
];

export function AboutSection() {
  return (
    <Section id="about" ariaLabelledBy="about-heading">
      <Container>
        <SectionHeading id="about-heading" label="Background" title="About" />

        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">
          {/* Left: photo + focus chips */}
          <AnimateIn direction="left" delay={0}>
            <div className="flex flex-col gap-6">
              <div className="relative mx-auto md:mx-0 w-full max-w-[260px]">
                <div className="relative aspect-[4/5] rounded-card-lg overflow-hidden border border-border-default shadow-card">
                  <Image
                    src="/images/profile/mahmoud.jpg"
                    alt="Mahmoud Anwar — Unity Gameplay Programmer"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 260px, 300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent" aria-hidden="true" />
                </div>
                <div className="absolute -bottom-2.5 -right-2.5 w-14 h-14 border-b-2 border-r-2 border-accent/40 rounded-br-lg" aria-hidden="true" />
              </div>

              {/* Focus areas */}
              <div className="hidden md:block">
                <p className="font-mono text-[11px] tracking-widest uppercase text-text-muted mb-3">
                  Focus Areas
                </p>
                <div className="flex flex-col gap-2">
                  {focusAreas.map((area) => (
                    <div key={area} className="flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                      <span className="text-sm text-text-secondary">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right: bio */}
          <AnimateIn direction="up" delay={100}>
            <div className="flex flex-col gap-5">
              <p className="text-lg text-text-primary leading-relaxed font-medium">
                I&apos;m a gameplay systems engineer focused on the architecture behind the experience.
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                The AI that makes enemies feel alive, the modular systems that let designers iterate
                fast, and the rendering work that makes worlds feel real — that&apos;s the work I care
                about most.
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                I&apos;ve shipped code on console hardware at{" "}
                <span className="text-gold font-medium">Double Eleven</span>, built production
                pipelines for mobile and AR products, and worked across genres from action RPG to
                live-service survival multiplayer.
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                My background in audio programming gives me an unusual cross-discipline perspective —
                I think about how systems{" "}
                <span className="text-text-primary font-medium italic">feel</span>, not just how they
                function.
              </p>

              {/* Meta grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px mt-4 rounded-card overflow-hidden border border-border-subtle bg-border-subtle">
                <div className="bg-bg-secondary p-5">
                  <p className="font-mono text-[11px] tracking-widest uppercase text-text-muted mb-1.5">
                    Education
                  </p>
                  <p className="text-sm text-text-primary font-medium leading-snug">
                    BCompSc (Hons) Game Development
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    University of Wollongong Malaysia · 2024
                  </p>
                </div>
                <div className="bg-bg-secondary p-5">
                  <p className="font-mono text-[11px] tracking-widest uppercase text-text-muted mb-1.5">
                    Location
                  </p>
                  <p className="text-sm text-text-primary font-medium leading-snug">
                    Kuala Lumpur, Malaysia
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Open to remote & relocation
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </Section>
  );
}
