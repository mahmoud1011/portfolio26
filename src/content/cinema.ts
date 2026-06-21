import { withBasePath } from "@/lib/utils";

/**
 * Scroll-cinema configuration.
 *
 * The hero video (assemble → Rust → Torum → RYDER → resolve) is pinned and
 * scrubbed by scroll. Each beat below maps to a timestamp in the video where
 * that "world" is fully formed — the scroll snaps there and the matching panel
 * animates in.
 *
 * Timestamps are tunable: the master is ~25.3s of 5 equal ~5.07s beats.
 * Tweak `time` values after watching if a freeze lands mid-morph.
 */

export interface CinemaBeat {
  id: string;
  /** Seconds into the hero video where this beat freezes. */
  time: number;
  kind: "intro" | "project" | "cta";
  /** For kind === "project": the id in content/projects.ts */
  projectId?: string;
}

export const HERO_VIDEO = {
  webm: withBasePath("/images/hero/hero-cinematic.webm"),
  mp4: withBasePath("/images/hero/hero-cinematic.mp4"),
  poster: withBasePath("/images/hero/hero-still.jpg"),
  /** Measured duration of the encoded master. */
  duration: 25.334,
};

export const cinemaBeats: CinemaBeat[] = [
  { id: "intro", time: 5.0, kind: "intro" },
  { id: "rust", time: 10.1, kind: "project", projectId: "rust-console-edition" },
  { id: "torum", time: 15.2, kind: "project", projectId: "ar-asset-pipeline" },
  { id: "ryder", time: 20.2, kind: "project", projectId: "ryder-action-rpg" },
  { id: "cta", time: 25.2, kind: "cta" },
];
