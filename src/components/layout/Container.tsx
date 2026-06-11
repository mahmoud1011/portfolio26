import { cn } from "@/lib/utils";
import { type ReactNode, type ElementType } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("w-full max-w-container mx-auto px-container", className)}>
      {children}
    </Tag>
  );
}
