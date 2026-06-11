import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

const variantStyles = {
  primary:
    "bg-accent text-bg-primary font-semibold hover:bg-accent-hover shadow-accent-sm hover:shadow-accent",
  secondary:
    "bg-transparent border border-border-strong text-text-primary hover:border-accent hover:text-accent hover:shadow-accent-sm",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-elevated",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  icon,
  iconPosition = "right",
  children,
  onClick,
  disabled,
  className,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-sm font-medium",
    "transition-all duration-250 ease-standard",
    "focus-visible:outline-none focus-visible:shadow-focus",
    "disabled:opacity-40 disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
