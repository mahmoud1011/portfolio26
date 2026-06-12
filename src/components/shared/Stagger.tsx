"use client";

import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { type CSSProperties, type ElementType, type ReactNode } from "react";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** ms between each child's reveal. */
  step?: number;
  /** ms before the first child reveals (lets the parent card land first). */
  base?: number;
  as?: ElementType;
}

/**
 * Sequenced child reveal driven by ONE IntersectionObserver and pure CSS.
 *
 * Children opt in with `className="stagger-item"` and an index via
 * `style={{ "--i": n }}`. Timing lives in two custom properties
 * (`--stagger-base`, `--stagger-step`) so the cascade is data, not markup.
 *
 * Mirrors AnimateIn's contract: under prefers-reduced-motion the group class
 * is omitted entirely, so children render fully visible with no transition.
 */
export function Stagger({
  children,
  className,
  step = 50,
  base = 120,
  as: Tag = "div",
}: StaggerProps) {
  const { ref, inView } = useInView();
  const reducedMotion = useReducedMotion();
  const TagEl = Tag as ElementType;

  if (reducedMotion) {
    return <TagEl className={className}>{children}</TagEl>;
  }

  return (
    <TagEl
      ref={ref as React.Ref<HTMLDivElement>}
      data-inview={inView ? "true" : undefined}
      className={cn("stagger-group", className)}
      style={
        {
          "--stagger-step": `${step}ms`,
          "--stagger-base": `${base}ms`,
        } as CSSProperties
      }
    >
      {children}
    </TagEl>
  );
}
