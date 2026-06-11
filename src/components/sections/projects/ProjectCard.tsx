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
}

export function ProjectCard({ project, index, layout = "half" }: ProjectCardProps) {
  const isGold = project.accentVariant === "gold";
  const accentColor = isGold ? "text-gold" : "text-accent";
  const accentBorder = isGold ? "border-gold-border" : "border-accent-border";
  const accentBg = isGold ? "bg-gold-muted" : "bg-accent-muted";

  if (layout === "half") {
    return (
      <AnimateIn delay={index * 60} direction="up">
        <article
          className={cn(
            "group flex flex-col h-full",
            "bg-bg-secondary border rounded-card overflow-hidden",
            "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
            isGold ? "border-gold-border/50 hover:shadow-gold" : "border-border-subtle hover:shadow-accent hover:border-accent-border"
          )}
          aria-label={`Project: ${project.title}`}
        >
          {/* Media */}
          <div className="overflow-hidden">
            <ProjectMedia
              media={project.media}
              title={project.title}
              accentVariant={project.accentVariant}
              className="rounded-none"
            />
          </div>

          <div className="flex flex-col flex-1 p-6 gap-4">
            {/* Meta */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className={cn("font-mono text-[11px] font-medium tracking-widest uppercase", accentColor)}>
                  {project.studio}
                </p>
                <span className="font-mono text-xs text-text-muted">{project.year}</span>
              </div>
              <h3 className="text-h3 font-bold text-text-primary">{project.title}</h3>
              <p className="text-xs text-text-secondary mt-1">{project.role}</p>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary leading-relaxed">
              {project.description}
            </p>

            {/* Systems */}
            <div className="flex flex-col gap-2">
              {project.systems.slice(0, 3).map((system) => (
                <div key={system.name} className="flex gap-2">
                  <span
                    className={cn("mt-1.5 w-1.5 h-1.5 rounded-full shrink-0", accentColor.replace("text-", "bg-"))}
                    aria-hidden="true"
                  />
                  <div>
                    <span className="text-xs font-semibold text-text-primary">{system.name}</span>
                    <span className="text-xs text-text-muted"> — {system.description}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.techTags.slice(0, 5).map((tag) => (
                <Tag key={tag} label={tag} variant={isGold ? "gold" : "default"} />
              ))}
            </div>

            {/* Links */}
            {project.links.length > 0 && (
              <div className="mt-auto pt-2 flex gap-3">
                {project.links.map((link) => (
                  <Button
                    key={link.label}
                    variant={link.variant === "primary" ? "primary" : "secondary"}
                    size="sm"
                    href={link.href}
                    external={link.external}
                    icon={link.external ? <ExternalLink size={12} /> : undefined}
                    iconPosition="right"
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

  // Full-width layout (featured + RYDER)
  const isReversed = layout === "full-right";

  return (
    <AnimateIn delay={index * 60} direction="up">
      <article
        className={cn(
          "group grid grid-cols-1 lg:grid-cols-2 gap-0",
          "bg-bg-secondary border rounded-card-lg overflow-hidden",
          "transition-all duration-300 hover:shadow-card-hover",
          isGold
            ? "border-gold-border/60 hover:shadow-gold"
            : "border-border-subtle hover:border-accent-border hover:shadow-accent"
        )}
        aria-label={`Project: ${project.title}`}
      >
        {/* Media — order changes on desktop for reversed layout */}
        <div
          className={cn(
            "relative overflow-hidden",
            isReversed && "lg:order-2"
          )}
        >
          <ProjectMedia
            media={project.media}
            title={project.title}
            priority={project.featured}
            accentVariant={project.accentVariant}
            className="rounded-none h-full min-h-[240px] lg:min-h-full"
          />
        </div>

        {/* Content */}
        <div
          className={cn(
            "flex flex-col gap-5 p-8 lg:p-10",
            isReversed && "lg:order-1"
          )}
        >
          {/* Context label */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className={cn("font-mono text-[11px] font-semibold tracking-widest uppercase", accentColor)}>
                {project.studio}
              </p>
              <span className="font-mono text-xs text-text-muted">{project.year}</span>
            </div>
            <div
              className={cn(
                "inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border uppercase tracking-widest mb-3",
                isGold ? "border-gold-border text-gold bg-gold-muted" : "border-accent-border text-accent bg-accent-muted"
              )}
            >
              {project.contextLabel}
            </div>
            <h3 className="text-h2 font-bold text-text-primary">{project.title}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="text-sm text-text-secondary">{project.role}</span>
              {project.platforms.length > 0 && (
                <>
                  <span className="text-text-muted" aria-hidden="true">·</span>
                  <span className="font-mono text-xs text-text-muted">
                    {project.platforms.join(" · ")}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed">
            {project.description}
          </p>

          {/* Systems */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] font-semibold tracking-widest uppercase text-text-muted">
              Key Systems
            </p>
            {project.systems.map((system) => (
              <div key={system.name} className="flex gap-3">
                <span
                  className={cn("mt-2 w-1.5 h-1.5 rounded-full shrink-0", accentColor.replace("text-", "bg-"))}
                  aria-hidden="true"
                />
                <div>
                  <span className="text-sm font-semibold text-text-primary">{system.name}</span>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{system.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.techTags.map((tag) => (
              <Tag key={tag} label={tag} variant={isGold ? "gold" : "default"} />
            ))}
          </div>

          {/* Links */}
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
                  iconPosition="right"
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
