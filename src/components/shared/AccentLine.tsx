"use client";

import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * The accent dash used beside section labels, upgraded to draw in
 * (scale-x from 0) when the heading enters the viewport. One micro-signature
 * repeated identically across every section. Decorative only.
 */
export function AccentLine({ className }: { className?: string }) {
  const { ref, inView } = useInView();
  const reducedMotion = useReducedMotion();

  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      aria-hidden="true"
      className={cn(
        "block w-6 h-px bg-accent origin-left transition-transform duration-700 ease-decelerate",
        reducedMotion || inView ? "scale-x-100" : "scale-x-0",
        className
      )}
    />
  );
}
