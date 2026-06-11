"use client";

import { useEffect, useRef } from "react";
import { cn, withBasePath } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function MobileMenu({ isOpen, onClose, links, onNavClick }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstFocusable = menuRef.current.querySelector<HTMLElement>(
        "a, button, [tabindex]:not([tabindex='-1'])"
      );
      firstFocusable?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-bg-primary/80 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-72 bg-bg-secondary border-l border-border-subtle",
          "flex flex-col pt-20 pb-8 px-6",
          "transition-transform duration-300 ease-decelerate md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => onNavClick(e, link.href)}
              tabIndex={isOpen ? 0 : -1}
              className={cn(
                "px-4 py-3 text-base text-text-secondary hover:text-text-primary",
                "hover:bg-bg-elevated rounded-sm transition-all duration-150",
                "focus-visible:outline-none focus-visible:shadow-focus",
                "border-b border-border-subtle last:border-0"
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-border-subtle flex flex-col gap-3">
          <a
            href={withBasePath("/cv/mahmoud-anwar-cv.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isOpen ? 0 : -1}
            className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-accent border border-accent-border rounded-sm hover:bg-accent-muted transition-all duration-150 focus-visible:outline-none focus-visible:shadow-focus"
          >
            Download CV
          </a>
        </div>
      </div>
    </>
  );
}
