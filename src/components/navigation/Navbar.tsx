"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn, withBasePath } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-standard",
          scrolled
            ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border-subtle"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-container mx-auto px-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo mark */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:shadow-focus"
              aria-label="Mahmoud Anwar — back to top"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-accent-muted border border-accent-border font-mono text-xs font-bold text-accent transition-all duration-200 group-hover:shadow-accent-sm">
                MA
              </span>
              <span className="hidden sm:inline font-semibold text-text-primary text-sm tracking-tight transition-colors group-hover:text-accent">
                Mahmoud Anwar
              </span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = active === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative px-3.5 py-2 text-sm transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:shadow-focus",
                      isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-accent transition-all duration-300 ease-standard",
                        isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                      )}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
              <a
                href={withBasePath("/cv/mahmoud-anwar-cv.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-bg-primary bg-accent rounded-sm hover:bg-accent-hover transition-all duration-200 shadow-accent-sm hover:shadow-accent focus-visible:outline-none focus-visible:shadow-focus"
              >
                Download CV
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 rounded-sm text-text-primary hover:text-accent transition-colors focus-visible:outline-none focus-visible:shadow-focus"
            >
              <span className={cn("block h-px w-6 bg-current transition-transform duration-200", menuOpen && "rotate-45 translate-y-[7px]")} />
              <span className={cn("block h-px w-6 bg-current transition-opacity duration-200", menuOpen && "opacity-0")} />
              <span className={cn("block h-px w-6 bg-current transition-transform duration-200", menuOpen && "-rotate-45 -translate-y-[7px]")} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} onNavClick={handleNavClick} />
    </>
  );
}
