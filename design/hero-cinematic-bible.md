# Hero Cinematic — Art Direction Bible & Implementation Plan

> The "code assembles you" hero centerpiece for mahmoud1011.github.io/portfolio26
> Status: assets generated (this pass) · implementation = next pass

---

## 1. Concept

**One line:** Code and wireframe converge into a single definitive portrait of Mahmoud, who then becomes the gateway into his shipped game worlds — then it all resolves back onto him.

This is deliberate: Mahmoud wanted **exactly one picture of himself** on the site. So instead of a gallery, his single portrait is the *payoff* of a transformation — he is literally constructed from the code he writes, and the games flow out of him.

**Art direction:** *Cinematic dark-studio engineer.* Moody, premium, editorial. Reads instantly as a serious systems engineer, not a flashy showreel. Sits natively inside the existing portfolio HUD aesthetic.

---

## 2. Palette & type (locked to the live site)

| Token | Hex | Use in the film |
|---|---|---|
| bg.primary | `#0D0F14` | base black-blue, negative space |
| accent (teal) | `#00D4AA` | key light, code, wireframe, HUD |
| gold | `#F5A623` | rim light + the Double Eleven / Rust flagship beat |
| text.primary | `#E8EAF0` | title overlay |
| mono font | Fira Code | any on-screen code / labels |

Grade: **teal-and-orange**, low-key, film grain, shallow depth of field.

---

## 3. The 5-beat structure (~25s, loopable)

| # | Beat | Start frame → End frame | Camera | Beat note |
|---|---|---|---|---|
| 1 | **Code assembles you** | dispersed code/wireframe → hero portrait | push-in | particles + C# coalesce into a real human |
| 2 | **You emit the world** | hero portrait → Rust landscape | super dolly in | studio floods forward into the Rust survival world (gold-accented = the shipped flagship) |
| 3 | **Into Torum** | Rust → Torum KL street | super dolly in | Rust world gives way to the Torum AR-NFT app on a Kuala Lumpur street — over-the-shoulder, ChubbyCub mascot, floating NFT social feed |
| 4 | **Match-cut to RYDER** | Torum → RYDER combat | whip-pan | the social-app street morphs kinetically into the action-RPG arena |
| 5 | **Reassemble + resolve** | RYDER → hero portrait | pull-out | worlds shatter to code and re-form the creator; clean space for the name title |

Torum keyframe: the user's own finalized "TorumShot" (refined in the Magnific TorumProject space) — real ChubbyCub mascot, real in-app AR face-filter, the user with his actual long curly ponytail (face hidden by the NFT filter), subtle KL street. The two inserted clips (Rust→Torum, Torum→RYDER) replaced the original single Rust→RYDER beat; all other beats were reused untouched.

Loop point: beat 5 ends on the hero portrait; beat 1 opens on dispersed code (reads as a deliberate "rebuild" reset).

---

## 4. Generation recipe (for reproducibility)

- **Stills:** Google Nano Banana **Pro** (`imagen-nano-banana-2`), 16:9, 2K.
- **Video:** **Seedance 2.0 Pro** (`bytedance-seedance-pro-2.0`), 16:9, 1080p, 5s/clip, start+end keyframes, native sound effects on.
- **Likeness anchor:** the existing illustrated portrait (`public/images/profile/mahmoud.jpg`), ingested server-side from the live GitHub Pages URL. The hero face = the first 2K portrait, then **outpainted** to 16:9 so the face stays pixel-identical while the studio environment grows.
- **Project worlds in-frame:** the real Rust landscape + RYDER hero art, ingested from the live site and used as video keyframes so the worlds are genuinely *his* games.

---

## 5. Delivered assets (this pass)

> Note: the generation platform's CDN is firewalled from this sandbox, so the
> video files could not be written into the repo automatically. Download them
> from the links below and drop them into `public/images/hero/` with these exact
> filenames, then commit. (Token links expire — download soon.)

| Save as `public/images/hero/…` | Source |
|---|---|
| `hero-cinematic.mp4` | **Master v2, 1080p / ~25s / with audio (includes Torum)** — https://www.magnific.com/app/creation/745Hz2lJAL |
| `hero-still.jpg` (poster) | Locked portrait — https://www.magnific.com/app/creation/vuVzAZma47 |
| `torum-shot.jpg` (project still) | Your finalized TorumShot — https://www.magnific.com/app/creation/IaWGhIAtvE |

> Superseded: the original 4-beat master (no Torum) was `l7QhfCAgv9` — use the v2 above.

Individual beats (optional, for re-editing): assemble, Rust, RYDER, resolve —
all in the project's media library on the platform.

**Still to do at implementation (next pass), once files are local:**
- Transcode `hero-cinematic.mp4` → `hero-cinematic.webm` (VP9/AV1) and compress
  to < ~5 MB with `ffmpeg` (sandbox can do this once the file is in the repo).
- Generate a small mobile-poster crop if serving the still on phones.

---

## 6. Implementation plan (next pass)

**Where:** the hero. Two options, decide on review:

- **A — Full-bleed cinematic hero (recommended for impact).** The stitched video is a full-width background layer behind the existing left-column copy (name, role, CTAs). A left-to-right dark gradient (`from-bg-primary`) keeps text legible over the footage; Mahmoud sits in the right third by design, so the copy and the figure don't fight.
- **B — Replace the right portrait card.** Swap the static `<Image>` in `HeroSection.tsx`'s right column with the looping video inside the same `rounded-card-lg` frame. Lower risk, smaller footprint.

**Component sketch (`src/components/sections/hero/HeroBackground.tsx`):**

```tsx
"use client";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { withBasePath } from "@/lib/utils";

export function HeroBackground() {
  const reduced = useReducedMotion();
  const poster = withBasePath("/images/hero/hero-still.jpg");
  if (reduced) {
    // Respect prefers-reduced-motion: show the single still only.
    return <img src={poster} alt="Mahmoud Anwar" className="..." />;
  }
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay muted loop playsInline preload="metadata"
      poster={poster}
    >
      <source src={withBasePath("/images/hero/hero-cinematic.webm")} type="video/webm" />
      <source src={withBasePath("/images/hero/hero-cinematic.mp4")} type="video/mp4" />
    </video>
  );
}
```

**Rules:**
- Always `muted` + `playsInline` + `loop` + `autoPlay` (browsers only autoplay muted).
- `prefers-reduced-motion` → render the still, never the video (already have `useReducedMotion`).
- Poster = `hero-still.jpg` so first paint is instant and there's a fallback if the video fails.
- Keep the master small (target < 4–5 MB) — it's above the fold. webm (VP9/AV1) first, mp4 (H.264) fallback.
- Title overlay uses existing tokens; the name can fade in on beat 4's resolve if synced, otherwise static over the video.
- Static export (GitHub Pages) serves the files from `public/` — no server work needed.

**Accessibility/perf checklist for next pass:** captions not needed (no speech), provide `aria-hidden` on the decorative video + keep the real `<h1>` in DOM, lazy strategy fine since it's LCP-adjacent (use `preload="metadata"`), test on mobile (consider serving the still on small screens to save data).
