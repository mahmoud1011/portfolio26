import { cn } from "@/lib/utils";

type Corner = "tl" | "tr" | "bl" | "br";

/**
 * Per-corner placement, border sides, and the outward "resting" offset.
 * Brackets start displaced outward and converge into the corners on
 * hover/focus — like a selection gizmo locking onto an object.
 */
const CORNER: Record<Corner, string> = {
  tl: "top-2.5 left-2.5 border-t-[1.5px] border-l-[1.5px] rounded-tl-[3px] -translate-x-1 -translate-y-1",
  tr: "top-2.5 right-2.5 border-t-[1.5px] border-r-[1.5px] rounded-tr-[3px] translate-x-1 -translate-y-1",
  bl: "bottom-2.5 left-2.5 border-b-[1.5px] border-l-[1.5px] rounded-bl-[3px] -translate-x-1 translate-y-1",
  br: "bottom-2.5 right-2.5 border-b-[1.5px] border-r-[1.5px] rounded-br-[3px] translate-x-1 translate-y-1",
};

interface HudBracketsProps {
  accent?: "teal" | "gold";
  className?: string;
}

/**
 * Targeting-bracket overlay — the portfolio's HUD motif, the interactive
 * counterpart to the static accent corners on the hero and About portrait.
 *
 * Requires a `group` + `relative` parent. Reveals on hover AND on keyboard
 * focus within the card (focus parity). Purely decorative: aria-hidden,
 * pointer-events disabled, compositor-only transitions (opacity/transform).
 */
export function HudBrackets({ accent = "teal", className }: HudBracketsProps) {
  return (
    <span
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
      aria-hidden="true"
    >
      {(Object.keys(CORNER) as Corner[]).map((corner) => (
        <span
          key={corner}
          className={cn(
            "absolute w-3.5 h-3.5 opacity-0 transition-all duration-300 ease-decelerate",
            "group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0",
            "group-focus-within:opacity-100 group-focus-within:translate-x-0 group-focus-within:translate-y-0",
            accent === "gold" ? "border-gold/60" : "border-accent/60",
            CORNER[corner]
          )}
        />
      ))}
    </span>
  );
}
