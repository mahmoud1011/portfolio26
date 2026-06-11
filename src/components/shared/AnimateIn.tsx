"use client";

import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { type ReactNode, type ElementType } from "react";

interface AnimateInProps {
  children: ReactNode;
  /** Stagger offset in ms. Applied only on entrance. */
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
  as?: ElementType;
}

const hiddenByDirection: Record<string, string> = {
  up: "opacity-0 translate-y-5",
  left: "opacity-0 -translate-x-5",
  right: "opacity-0 translate-x-5",
  none: "opacity-0",
};

const shown = "opacity-100 translate-x-0 translate-y-0";

export function AnimateIn({
  children,
  delay = 0,
  direction = "up",
  className,
  as: Tag = "div",
}: AnimateInProps) {
  const { ref, inView } = useInView();
  const reducedMotion = useReducedMotion();
  const TagEl = Tag as ElementType;

  // Reduced motion: render fully visible, no transform, no transition.
  if (reducedMotion) {
    return <TagEl className={className}>{children}</TagEl>;
  }

  return (
    <TagEl
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-decelerate motion-reduce:transition-none",
        inView ? shown : hiddenByDirection[direction],
        className
      )}
      style={{
        // Delay only applies while entering; once revealed it stays put.
        transitionDelay: inView ? `${delay}ms` : "0ms",
        willChange: inView ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </TagEl>
  );
}
