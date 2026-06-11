import { Tag } from "@/components/shared/Tag";
import { Button } from "@/components/shared/Button";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { ProjectMedia } from "./ProjectMedia";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
  layout?: "full-left" | "full-right" | "half";
  number?: string;
}

export function ProjectCard({ project, index, layout = "half", number }: ProjectCardProps) {
  const isGold = project.accentVariant === "gold";
  const accentText = isGold ? "text-gold" : "text-accent";
  const bulletColor = isGold ? "bg-gold" : "bg-accent";

  // ── Half-width card ──
  if (layout === "half") {
    return (
      <AnimateIn delay={index * 60} direction="up" className="h-full">
        <article
          className={cn(
            "group flex flex-col h-full overflow-hidden card-surface border rounded-card-lg",
            "transition-all duration-300 hover:-translate-y-1",
            isGold
              ? "border-gold-border/50 hover:shadow-gold"
              : "border-border-subtle hover:border-accent-border hover:shadow-accent"
          )}
          aria-label={`Project: ${project.title}`}
        >
          <div className="relative overflow-hidden">
            <ProjectMedia
              media={project.media}
              title={project.title}
              accentVariant={project.accentVariant}
              className="rounded-none"
            />
            {number && (
              <span className="absolute top-3 left-3 flex items-center justify-center w-7 h-7 rounded-md bg-bg-primary/70 backdrop-blur-md border border-border-default font-mono text-xs font-bold text-text-secondary">
                {number}
              </span>
            )}
          </div>

          <div className="flex flex-col flex-1 p-6 gap-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <p className={cn("font-mono text-[11px] font-semibold tracking-widest uppercase", accentText)}>
                  {project.studio}
                </p>
                <span className="font-mono text-xs text-text-muted">{project.year}</span>
              </div>
              <h3 className="text-h3 font-bold text-text-primary">{project.title}</h3>
              <p className="text-xs text-text-secondary mt-1">{project.role}</p>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">{project.description}</p>

            <div className="flex flex-col gap-2.5">
              {project.systems.slice(0, 3).map((system) => (
                <div key={system.name} className="flex gap-2.5">
                  <span className={cn("mt-1.5 w-1.5 h-1.5 rounded-full shrink-0", bulletColor)} aria-hidden="true" />
                  <p className="text-xs leading-relaxed">
                    <span className="font-semibold text-text-primary">{system.name}</span>
                    <span className="text-text-muted"> — {system.description}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {project.techTags.slice(0, 5).map((tag) => (
                <Tag key={tag} label={tag} variant={isGold ? "gold" : "default"} />
              ))}
            </div>

            {project.links.length > 0 && (
              <div className="mt-auto pt-2 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <Button
                    key={link.label}
                    variant={link.variant === "primary" ? "primary" : "secondary"}
                    size="sm"
                    href={link.href}
                    external={link.external}
                    icon={link.external ? <ExternalLink size={12} /> : undefined}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </article>
      </AnimateIn>
    );
  }

  // ── Full-width card ──
  const isReversed = layout === "full-right";

  return (
    <AnimateIn delay={index * 60} direction="up">
      <article
        className={cn(
          "group grid grid-cols-1 lg:grid-cols-2 overflow-hidden card-surface border rounded-card-lg",
          "transition-all duration-300",
          isGold
            ? "border-gold-border/60 hover:shadow-gold"
            : "border-border-subtle hover:border-accent-border hover:shadow-accent"
        )}
        aria-label={`Project: ${project.title}`}
      >
        {/* Media */}
        <div className={cn("relative overflow-hidden min-h-[260px] lg:min-h-[480px]", isReversed && "lg:order-2")}>
          <ProjectMedia
            media={project.media}
            title={project.title}
            priority={project.featured}
            accentVariant={project.accentVariant}
            className="rounded-none h-full"
          />
          {number && (
            <span className="absolute top-4 left-4 flex items-center justify-center w-8 h-8 rounded-md bg-bg-primary/70 backdrop-blur-md border border-border-default font-mono text-xs font-bold text-text-secondary z-10">
              {number}
            </span>
          )}
        </div>

        {/* Content */}
        <div className={cn("flex flex-col gap-5 p-8 lg:p-10", isReversed && "lg:order-1")}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <p className={cn("font-mono text-[11px] font-semibold tracking-widest uppercase", accentText)}>
                {project.studio}
              </p>
              <span className="font-mono text-xs text-text-muted">{project.year}</span>
            </div>
            <div
              className={cn(
                "inline-flex items-center gap-1.5 text-[10px] font-mono font-medium px-2.5 py-1 rounded-full border uppercase tracking-widest mb-4",
                isGold ? "border-gold-border text-gold bg-gold-muted" : "border-accent-border text-accent bg-accent-muted"
              )}
            >
              {project.contextLabel}
            </div>
            <h3 className="text-h2 font-bold text-text-primary">{project.title}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-sm text-text-secondary">{project.role}</span>
              {project.platforms.length > 0 && (
                <>
                  <span className="w-1 h-1 rounded-full bg-text-faint" aria-hidden="true" />
                  <span className="font-mono text-xs text-text-muted">{project.platforms.join(" · ")}</span>
                </>
              )}
            </div>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed">{project.description}</p>

          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <p className="font-mono text-[11px] font-semibold tracking-widest uppercase text-text-muted">
                Key Systems
              </p>
              <span className="flex-1 h-px bg-border-subtle" aria-hidden="true" />
            </div>
            {project.systems.map((system) => (
              <div key={system.name} className="flex gap-3">
                <span className={cn("mt-1.5 w-1.5 h-1.5 rounded-full shrink-0", bulletColor)} aria-hidden="true" />
                <div>
                  <span className="text-sm font-semibold text-text-primary">{system.name}</span>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{system.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.techTags.map((tag) => (
              <Tag key={tag} label={tag} variant={isGold ? "gold" : "default"} />
            ))}
          </div>

          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-1">
              {project.links.map((link) => (
                <Button
                  key={link.label}
                  variant={link.variant === "primary" ? "primary" : "secondary"}
                  size="md"
                  href={link.href}
                  external={link.external}
                  icon={link.external ? <ExternalLink size={14} /> : undefined}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </article>
    </AnimateIn>
  );
}
