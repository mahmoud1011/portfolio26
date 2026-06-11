"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { Button } from "@/components/shared/Button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Copy, Check, ExternalLink, Download, Mail } from "lucide-react";

const EMAIL = "mahmoudanwar75888@gmail.com";

function GameControllerIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 12h4M8 10v4" />
      <circle cx="17" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="13" r="1" fill="currentColor" stroke="none" />
      <rect x="2" y="6" width="20" height="12" rx="3" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function ContactSection() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Section
      id="contact"
      ariaLabelledBy="contact-heading"
      className="border-t border-border-subtle"
      style={{ background: "rgba(19,22,30,0.3)" } as React.CSSProperties}
    >
      <Container>
        <div className="max-w-2xl">
          <AnimateIn direction="up">
            <p className="font-mono text-xs font-medium tracking-widest uppercase text-accent mb-4">
              Get in touch
            </p>
            <h2
              id="contact-heading"
              className="text-h1 font-bold text-text-primary mb-3"
            >
              Let&apos;s Talk
            </h2>
            <p className="text-base text-text-secondary leading-relaxed mb-8">
              Open to full-time roles, internships, and freelance contracts.
              Response time under 24 hours.
            </p>
          </AnimateIn>

          {/* Email row */}
          <AnimateIn direction="up" delay={80}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8 p-5 rounded-card bg-bg-elevated border border-border-subtle">
              <a
                href={`mailto:${EMAIL}`}
                className="text-text-primary font-medium hover:text-accent transition-colors duration-200 text-sm sm:text-base focus-visible:outline-none focus-visible:shadow-focus rounded-xs flex-1 break-all"
                aria-label={`Send email to ${EMAIL}`}
              >
                {EMAIL}
              </a>
              <button
                onClick={() => copy(EMAIL)}
                aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
                aria-live="polite"
                className="flex items-center gap-2 px-4 py-2 rounded-xs text-sm font-medium transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:shadow-focus border border-border-strong text-text-secondary hover:text-accent hover:border-accent-border"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-accent" aria-hidden="true" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </AnimateIn>

          {/* Links */}
          <AnimateIn direction="up" delay={160}>
            <div className="flex flex-wrap gap-3" role="list" aria-label="Social and contact links">
              <div role="listitem">
                <Button
                  variant="secondary"
                  size="md"
                  href="https://www.linkedin.com/in/mahmoud-anwar10"
                  external
                  icon={<LinkedInIcon size={15} />}
                  iconPosition="left"
                  aria-label="View LinkedIn profile (opens in new tab)"
                >
                  LinkedIn
                </Button>
              </div>
              <div role="listitem">
                <Button
                  variant="secondary"
                  size="md"
                  href="https://anwar10.itch.io/"
                  external
                  icon={<GameControllerIcon size={15} />}
                  iconPosition="left"
                  aria-label="View games on Itch.io (opens in new tab)"
                >
                  Itch.io
                </Button>
              </div>
              <div role="listitem">
                <Button
                  variant="ghost"
                  size="md"
                  href="/cv/mahmoud-anwar-cv.pdf"
                  external
                  icon={<Download size={15} />}
                  iconPosition="left"
                  aria-label="Download CV as PDF"
                >
                  Download CV
                </Button>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} Mahmoud Anwar
          </p>
          <p className="font-mono text-xs text-text-muted">
            Built with Next.js · Deployed on GitHub Pages
          </p>
        </div>
      </Container>
    </Section>
  );
}
