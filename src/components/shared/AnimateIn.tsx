"use client";

import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { type ReactNode, type ElementType } from "react";

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
  as?: ElementType;
}

const directionInitial: Record<string, string> = {
  up: "opacity-0 translate-y-6",
  left: "opacity-0 -translate-x-6",
  right: "opacity-0 translate-x-6",
  none: "opacity-0",
};

const directionVisible = "opacity-100 translate-x-0 translate-y-0";

export function AnimateIn({
  children,
  delay = 0,
  direction = "up",
  className,
  as: Tag = "div",
}: AnimateInProps) {
  const { ref, inView } = useInView({ threshold: 0.08 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const ReducedTag = Tag as React.ElementType;
    return <ReducedTag className={className}>{children}</ReducedTag>;
  }

  const TagEl = Tag as React.ElementType;

  return (
    <TagEl
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(
        "transition-all ease-decelerate",
        inView ? directionVisible : directionInitial[direction],
        className
      )}
      style={{
        transitionDuration: "400ms",
        transitionDelay: inView ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </TagEl>
  );
}
