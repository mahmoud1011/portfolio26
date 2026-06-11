import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className="font-mono text-xs font-medium tracking-widest uppercase text-accent mb-3">
          {label}
        </p>
      )}
      <h2
        id={id}
        className="text-h1 font-bold text-text-primary"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-text-secondary leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
