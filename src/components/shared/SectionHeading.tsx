import { cn } from "@/lib/utils";
import { AccentLine } from "./AccentLine";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 lg:mb-14", align === "center" && "text-center mx-auto", className)}>
      {label && (
        <div className={cn("flex items-center gap-2.5 mb-4", align === "center" && "justify-center")}>
          <AccentLine />
          <p className="font-mono text-xs font-medium tracking-widest uppercase text-accent">
            {label}
          </p>
        </div>
      )}
      <h2 id={id} className="text-h1 font-bold text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-base text-text-secondary leading-relaxed max-w-2xl", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
