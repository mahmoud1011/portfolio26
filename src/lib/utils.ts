import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBasePath(): string {
  return process.env.NODE_ENV === "production" ? "/portfolio" : "";
}

export function withBasePath(path: string): string {
  const base = getBasePath();
  return `${base}${path}`;
}
