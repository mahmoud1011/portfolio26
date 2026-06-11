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

  const accentColor = accentVariant === "gold" ? "#F5A623" : "#00D4AA";

  if (media.type === "placeholder" || imageError || !media.src) {
    return (
      <div
        className={cn(
          "relative w-full aspect-video rounded-card overflow-hidden",
          "bg-bg-elevated border border-border-subtle",
          "flex flex-col items-center justify-center gap-3",
          className
        )}
        aria-label={`${title} — media not available`}
      >
        <div
          className="text-4xl font-bold font-mono opacity-10"
          style={{ color: accentColor }}
          aria-hidden="true"
        >
          {title.slice(0, 2).toUpperCase()}
        </div>
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
          {title}
        </p>
      </div>
    );
  }

  if (media.type === "video" && media.youtubeId) {
    if (!playing) {
      return (
        <div
          className={cn(
            "relative w-full aspect-video rounded-card overflow-hidden cursor-pointer group",
            className
          )}
        >
          {media.poster && (
            <Image
              src={media.poster}
              alt={media.alt}
              fill
              className="object-cover"
              priority={priority}
            />
          )}
          <div className="absolute inset-0 bg-bg-primary/40 group-hover:bg-bg-primary/20 transition-colors duration-200" />
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title} gameplay video`}
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "focus-visible:outline-none focus-visible:shadow-focus"
            )}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center border-2 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110"
              style={{
                borderColor: accentColor,
                backgroundColor: `${accentColor}20`,
              }}
            >
              <Play size={22} style={{ color: accentColor }} fill={accentColor} />
            </div>
          </button>
        </div>
      );
    }

    return (
      <div className={cn("relative w-full aspect-video rounded-card overflow-hidden", className)}>
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

  return (
    <div
      className={cn(
        "relative w-full aspect-video rounded-card overflow-hidden",
        "ring-1 ring-white/5",
        className
      )}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        priority={priority}
        onError={() => setImageError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 55vw"
      />
      {/* Vignette for integration with dark bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 60%, rgba(13,15,20,0.4) 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
