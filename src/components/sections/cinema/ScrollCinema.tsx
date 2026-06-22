"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, ArrowUpRight, Download, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/Container";
import { Tag } from "@/components/shared/Tag";
import { ProjectOverlay } from "./ProjectOverlay";
import { cinemaBeats, HERO_VIDEO, type CinemaBeat } from "@/content/cinema";
import { projects } from "@/content/projects";
import type { Project } from "@/types";
import { cn, withBasePath } from "@/lib/utils";

const specializations = ["Gameplay Systems", "HDRP Rendering", "AI Architecture", "Console Dev"];

// ── Cinema feel — all tunable without restructuring ────────────────────────
/** Viewport-heights of scroll per beat transition. More = slower, more watchable. */
const SCROLL_PER_BEAT = 2.2;
/** Per-frame easing of the video playhead toward the scroll target (0..1).
 *  Lower = smoother/floatier; higher = snappier. This is what turns a chunky
 *  wheel flick into continuous, framerate-consistent motion. */
const LERP = 0.1;
/** How close (in scroll-progress space) a beat must be before its panel may show.
 *  Beats are ~0.2 apart in progress space. */
const REVEAL_BAND = 0.04;
/** Playhead is "stopped" (transition finished) when within this many seconds of
 *  its target — used to detect that we've truly settled on a keyframe. */
const MOVE_EPS = 0.02;
/** Delay after settling on a beat before its copy fades in (ms). */
const REVEAL_DELAY = 1000;
/** Delay after the whole site has loaded before the video arms (ms). */
const START_DELAY = 1000;

function getProject(beat: CinemaBeat): Project | undefined {
  return beat.projectId ? projects.find((p) => p.id === beat.projectId) : undefined;
}

export function ScrollCinema() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  // Scroll writes the desired video time into targetTimeRef; a rAF loop eases a
  // separate playhead (displayedTimeRef) toward it and seeks the video to that.
  // The easing is what turns a chunky wheel flick into continuous motion, and
  // the `seeking` gate keeps the all-intra video from backing up a seek queue.
  const targetTimeRef = useRef(0);
  const displayedTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  // Mirrors of state for the rAF loop (which can't read fresh React state).
  const armedRef = useRef(false);
  const settledRef = useRef(false);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [overlay, setOverlay] = useState<Project | null>(null);

  const n = cinemaBeats.length;
  const fractions = cinemaBeats.map((b) => b.time / HERO_VIDEO.duration);

  // Decide enhancement (desktop + motion-ok) only on the client.
  useEffect(() => {
    const okMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    setEnhanced(okMotion && wide);
  }, []);

  // Arm the cinema only after the entire site has loaded, then a short delay.
  // Until armed the video stays frozen on its first frame (poster), so nothing
  // moves on load and there is no startup jump.
  useEffect(() => {
    if (!enhanced) return;
    let timer: ReturnType<typeof setTimeout>;
    const arm = () => {
      timer = setTimeout(() => {
        armedRef.current = true;
      }, START_DELAY);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", arm);
      armedRef.current = false;
    };
  }, [enhanced]);

  // Build the pinned, scrubbed, beat-snapped timeline.
  useEffect(() => {
    if (!enhanced || !sectionRef.current || !pinRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const FRAME = 1 / 24; // source is 24fps

    // Smoothing + seek loop. Scroll only writes targetTimeRef; here we ease a
    // separate playhead toward it every frame and seek the (all-intra) video to
    // that eased value. This is what makes a fast wheel flick play out as
    // continuous motion instead of jumping straight to the next keyframe.
    const tick = () => {
      const v = videoRef.current;
      if (v && v.readyState >= 2) {
        if (!armedRef.current) {
          // Not armed yet → hold on the first frame.
          displayedTimeRef.current = 0;
        } else {
          const target = targetTimeRef.current;
          displayedTimeRef.current += (target - displayedTimeRef.current) * LERP;
          const displayed = displayedTimeRef.current;
          if (!v.seeking && Math.abs(v.currentTime - displayed) > FRAME / 2) {
            v.currentTime = displayed;
          }

          // Settle = playhead has caught up to the target (transition finished)
          // AND we're sitting near a beat. Reveal the panel REVEAL_DELAY after
          // that; hide instantly the moment a new transition starts.
          const dur = v.duration || HERO_VIDEO.duration;
          const pDisp = displayed / dur;
          let nearest = 0;
          let best = Infinity;
          fractions.forEach((f, i) => {
            const d = Math.abs(f - pDisp);
            if (d < best) {
              best = d;
              nearest = i;
            }
          });
          const settledNow = Math.abs(target - displayed) < MOVE_EPS && best <= REVEAL_BAND;
          if (settledNow !== settledRef.current) {
            settledRef.current = settledNow;
            if (settledNow) {
              setActive(nearest);
              revealTimerRef.current = setTimeout(() => setRevealed(true), REVEAL_DELAY);
            } else {
              if (revealTimerRef.current) {
                clearTimeout(revealTimerRef.current);
                revealTimerRef.current = null;
              }
              setRevealed(false);
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        // Generous scroll distance so each ~5s beat transition is watchable.
        end: () => "+=" + (n - 1) * SCROLL_PER_BEAT * window.innerHeight,
        pin: pinRef.current!,
        pinSpacing: true,
        // Exact progress tracking; smoothing is done on the playhead in `tick`.
        scrub: true,
        // Gentle, eased settle onto the nearest beat once scrolling stops.
        snap: {
          snapTo: fractions,
          duration: { min: 0.3, max: 0.7 },
          delay: 0.1,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const dur = videoRef.current?.duration ?? HERO_VIDEO.duration;
          targetTimeRef.current = Math.min(self.progress * HERO_VIDEO.duration, dur - 0.05);
        },
      });
      stRef.current = st;
    }, sectionRef);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enhanced, n]);

  // Prime the video so seeking works immediately.
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      try {
        v.currentTime = 0.01;
      } catch {
        /* ignore */
      }
    }
  }, [enhanced]);

  const jumpToBeat = useCallback(
    (i: number) => {
      const st = stRef.current;
      if (!st) return;
      const target = st.start + (st.end - st.start) * fractions[i];
      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [fractions]
  );

  // ── Panel content shared by both modes ────────────────────────────
  const renderPanel = (beat: CinemaBeat, isActive: boolean) => {
    const project = getProject(beat);
    const stagger = (i: number): React.CSSProperties => ({
      transitionDelay: isActive ? `${120 + i * 70}ms` : "0ms",
    });
    const item = (i: number) =>
      cn(
        "transition-all duration-500 ease-decelerate",
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      );

    if (beat.kind === "intro") {
      return (
        <div className="max-w-xl">
          <div className={item(0)} style={stagger(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-border bg-accent-muted mb-6">
              <span className="relative flex w-2 h-2" aria-hidden="true">
                <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-60 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs text-accent tracking-wider uppercase">Available for Opportunities</span>
            </div>
          </div>
          <h1 className={cn("text-display font-bold tracking-tight", item(1))} style={stagger(1)}>
            Mahmoud Anwar
          </h1>
          <p className={cn("text-h2 font-semibold text-accent mt-3", item(2))} style={stagger(2)}>
            Unity Gameplay Programmer
          </p>
          <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-5", item(3))} style={stagger(3)}>
            {specializations.map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                <span className="font-mono text-sm text-text-secondary">{s}</span>
                {i < specializations.length - 1 && <span className="w-1 h-1 rounded-full bg-text-faint" aria-hidden="true" />}
              </span>
            ))}
          </div>
          <div className={cn("flex flex-wrap gap-3 mt-8", item(4))} style={stagger(4)}>
            <button
              onClick={() => jumpToBeat(1)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-sm font-semibold text-base text-bg-primary bg-accent hover:bg-accent-hover transition-all duration-200 shadow-accent-sm hover:shadow-accent"
            >
              Explore Work
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <a
              href={withBasePath("/cv/mahmoud-anwar-cv.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium text-base border border-border-strong text-text-primary hover:border-accent-border hover:text-accent transition-all duration-200"
            >
              Download CV <Download size={16} />
            </a>
          </div>
          {enhanced && (
            <p className={cn("font-mono text-[11px] text-text-muted uppercase tracking-[0.2em] mt-10", item(5))} style={stagger(5)}>
              Scroll to enter ↓
            </p>
          )}
        </div>
      );
    }

    if (beat.kind === "cta") {
      return (
        <div className="max-w-xl">
          <p className={cn("font-mono text-xs uppercase tracking-widest text-accent mb-4", item(0))} style={stagger(0)}>
            End of reel
          </p>
          <h2 className={cn("text-display font-bold tracking-tight", item(1))} style={stagger(1)}>
            Let&apos;s build the next system.
          </h2>
          <p className={cn("text-text-secondary text-lg mt-4 leading-relaxed", item(2))} style={stagger(2)}>
            Gameplay systems, rendering, AI and tools — from prototype to shipped console title.
          </p>
          <div className={cn("flex flex-wrap gap-3 mt-8", item(3))} style={stagger(3)}>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-sm font-semibold text-base text-bg-primary bg-accent hover:bg-accent-hover transition-all duration-200 shadow-accent-sm hover:shadow-accent"
            >
              Get in touch
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium text-base border border-border-strong text-text-primary hover:border-accent-border hover:text-accent transition-all duration-200"
            >
              All projects <Layers size={16} />
            </button>
          </div>
        </div>
      );
    }

    // project beat
    if (!project) return null;
    const isGold = project.accentVariant === "gold";
    const tagline = project.description.split(". ")[0] + ".";
    const primaryLink = project.links.find((l) => l.variant === "primary") ?? project.links[0];
    return (
      <div className="max-w-xl">
        <p className={cn("font-mono text-[11px] uppercase tracking-widest mb-3", isGold ? "text-gold" : "text-accent", item(0))} style={stagger(0)}>
          {project.contextLabel}
        </p>
        <h2 className={cn("text-display font-bold tracking-tight leading-[1.02]", item(1))} style={stagger(1)}>
          {project.title}
        </h2>
        <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-text-secondary", item(2))} style={stagger(2)}>
          <span className="font-semibold text-text-primary">{project.studio}</span>
          <span className="w-1 h-1 rounded-full bg-text-faint" aria-hidden="true" />
          <span>{project.role}</span>
          <span className="w-1 h-1 rounded-full bg-text-faint" aria-hidden="true" />
          <span>{project.year}</span>
        </div>
        <p className={cn("text-text-secondary text-lg mt-5 leading-relaxed", item(3))} style={stagger(3)}>
          {tagline}
        </p>
        <div className={cn("flex flex-wrap gap-2 mt-5", item(4))} style={stagger(4)}>
          {project.techTags.slice(0, 6).map((t) => (
            <Tag key={t} label={t} variant={isGold ? "gold" : "default"} />
          ))}
        </div>
        <div className={cn("flex flex-wrap gap-3 mt-8", item(5))} style={stagger(5)}>
          <button
            onClick={() => setOverlay(project)}
            className={cn(
              "group inline-flex items-center gap-2 px-6 py-3 rounded-sm font-semibold text-base transition-all duration-200",
              isGold
                ? "bg-gold text-bg-primary hover:brightness-110 shadow-gold-sm"
                : "bg-accent text-bg-primary hover:bg-accent-hover shadow-accent-sm hover:shadow-accent"
            )}
          >
            View case study
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
          {primaryLink && (
            <a
              href={primaryLink.href}
              target={primaryLink.external ? "_blank" : undefined}
              rel={primaryLink.external ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium text-base border border-border-strong text-text-primary hover:border-accent-border hover:text-accent transition-all duration-200"
            >
              {primaryLink.label} <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    );
  };

  // ── CINEMA (enhanced) layout ──────────────────────────────────────
  if (enhanced) {
    return (
      <section ref={sectionRef} id="cinema" aria-label="Featured work" className="relative">
        <div ref={pinRef} className="relative h-[100svh] w-full overflow-hidden">
          {/* video */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-right"
            muted
            playsInline
            preload="auto"
            poster={HERO_VIDEO.poster}
          >
            <source src={HERO_VIDEO.mp4} type="video/mp4" />
          </video>

          {/* scrims */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #0D0F14 0%, rgba(13,15,20,0.92) 30%, rgba(13,15,20,0.5) 58%, rgba(13,15,20,0.2) 100%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(13,15,20,0.5) 0%, transparent 25%, transparent 72%, #0D0F14 100%)" }}
          />

          {/* panels */}
          <Container className="relative z-10 h-full">
            <div className="relative h-full flex items-center">
              {cinemaBeats.map((beat, i) => {
                // A panel is "live" only when its beat is the active one AND the
                // scroll has settled near that keyframe — between beats every
                // panel is hidden so only the video shows.
                const isLive = i === active && revealed;
                return (
                  <div
                    key={beat.id}
                    className={cn(
                      "absolute inset-y-0 left-0 right-0 flex items-center",
                      isLive ? "pointer-events-auto" : "pointer-events-none"
                    )}
                    aria-hidden={!isLive}
                  >
                    {renderPanel(beat, isLive)}
                  </div>
                );
              })}
            </div>
          </Container>

          {/* beat indicator */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
            {cinemaBeats.map((beat, i) => (
              <button
                key={beat.id}
                onClick={() => jumpToBeat(i)}
                aria-label={`Go to ${beat.id}`}
                className="group flex items-center gap-2"
              >
                <span
                  className={cn(
                    "block rounded-full transition-all duration-300",
                    i === active ? "w-2.5 h-2.5 bg-accent" : "w-1.5 h-1.5 bg-text-muted group-hover:bg-text-secondary"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <ProjectOverlay project={overlay} onClose={() => setOverlay(null)} />
      </section>
    );
  }

  // ── STATIC fallback (mobile / reduced-motion / no-JS SSR) ─────────
  return (
    <section id="cinema" aria-label="Featured work" className="relative">
      {cinemaBeats.map((beat, i) => (
        <div key={beat.id} className="relative min-h-[88svh] flex items-center overflow-hidden border-b border-border-subtle">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_VIDEO.poster} alt="" className="absolute inset-0 h-full w-full object-cover object-right opacity-60" aria-hidden="true" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0D0F14 0%, rgba(13,15,20,0.9) 45%, rgba(13,15,20,0.4) 100%)" }} />
          <Container className="relative z-10 py-20">{renderPanel(beat, true)}</Container>
        </div>
      ))}
      <ProjectOverlay project={overlay} onClose={() => setOverlay(null)} />
    </section>
  );
}
