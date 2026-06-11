import { Container } from "@/components/layout/Container";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { experience } from "@/content/experience";
import { cn } from "@/lib/utils";

export function ExperienceRibbon() {
  return (
    <div
      id="experience"
      className="relative border-y border-border-subtle bg-bg-secondary/40"
      aria-label="Work experience timeline"
    >
      <Container className="py-12 lg:py-14">
        <AnimateIn direction="none">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs font-medium tracking-widest uppercase text-text-muted">
              Career Timeline
            </span>
            <span className="flex-1 divider-gradient" aria-hidden="true" />
          </div>
        </AnimateIn>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          {/* connecting line */}
          <div className="relative">
            <div className="absolute top-1.5 left-0 right-0 h-px bg-border-default" aria-hidden="true" />
            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(${experience.length}, 1fr)` }}
              role="list"
              aria-label="Work history"
            >
              {experience.map((item, index) => (
                <AnimateIn key={item.id} delay={index * 90} direction="up">
                  <div role="listitem" className="relative pr-8">
                    {/* node */}
                    <span
                      className={cn(
                        "absolute top-0 left-0 w-3 h-3 rounded-full border-2 border-bg-secondary",
                        index === 0 ? "bg-gold" : "bg-accent"
                      )}
                      aria-hidden="true"
                    />
                    <div className="pt-7">
                      <p className="text-sm font-semibold text-text-primary leading-tight">
                        {item.studio}
                      </p>
                      {item.subtitle && (
                        <p className="font-mono text-xs text-gold mt-1">{item.subtitle}</p>
                      )}
                      <p className="text-xs text-text-secondary mt-2 leading-snug">{item.role}</p>
                      <p className="font-mono text-[11px] text-text-muted mt-1.5">{item.period}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: scrollable cards */}
        <div
          className="flex md:hidden gap-3 overflow-x-auto pb-3 -mx-1 px-1 snap-x snap-mandatory scrollbar-hide"
          role="list"
          aria-label="Work history"
        >
          {experience.map((item, index) => (
            <div
              key={item.id}
              role="listitem"
              className="flex-shrink-0 snap-start w-52 p-4 rounded-card card-surface border border-border-subtle"
            >
              <span
                className={cn(
                  "inline-block w-2 h-2 rounded-full mb-3",
                  index === 0 ? "bg-gold" : "bg-accent"
                )}
                aria-hidden="true"
              />
              <p className="text-sm font-semibold text-text-primary leading-tight">{item.studio}</p>
              {item.subtitle && <p className="font-mono text-xs text-gold mt-1">{item.subtitle}</p>}
              <p className="text-xs text-text-secondary mt-2 leading-snug">{item.role}</p>
              <p className="font-mono text-[11px] text-text-muted mt-1.5">{item.period}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
