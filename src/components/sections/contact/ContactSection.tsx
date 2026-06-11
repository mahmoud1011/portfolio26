"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { withBasePath } from "@/lib/utils";
import { Copy, Check, Download } from "lucide-react";

const EMAIL = "mahmoudanwar75888@gmail.com";

function GameControllerIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 12h4M8 10v4" />
      <circle cx="17" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="13" r="1" fill="currentColor" stroke="none" />
      <rect x="2" y="6" width="20" height="12" rx="3" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function ContactSection() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Section id="contact" ariaLabelledBy="contact-heading" className="relative border-t border-border-subtle overflow-hidden">
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-[0.05] blur-[120px]" style={{ background: "radial-gradient(circle, #00D4AA 0%, transparent 70%)" }} />
      </div>

      <Container className="relative z-10">
        <AnimateIn direction="up">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <span className="w-6 h-px bg-accent" aria-hidden="true" />
              <p className="font-mono text-xs font-medium tracking-widest uppercase text-accent">Get in touch</p>
              <span className="w-6 h-px bg-accent" aria-hidden="true" />
            </div>
            <h2 id="contact-heading" className="text-h1 font-bold text-text-primary mb-4">
              Let&apos;s build something great
            </h2>
            <p className="text-base text-text-secondary leading-relaxed mb-10 max-w-lg mx-auto">
              Open to full-time studio roles, internships, and freelance contracts. I usually reply within a day.
            </p>
          </div>
        </AnimateIn>

        {/* Email card */}
        <AnimateIn direction="up" delay={80}>
          <div className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-2 pl-5 rounded-card card-surface border border-border-default">
              <a
                href={`mailto:${EMAIL}`}
                className="flex-1 text-text-primary font-medium hover:text-accent transition-colors duration-200 text-sm sm:text-base focus-visible:outline-none focus-visible:shadow-focus rounded-xs break-all py-2 sm:py-0"
                aria-label={`Send email to ${EMAIL}`}
              >
                {EMAIL}
              </a>
              <button
                onClick={() => copy(EMAIL)}
                aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
                aria-live="polite"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm text-sm font-medium transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:shadow-focus bg-accent text-bg-primary hover:bg-accent-hover shadow-accent-sm hover:shadow-accent"
              >
                {copied ? (<><Check size={14} aria-hidden="true" /><span>Copied</span></>) : (<><Copy size={14} aria-hidden="true" /><span>Copy</span></>)}
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6" role="list" aria-label="Social and contact links">
              <a role="listitem" href="https://www.linkedin.com/in/mahmoud-anwar10" target="_blank" rel="noopener noreferrer" aria-label="View LinkedIn profile (opens in new tab)"
                 className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-sm border border-border-strong text-text-secondary hover:text-accent hover:border-accent-border hover:bg-accent-muted transition-all duration-200 focus-visible:outline-none focus-visible:shadow-focus">
                <LinkedInIcon size={15} /> LinkedIn
              </a>
              <a role="listitem" href="https://anwar10.itch.io/" target="_blank" rel="noopener noreferrer" aria-label="View games on Itch.io (opens in new tab)"
                 className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-sm border border-border-strong text-text-secondary hover:text-accent hover:border-accent-border hover:bg-accent-muted transition-all duration-200 focus-visible:outline-none focus-visible:shadow-focus">
                <GameControllerIcon size={15} /> Itch.io
              </a>
              <a role="listitem" href={withBasePath("/cv/mahmoud-anwar-cv.pdf")} target="_blank" rel="noopener noreferrer" aria-label="Download CV as PDF"
                 className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-all duration-200 focus-visible:outline-none focus-visible:shadow-focus">
                <Download size={15} /> Download CV
              </a>
            </div>
          </div>
        </AnimateIn>

        {/* Footer */}
        <div className="mt-20 pt-7 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-md bg-accent-muted border border-accent-border font-mono text-[10px] font-bold text-accent">MA</span>
            <p className="font-mono text-xs text-text-muted">© {new Date().getFullYear()} Mahmoud Anwar</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
