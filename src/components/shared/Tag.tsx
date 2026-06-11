import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  variant?: "default" | "accent" | "gold" | "muted";
  className?: string;
}

const variantStyles = {
  default: "bg-tag-bg border border-tag-border text-tag-text",
  accent: "bg-accent-muted border border-accent-border text-accent",
  gold: "bg-gold-muted border border-gold-border text-gold",
  muted: "bg-transparent border border-border-subtle text-text-muted",
};

export function Tag({ label, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-xs",
        "font-mono text-xs font-medium leading-none",
        "whitespace-nowrap transition-colors duration-150",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
