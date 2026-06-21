"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { withBasePath } from "@/lib/utils";

/**
 * Full-bleed hero background. Plays the "code assembles you" cinematic
 * (assemble → Rust → Torum → RYDER → resolve). Falls back to the resolve
 * still for prefers-reduced-motion or if the video can't play.
 */
export function HeroVideo() {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  const poster = withBasePath("/images/hero/hero-still.jpg");

  useEffect(() => {
    if (reducedMotion) {
      setShowVideo(false);
      return;
    }
    setShowVideo(true);
    const v = videoRef.current;
    if (v) {
      // Some browsers need an explicit play() after mount.
      v.play().catch(() => setShowVideo(false));
    }
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Poster / reduced-motion still — always present as the base layer */}
      <Image
        src={poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-right"
      />

      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-right"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onError={() => setShowVideo(false)}
        >
          <source src={withBasePath("/images/hero/hero-cinematic.webm")} type="video/webm" />
          <source src={withBasePath("/images/hero/hero-cinematic.mp4")} type="video/mp4" />
        </video>
      )}

      {/* Legibility scrims: darken left (where the copy sits) + base + top/bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #0D0F14 0%, rgba(13,15,20,0.92) 28%, rgba(13,15,20,0.55) 55%, rgba(13,15,20,0.25) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(13,15,20,0.55) 0%, transparent 22%, transparent 70%, #0D0F14 100%)",
        }}
      />
      {/* Accent edge glows to tie into the brand */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
    </div>
  );
}
