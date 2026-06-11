"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";
import { ArrowRight, Download } from "lucide-react";

const specializations = [
  "Gameplay Systems",
  "HDRP Rendering",
  "AI Architecture",
  "Console Development",
];

function StatusBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-border bg-accent-muted mb-8">
      <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
      <span className="font-mono text-xs text-accent tracking-wider uppercase">
        Available for Opportunities
      </span>
    </div>
  );
}

function CredibilityAnchor() {
  return (
    <div className="flex flex-wrap items-center gap-3 mt-6 mb-8">
      <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
        Previously shipped at
      </span>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xs border border-gold-border bg-gold-muted">
        <span className="text-sm font-bold text-gold tracking-tight">
          DOUBLE ELEVEN
        </span>
        <span className="text-text-muted text-sm" aria-hidden="true">·</span>
        <span className="text-sm text-gold font-medium opacity-80">
          Rust: Console Edition
        </span>
      </div>
    </div>
  );
}

function scrollToProjects() {
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[100svh] flex items-center"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00D4AA 1px, transparent 1px), linear-gradient(to bottom, #00D4AA 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, #0D0F14 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.04] blur-[120px]"
          style={{ background: "radial-gradient(circle, #00D4AA 0%, transparent 70%)" }}
        />
      </div>

      <Container className="relative z-10 pt-24 pb-16">
        <div
          className={cn(
            "max-w-3xl transition-all duration-700 ease-decelerate",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <StatusBadge />

          <h1 className="text-display font-bold text-text-primary">
            Mahmoud Anwar
          </h1>

          <p
            className={cn(
              "text-h2 font-semibold text-accent mt-2 transition-all duration-700 ease-decelerate",
              mounted ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            Unity Gameplay Programmer
          </p>

          <div
            className={cn(
              "flex flex-wrap gap-x-4 gap-y-1 mt-4 transition-all duration-700 ease-decelerate",
              mounted ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "150ms" }}
            aria-label="Specializations"
          >
            {specializations.map((spec, i) => (
              <span key={spec} className="flex items-center gap-2">
                <span className="font-mono text-sm text-text-secondary">{spec}</span>
                {i < specializations.length - 1 && (
                  <span className="text-text-muted text-xs" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>

          <CredibilityAnchor />

          <div
            className={cn(
              "flex flex-wrap gap-3 transition-all duration-700 ease-decelerate",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "250ms" }}
          >
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xs font-semibold text-base text-bg-primary bg-accent hover:bg-accent-hover transition-all duration-250 ease-standard focus-visible:outline-none focus-visible:shadow-focus shadow-accent-sm hover:shadow-accent"
            >
              View Projects
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <Button
              variant="secondary"
              size="lg"
              href="/cv/mahmoud-anwar-cv.pdf"
              external
              icon={<Download size={16} />}
              iconPosition="right"
            >
              Download CV
            </Button>
          </div>
        </div>
      </Container>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-text-muted" />
        <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
          Scroll
        </span>
      </div>
    </section>
  );
}
