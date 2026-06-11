import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabelledBy?: string;
  style?: React.CSSProperties;
}

export function Section({ id, children, className, ariaLabelledBy, style }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("py-section", className)}
      style={style}
    >
      {children}
    </section>
  );
}
