"use client";

import { Tag } from "@/components/shared/Tag";
import { Button } from "@/components/shared/Button";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { HudBrackets } from "@/components/shared/HudBrackets";
import { Stagger } from "@/components/shared/Stagger";
import { ProjectMedia } from "./ProjectMedia";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

/** Index → CSS custom property for stagger ordering. */
const order = (i: number) => ({ "--i": i } as React.CSSProperties);

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
            "group relative flex flex-col h-full overflow-hidden card-surface border rounded-card-lg",
            "transition-all duration-300 hover:-translate-y-1",
            isGold
              ? "border-gold-border/50 hover:shadow-gold"
              : "border-border-subtle hover:border-accent-border hover:shadow-accent"
          )}
          aria-label={`Project: ${project.title}`}
        >
          <HudBrackets accent={project.accentVariant} />
          <div className="relative overflow-hidden">
            <ProjectMedia
              media={project.media}
              title={project.title}
              accentVariant={project.accentVariant}
              className="rounded-none"
            />
            {number && (
              <span className="absolute top-3 left-3 z-20 inline-flex items-center h-6 px-2 rounded-md bg-bg-primary/70 backdrop-blur-md border border-border-default font-mono text-[10px] font-bold tracking-wider text-text-secondary">
                <span className="text-text-muted">SYS_</span>
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

            <Stagger
              step={60}
              className={cn(
                "flex flex-col gap-2.5 border-l-2 pl-3.5",
                isGold ? "border-gold/25" : "border-accent/25"
              )}
            >
              {project.systems.slice(0, 3).map((system, i) => (
                <div key={system.name} className="stagger-item flex gap-2.5" style={order(i)}>
                  <span className={cn("mt-1.5 w-1.5 h-1.5 rounded-full shrink-0", bulletColor)} aria-hidden="true" />
                  <p className="text-xs leading-relaxed">
                    <span className="font-semibold text-text-primary">{system.name}</span>
                    <span className="text-text-muted"> — {system.description}</span>
                  </p>
                </div>
              ))}
            </Stagger>

            <Stagger step={30} base={280} className="flex flex-wrap gap-1.5 pt-0.5">
              {project.techTags.slice(0, 5).map((tag, i) => (
                <Tag key={tag} label={tag} variant={isGold ? "gold" : "default"} className="stagger-item" style={order(i)} />
              ))}
            </Stagger>

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
          "group relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden card-surface border rounded-card-lg",
          "transition-all duration-300",
          isGold
            ? "border-gold-border/60 hover:shadow-gold"
            : "border-border-subtle hover:border-accent-border hover:shadow-accent"
        )}
        aria-label={`Project: ${project.title}`}
      >
        <HudBrackets accent={project.accentVariant} />
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
            <span className="absolute top-4 left-4 inline-flex items-center h-7 px-2.5 rounded-md bg-bg-primary/70 backdrop-blur-md border border-border-default font-mono text-[11px] font-bold tracking-wider text-text-secondary z-20">
              <span className="text-text-muted">SYS_</span>
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

          <Stagger
            step={60}
            className={cn(
              "flex flex-col gap-3.5 border-l-2 pl-4",
              isGold ? "border-gold/25" : "border-accent/25"
            )}
          >
            <div className="flex items-center gap-2.5">
              <p className="font-mono text-[11px] font-semibold tracking-widest uppercase text-text-muted">
                Key Systems
              </p>
              <span className="flex-1 h-px bg-border-subtle" aria-hidden="true" />
            </div>
            {project.systems.map((system, i) => (
              <div key={system.name} className="stagger-item flex gap-3" style={order(i)}>
                <span className={cn("mt-1.5 w-1.5 h-1.5 rounded-full shrink-0", bulletColor)} aria-hidden="true" />
                <div>
                  <span className="text-sm font-semibold text-text-primary">{system.name}</span>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{system.description}</p>
                </div>
              </div>
            ))}
          </Stagger>

          <Stagger step={30} base={320} className="flex flex-wrap gap-1.5">
            {project.techTags.map((tag, i) => (
              <Tag key={tag} label={tag} variant={isGold ? "gold" : "default"} className="stagger-item" style={order(i)} />
            ))}
          </Stagger>

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
