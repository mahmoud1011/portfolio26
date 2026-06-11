import { Container } from "@/components/layout/Container";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { experience } from "@/content/experience";
import { cn } from "@/lib/utils";

export function ExperienceRibbon() {
  return (
    <div
      id="experience"
      className="py-10 border-y border-border-subtle bg-bg-secondary/50"
      aria-label="Work experience timeline"
    >
      <Container>
        <AnimateIn direction="none">
          <p className="font-mono text-xs font-medium tracking-widest uppercase text-text-muted mb-6">
            Professional Experience
          </p>
        </AnimateIn>

        {/* Desktop: horizontal row */}
        <div
          className="hidden md:grid"
          style={{ gridTemplateColumns: `repeat(${experience.length}, 1fr)` }}
          role="list"
          aria-label="Work history"
        >
          {experience.map((item, index) => (
            <AnimateIn key={item.id} delay={index * 80} direction="up">
              <div
                role="listitem"
                className={cn(
                  "pr-8 py-2 relative",
                  index < experience.length - 1 && "border-r border-border-subtle"
                )}
              >
                {index > 0 && (
                  <div
                    className="absolute top-4 -left-px w-1.5 h-1.5 rounded-full bg-border-strong -translate-x-[3px]"
                    aria-hidden="true"
                  />
                )}

                <div
                  className={cn(
                    "pl-4",
                    index === 0 && "pl-0"
                  )}
                >
                  <p className="text-sm font-semibold text-text-primary leading-tight">
                    {item.studio}
                  </p>
                  {item.subtitle && (
                    <p className="font-mono text-xs text-gold mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                  <p className="text-xs text-text-secondary mt-1.5 leading-tight">
                    {item.role}
                  </p>
                  <p className="font-mono text-[11px] text-text-muted mt-1">
                    {item.period}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Mobile: scrollable horizontal cards */}
        <div
          className="flex md:hidden gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
          role="list"
          aria-label="Work history"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {experience.map((item) => (
            <div
              key={item.id}
              role="listitem"
              className="flex-shrink-0 snap-start w-48 p-4 rounded-card bg-bg-elevated border border-border-subtle"
            >
              <p className="text-sm font-semibold text-text-primary leading-tight">
                {item.studio}
              </p>
              {item.subtitle && (
                <p className="font-mono text-xs text-gold mt-0.5">
                  {item.subtitle}
                </p>
              )}
              <p className="text-xs text-text-secondary mt-1.5 leading-tight">
                {item.role}
              </p>
              <p className="font-mono text-[11px] text-text-muted mt-1">
                {item.period}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
