import { Container } from "@/components/layout/Container";

/**
 * On-brand transition band between the pinned scroll-cinema and the
 * rest of the portfolio. Matches the HUD / console aesthetic.
 */
export function CinemaSeparator() {
  return (
    <div className="relative overflow-hidden border-y border-border-subtle bg-bg-secondary">
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #00D4AA 1px, transparent 1px), linear-gradient(to bottom, #00D4AA 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 60% 100% at 50% 50%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 100% at 50% 50%, black, transparent 80%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative z-10 py-14">
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border-strong" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted whitespace-nowrap">
            // the engineer behind the systems
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border-strong" aria-hidden="true" />
        </div>
      </Container>
    </div>
  );
}
