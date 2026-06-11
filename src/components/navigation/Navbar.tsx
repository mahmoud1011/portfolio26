"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle"
            : "bg-transparent"
        )}
      >
        <div className="max-w-container mx-auto px-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Name */}
            <Link
              href="/"
              className="font-semibold text-text-primary text-sm tracking-tight hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-focus rounded-sm"
              aria-label="Mahmoud Anwar — back to top"
            >
              <span className="text-accent font-mono">MA</span>
              <span className="ml-2 hidden sm:inline">Mahmoud Anwar</span>
            </Link>

            {/* Desktop nav */}
            <nav
              aria-label="Main navigation"
              className="hidden md:flex items-center gap-1"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:shadow-focus"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/cv/mahmoud-anwar-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 px-4 py-2 text-sm font-medium text-accent border border-accent-border rounded-sm hover:bg-accent-muted hover:shadow-accent-sm transition-all duration-200 focus-visible:outline-none focus-visible:shadow-focus"
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
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-sm text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:shadow-focus"
            >
              <span
                className={cn(
                  "block h-px w-6 bg-current transition-transform duration-200",
                  menuOpen && "rotate-45 translate-y-[7px]"
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 bg-current transition-opacity duration-200",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 bg-current transition-transform duration-200",
                  menuOpen && "-rotate-45 -translate-y-[7px]"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        onNavClick={handleNavClick}
      />
    </>
  );
}
