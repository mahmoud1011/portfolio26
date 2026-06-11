"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectMediaItem } from "@/types";

interface ProjectMediaProps {
  /** Accepts a single item or a gallery. */
  media: ProjectMediaItem[] | ProjectMediaItem;
  title: string;
  priority?: boolean;
  className?: string;
  accentVariant?: "teal" | "gold";
}

const ACCENT = { teal: "#00D4AA", gold: "#F5B23A" } as const;

/** A single rendered media surface (image, video, or placeholder). */
function MediaSurface({
  item,
  title,
  priority,
  accent,
  playingId,
  setPlayingId,
  index,
}: {
  item: ProjectMediaItem;
  title: string;
  priority: boolean;
  accent: string;
  playingId: number | null;
  setPlayingId: (i: number | null) => void;
  index: number;
}) {
  const [imageError, setImageError] = useState(false);

  if (item.type === "placeholder" || imageError || (!item.src && !item.youtubeId)) {
    return (
      <div
        className="absolute inset-0 bg-bg-elevated flex flex-col items-center justify-center gap-3"
        aria-label={`${title} — media not available`}
      >
        <div className="text-5xl font-bold font-mono opacity-[0.08]" style={{ color: accent }} aria-hidden="true">
          {title.slice(0, 2).toUpperCase()}
        </div>
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest">{title}</p>
      </div>
    );
  }

  if (item.type === "video" && item.youtubeId) {
    const isPlaying = playingId === index;
    if (isPlaying) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={`${title} gameplay video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      );
    }
    return (
      <div className="absolute inset-0 group/media cursor-pointer">
        {item.poster && (
          <Image
            src={item.poster}
            alt={item.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover/media:scale-105"
            priority={priority}
          />
        )}
        <div className="absolute inset-0 bg-bg-primary/40 group-hover/media:bg-bg-primary/25 transition-colors duration-300" />
        <button
          onClick={() => setPlayingId(index)}
          aria-label={`Play ${title} gameplay video`}
          className="absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:shadow-focus"
        >
          <span
            className="flex items-center justify-center w-16 h-16 rounded-full border-2 backdrop-blur-sm transition-transform duration-200 group-hover/media:scale-110"
            style={{ borderColor: accent, backgroundColor: `${accent}26` }}
          >
            <Play size={22} style={{ color: accent }} fill={accent} className="ml-0.5" />
          </span>
        </button>
        <span className="absolute bottom-3 right-3 px-2 py-1 rounded bg-bg-primary/70 backdrop-blur-md font-mono text-[10px] text-text-secondary uppercase tracking-wider">
          Gameplay
        </span>
      </div>
    );
  }

  // Static image
  return (
    <>
      <Image
        src={item.src!}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-700 ease-decelerate group-hover:scale-[1.03]"
        priority={priority}
        onError={() => setImageError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 55vw"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, transparent 55%, rgba(11,13,18,0.35) 100%)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" aria-hidden="true" />
    </>
  );
}

export function ProjectMedia({
  media,
  title,
  priority = false,
  className,
  accentVariant = "teal",
}: ProjectMediaProps) {
  const accent = ACCENT[accentVariant];

  // Normalize: accept legacy single object or array; default hero = isHero flag or first.
  const items = Array.isArray(media) ? media : [media];
  const heroIndex = Math.max(0, items.findIndex((m) => m.isHero));
  const [activeIndex, setActiveIndex] = useState(heroIndex === -1 ? 0 : heroIndex);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const hasGallery = items.length > 1;
  const activeItem = items[activeIndex] ?? items[0];

  const selectItem = (i: number) => {
    setPlayingId(null); // never leave a video playing when switching
    setActiveIndex(i);
  };

  return (
    <div className={cn("relative w-full h-full flex flex-col", className)}>
      {/* Primary surface */}
      <div className="relative w-full flex-1 aspect-video overflow-hidden">
        <MediaSurface
          item={activeItem}
          title={title}
          priority={priority}
          accent={accent}
          playingId={playingId}
          setPlayingId={setPlayingId}
          index={activeIndex}
        />
      </div>

      {/* Thumbnail strip — only when multiple items exist */}
      {hasGallery && (
        <div
          className="flex gap-2 p-2.5 bg-bg-primary/40 backdrop-blur-sm border-t border-border-subtle overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label={`${title} media gallery`}
        >
          {items.map((item, i) => {
            const isActive = i === activeIndex;
            const thumbSrc = item.type === "video" ? item.poster : item.src;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                aria-label={`View ${item.type === "video" ? "video" : "image"} ${i + 1} of ${items.length}`}
                onClick={() => selectItem(i)}
                className={cn(
                  "relative shrink-0 w-16 h-11 rounded-sm overflow-hidden border transition-all duration-200 focus-visible:outline-none focus-visible:shadow-focus",
                  isActive
                    ? "border-accent shadow-accent-sm opacity-100"
                    : "border-border-default opacity-60 hover:opacity-100 hover:border-border-strong"
                )}
              >
                {thumbSrc ? (
                  <Image src={thumbSrc} alt="" fill className="object-cover" sizes="64px" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center bg-bg-elevated">
                    <ImageIcon size={14} className="text-text-muted" aria-hidden="true" />
                  </span>
                )}
                {item.type === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-bg-primary/40" aria-hidden="true">
                    <Play size={12} className="text-white" fill="white" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
