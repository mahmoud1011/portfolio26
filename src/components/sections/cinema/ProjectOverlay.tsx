"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { Tag } from "@/components/shared/Tag";
import { cn } from "@/lib/utils";

interface ProjectOverlayProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc to close + lock background scroll while open.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const isGold = project.accentVariant === "gold";

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — case study`}
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 bg-bg-primary/85 backdrop-blur-md animate-[fadeIn_.2s_ease]"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full max-w-4xl my-4 rounded-card-lg overflow-hidden",
          "bg-bg-secondary border border-border-default shadow-card-hover outline-none",
          "animate-[overlayIn_.32s_cubic-bezier(0.16,1,0.3,1)]"
        )}
      >
        {/* Top media */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-elevated">
          {project.media[0] && (
            <Image
              src={project.media.find((m) => m.type === "image")?.src ?? project.media[0].src ?? ""}
              alt={project.media[0].alt}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/20 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-bg-primary/70 border border-border-default text-text-secondary backdrop-blur-md hover:text-text-primary hover:border-accent-border transition-colors"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-4 left-5 right-5">
            <p className={cn("font-mono text-[11px] uppercase tracking-widest mb-2", isGold ? "text-gold" : "text-accent")}>
              {project.contextLabel}
            </p>
            <h2 className="text-h1 font-bold tracking-tight">{project.title}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="text-text-secondary"><span className="text-text-muted">Studio · </span>{project.studio}</span>
            <span className="text-text-secondary"><span className="text-text-muted">Role · </span>{project.role}</span>
            <span className="text-text-secondary"><span className="text-text-muted">Year · </span>{project.year}</span>
            <span className="text-text-secondary"><span className="text-text-muted">Platforms · </span>{project.platforms.join(", ")}</span>
          </div>

          <p className="text-text-secondary leading-relaxed">{project.description}</p>

          {/* Systems */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">Systems &amp; Engineering</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.systems.map((s) => (
                <div key={s.name} className="card-surface border border-border-subtle rounded-md p-4">
                  <p className={cn("text-sm font-semibold mb-1.5", isGold ? "text-gold" : "text-accent")}>{s.name}</p>
                  <p className="text-[13px] text-text-secondary leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Extra media gallery */}
          {project.media.length > 1 && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">Gallery</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.media.slice(1).map((m, i) => (
                  <div key={i} className="relative aspect-video rounded-md overflow-hidden border border-border-subtle bg-bg-elevated">
                    {m.type === "video" ? (
                      <video
                        className="h-full w-full object-cover"
                        muted
                        loop
                        playsInline
                        controls
                        poster={m.poster}
                      >
                        {m.src && <source src={m.src} />}
                      </video>
                    ) : m.youtubeId ? (
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${m.youtubeId}`}
                        title={m.alt}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      m.src && <Image src={m.src} alt={m.alt} fill sizes="(max-width:896px) 100vw, 440px" className="object-cover" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.techTags.map((t) => (
              <Tag key={t} label={t} variant={isGold ? "gold" : "default"} />
            ))}
          </div>

          {/* Links */}
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-semibold transition-all duration-200",
                    l.variant === "primary"
                      ? "bg-accent text-bg-primary hover:bg-accent-hover shadow-accent-sm"
                      : "border border-border-strong text-text-primary hover:border-accent-border hover:text-accent"
                  )}
                >
                  {l.label}
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
