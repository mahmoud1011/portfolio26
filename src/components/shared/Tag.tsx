import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  variant?: "default" | "accent" | "gold" | "muted";
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles = {
  default: "bg-tag-bg border-tag-border text-tag-text hover:border-border-strong hover:text-text-secondary",
  accent: "bg-accent-muted border-accent-border text-accent",
  gold: "bg-gold-muted border-gold-border text-gold",
  muted: "bg-transparent border-border-subtle text-text-muted",
};

export function Tag({ label, variant = "default", className, style }: TagProps) {
  return (
    <span
      style={style}
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-sm border",
        "font-mono text-xs font-medium leading-none",
        "whitespace-nowrap transition-colors duration-200",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
