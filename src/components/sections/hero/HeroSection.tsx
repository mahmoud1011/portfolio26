"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/shared/Button";
import { HeroVideo } from "./HeroVideo";
import { cn, withBasePath } from "@/lib/utils";
import { ArrowRight, Download, MapPin } from "lucide-react";

const specializations = [
  "Gameplay Systems",
  "HDRP Rendering",
  "AI Architecture",
  "Console Dev",
];

const stats = [
  { value: "1", label: "Shipped console title" },
  { value: "4", label: "Production studios" },
  { value: "3+", label: "Years building systems" },
];

function scrollToProjects() {
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const reveal = () =>
    cn(
      "transition-all duration-700 ease-decelerate",
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    );

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Full-bleed cinematic background video (assemble → Rust → Torum → RYDER → resolve) */}
      <HeroVideo />

      <Container className="relative z-10 pt-28 pb-20">
        <div className="max-w-2xl">
          {/* Status badge */}
          <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-border bg-accent-muted mb-7", reveal())}>
            <span className="relative flex w-2 h-2" aria-hidden="true">
              <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-xs text-accent tracking-wider uppercase">
              Available for Opportunities
            </span>
          </div>

          <h1 className={cn("text-display font-bold tracking-tight", reveal())} style={{ transitionDelay: "60ms" }}>
            Mahmoud Anwar
          </h1>

          <p className={cn("text-h2 font-semibold text-accent mt-3", reveal())} style={{ transitionDelay: "120ms" }}>
            Unity Gameplay Programmer
          </p>

          {/* Specializations */}
          <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-5", reveal())} style={{ transitionDelay: "180ms" }} aria-label="Specializations">
            {specializations.map((spec, i) => (
              <span key={spec} className="flex items-center gap-3">
                <span className="font-mono text-sm text-text-secondary">{spec}</span>
                {i < specializations.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-text-faint" aria-hidden="true" />
                )}
              </span>
            ))}
          </div>

          {/* Credibility anchor */}
          <div className={cn("flex flex-wrap items-center gap-3 mt-7 mb-9", reveal())} style={{ transitionDelay: "240ms" }}>
            <span className="font-mono text-[11px] text-text-muted uppercase tracking-widest">
              Previously shipped at
            </span>
            <div className="inline-flex items-center gap-2.5 pl-3 pr-3.5 py-2 rounded-md border border-gold-border bg-gold-muted shadow-gold-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
              <span className="text-sm font-bold text-gold tracking-tight">DOUBLE ELEVEN</span>
              <span className="w-px h-3.5 bg-gold-dim/40" aria-hidden="true" />
              <span className="text-sm text-gold/85 font-medium">Rust: Console Edition</span>
            </div>
          </div>

          {/* CTAs */}
          <div className={cn("flex flex-wrap gap-3", reveal())} style={{ transitionDelay: "300ms" }}>
            <button
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-sm font-semibold text-base text-bg-primary bg-accent hover:bg-accent-hover transition-all duration-200 ease-standard focus-visible:outline-none focus-visible:shadow-focus shadow-accent-sm hover:shadow-accent"
            >
              View Projects
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <Button variant="secondary" size="lg" href={withBasePath("/cv/mahmoud-anwar-cv.pdf")} external icon={<Download size={16} />} iconPosition="right">
              Download CV
            </Button>
          </div>

          {/* Stats + location strip */}
          <div className={cn("flex flex-wrap items-end gap-x-8 gap-y-4 mt-12", reveal())} style={{ transitionDelay: "360ms" }}>
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-mono text-2xl font-bold text-accent leading-none">{s.value}</p>
                <p className="text-xs text-text-secondary mt-1.5">{s.label}</p>
              </div>
            ))}
            <div className="flex items-center gap-2 text-text-secondary">
              <MapPin size={15} className="text-accent" aria-hidden="true" />
              <span className="text-xs">
                <span className="text-text-primary font-semibold">Kuala Lumpur</span>
                <span className="text-text-muted"> · Open to remote &amp; relocation</span>
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll hint */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-40 hidden sm:flex" aria-hidden="true">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-text-muted" />
        <span className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em]">Scroll</span>
      </div>
    </section>
  );
}
