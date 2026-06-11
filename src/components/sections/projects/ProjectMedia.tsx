"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectMedia as ProjectMediaType } from "@/types";

interface ProjectMediaProps {
  media: ProjectMediaType;
  title: string;
  priority?: boolean;
  className?: string;
  accentVariant?: "teal" | "gold";
}

export function ProjectMedia({
  media,
  title,
  priority = false,
  className,
  accentVariant = "teal",
}: ProjectMediaProps) {
  const [imageError, setImageError] = useState(false);
  const [playing, setPlaying] = useState(false);
  const accentColor = accentVariant === "gold" ? "#F5B23A" : "#00D4AA";

  // Placeholder / error fallback
  if (media.type === "placeholder" || imageError || !media.src) {
    return (
      <div
        className={cn(
          "relative w-full aspect-video bg-bg-elevated border border-border-subtle",
          "flex flex-col items-center justify-center gap-3",
          className
        )}
        aria-label={`${title} — media not available`}
      >
        <div className="text-5xl font-bold font-mono opacity-[0.08]" style={{ color: accentColor }} aria-hidden="true">
          {title.slice(0, 2).toUpperCase()}
        </div>
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest">{title}</p>
      </div>
    );
  }

  // Video with poster
  if (media.type === "video" && media.youtubeId) {
    if (!playing) {
      return (
        <div className={cn("relative w-full aspect-video overflow-hidden cursor-pointer group/media", className)}>
          {media.poster && (
            <Image src={media.poster} alt={media.alt} fill className="object-cover transition-transform duration-500 group-hover/media:scale-105" priority={priority} />
          )}
          <div className="absolute inset-0 bg-bg-primary/40 group-hover/media:bg-bg-primary/25 transition-colors duration-300" />
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title} gameplay video`}
            className="absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:shadow-focus"
          >
            <span
              className="flex items-center justify-center w-16 h-16 rounded-full border-2 backdrop-blur-sm transition-transform duration-200 group-hover/media:scale-110"
              style={{ borderColor: accentColor, backgroundColor: `${accentColor}26` }}
            >
              <Play size={22} style={{ color: accentColor }} fill={accentColor} className="ml-0.5" />
            </span>
          </button>
          <span className="absolute bottom-3 right-3 px-2 py-1 rounded bg-bg-primary/70 backdrop-blur-md font-mono text-[10px] text-text-secondary uppercase tracking-wider">
            Gameplay
          </span>
        </div>
      );
    }
    return (
      <div className={cn("relative w-full aspect-video overflow-hidden", className)}>
        <iframe
          src={`https://www.youtube.com/embed/${media.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={`${title} gameplay video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
    );
  }

  // Static image
  return (
    <div className={cn("relative w-full h-full aspect-video overflow-hidden", className)}>
      <Image
        src={media.src}
        alt={media.alt}
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
    </div>
  );
}
