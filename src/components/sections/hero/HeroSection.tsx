"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";
import { ArrowRight, Download } from "lucide-react";

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

  const reveal = (delay: number) =>
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
      {/* Background system */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00D4AA 1px, transparent 1px), linear-gradient(to bottom, #00D4AA 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
          }}
        />
        <div
          className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px]"
          style={{ background: "radial-gradient(circle, #00D4AA 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[120px]"
          style={{ background: "radial-gradient(circle, #F5B23A 0%, transparent 70%)" }}
        />
      </div>

      <Container className="relative z-10 pt-28 pb-20">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          {/* ── Left: content ── */}
          <div>
            {/* Status badge */}
            <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-border bg-accent-muted mb-7", reveal(0))}>
              <span className="relative flex w-2 h-2" aria-hidden="true">
                <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-60 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs text-accent tracking-wider uppercase">
                Available for Opportunities
              </span>
            </div>

            <h1 className={cn("text-display font-bold tracking-tight", reveal(0))} style={{ transitionDelay: "60ms" }}>
              Mahmoud Anwar
            </h1>

            <p className={cn("text-h2 font-semibold text-accent mt-3", reveal(0))} style={{ transitionDelay: "120ms" }}>
              Unity Gameplay Programmer
            </p>

            {/* Specializations */}
            <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-5", reveal(0))} style={{ transitionDelay: "180ms" }} aria-label="Specializations">
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
            <div className={cn("flex flex-wrap items-center gap-3 mt-7 mb-9", reveal(0))} style={{ transitionDelay: "240ms" }}>
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
            <div className={cn("flex flex-wrap gap-3", reveal(0))} style={{ transitionDelay: "300ms" }}>
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-sm font-semibold text-base text-bg-primary bg-accent hover:bg-accent-hover transition-all duration-200 ease-standard focus-visible:outline-none focus-visible:shadow-focus shadow-accent-sm hover:shadow-accent"
              >
                View Projects
                <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              <Button variant="secondary" size="lg" href="/cv/mahmoud-anwar-cv.pdf" external icon={<Download size={16} />} iconPosition="right">
                Download CV
              </Button>
            </div>
          </div>

          {/* ── Right: visual ── */}
          <div className={cn("relative hidden lg:block", "transition-all duration-1000 ease-decelerate", mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{ transitionDelay: "200ms" }}>
            <div className="relative mx-auto w-full max-w-sm">
              {/* Portrait card */}
              <div className="relative rounded-card-lg overflow-hidden border border-border-default shadow-card-hover">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/profile/mahmoud.jpg"
                    alt="Mahmoud Anwar"
                    fill
                    priority
                    sizes="(max-width: 1024px) 0px, 400px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/10 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-card-lg" aria-hidden="true" />
                </div>

                {/* Floating role chip */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5 px-3.5 py-3 rounded-md bg-bg-primary/70 backdrop-blur-md border border-border-default">
                  <span className="flex items-center justify-center w-8 h-8 rounded-sm bg-accent-muted border border-accent-border font-mono text-[11px] font-bold text-accent shrink-0">
                    KL
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-text-primary truncate">Based in Kuala Lumpur</p>
                    <p className="text-[11px] text-text-secondary truncate">Open to remote & relocation</p>
                  </div>
                </div>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {stats.map((s) => (
                  <div key={s.label} className="card-surface border border-border-subtle rounded-md px-3 py-3 text-center">
                    <p className="font-mono text-xl font-bold text-accent leading-none">{s.value}</p>
                    <p className="text-[10px] text-text-muted leading-tight mt-1.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Decorative accent corner */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-accent/30 rounded-tr-lg" aria-hidden="true" />
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
