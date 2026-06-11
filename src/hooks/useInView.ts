"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Symmetric trigger band as a fraction of viewport height, applied to top and bottom equally. */
  margin?: number;
  /** Reveal only once and never reverse (prevents flashing on scroll-up). Default true. */
  once?: boolean;
}

/**
 * Reveals an element when it enters a symmetric trigger band centered in the
 * viewport. Because the top and bottom margins are equal, the element animates
 * at the same relative position whether the user is scrolling down or up.
 */
export function useInView({ margin = 0.12, once = true }: UseInViewOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Symmetric rootMargin → identical trigger point in both scroll directions.
    const pct = Math.round(margin * 100);
    const rootMargin = `-${pct}% 0px -${pct}% 0px`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [margin, once]);

  return { ref, inView };
}
