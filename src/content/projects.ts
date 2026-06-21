import { withBasePath } from "@/lib/utils";
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "rust-console-edition",
    contextLabel: "Professional · Console · Shipped Commercial Title",
    studio: "DOUBLE ELEVEN LTD.",
    year: "2025",
    title: "Rust: Console Edition",
    role: "Game Programmer Intern",
    platforms: ["PlayStation 5", "Xbox Series S/X"],
    description:
      "Worked within Double Eleven's engineering team on Rust: Console Edition, a large-scale survival multiplayer game shipped on PlayStation and Xbox. Focused on porting and modernizing core gameplay systems from Gen 8 to Gen 9 hardware, while diagnosing and resolving rendering and environment issues using console-specific GPU profiling tools.",
    systems: [
      {
        name: "Gen 8 → Gen 9 Drone System Port",
        description:
          "Ported drone gameplay systems from PS4 to PS5/Xbox Series, adapting for new hardware capabilities and next-gen performance targets.",
      },
      {
        name: "HDRP Shader Development",
        description:
          "Designed and implemented HLSL shaders within Unity's High Definition Render Pipeline, optimized against console GPU memory budgets.",
      },
      {
        name: "Console GPU Debugging",
        description:
          "Diagnosed and resolved rendering artifacts using Razor (PlayStation) and PIX (Xbox) profiling tools at the hardware level.",
      },
      {
        name: "Network Server/Client Optimization",
        description:
          "Contributed to server/client performance improvements across a live large-scale multiplayer environment.",
      },
    ],
    techTags: ["Unity HDRP", "HLSL", "C#", "PIX", "Razor", "PS5", "Xbox Series", "Multiplayer"],
    media: [
      {
        type: "image",
        src: withBasePath("/images/projects/rust/hero.jpg"),
        alt: "Rust: Console Edition — official key art showing an armed survivor in post-apocalyptic landscape",
        isHero: true,
      },
      {
        type: "image",
        src: withBasePath("/images/projects/rust/landscape.jpg"),
        alt: "Rust: Console Edition — in-game coastal landscape at sunset rendered on console hardware",
      },
      {
        type: "image",
        src: withBasePath("/images/projects/rust/media.jpg"),
        alt: "Rust: Console Edition — in-game screenshot showing coastal combat action",
      },
      {
        type: "image",
        src: withBasePath("/images/projects/rust/media01.jpg"),
        alt: "Rust: Console Edition — gameplay screenshot with player and environment detail",
      },
      {
        type: "video",
        youtubeId: "D6c3JgpXY7A",
        poster: withBasePath("/images/projects/rust/hero.jpg"),
        alt: "Rust: Console Edition gameplay trailer on YouTube",
      },
    ],
    links: [
      {
        label: "PlayStation Store",
        href: "https://store.playstation.com/en-us/product/UP4512-PPSA02532_00-RUSTCONSOLE00001",
        external: true,
        variant: "primary",
      },
    ],
    featured: true,
    accentVariant: "gold",
    size: "full",
  },
  {
    id: "ar-asset-pipeline",
    contextLabel: "Professional · iOS & Android · Shipped SocialFi Platform",
    studio: "TORUM TECHNOLOGY SDN. BHD.",
    year: "2024",
    title: "Torum — AR NFT Social App",
    role: "AR Software Engineer · Core Team",
    platforms: ["iOS", "Android"],
    description:
      "Core AR engineer on Torum's flagship V2 — a SocialFi platform best described as 'Instagram for NFTs', where users bring their NFT collectibles to life as real-time AR face filters. Owned the AR experience end to end: a face-tracking runtime that maps 3D NFT avatars (Pudgy Penguins, Cool Cats, Meebits, Moonbirds, Sappy Seals) and the ChubbyCub mascot onto a user's face live, backed by a fully automated Blender-to-CDN asset pipeline so new collections ship to devices with no app update.",
    systems: [
      {
        name: "Real-Time AR Face Tracking",
        description:
          "Built the AR face-tracking runtime in Unity AR Foundation (ARKit / ARCore), rigging and rendering 3D NFT avatars onto the user's face live across iOS and Android via a native iOS plugin bridge.",
      },
      {
        name: "Automated NFT Asset Pipeline",
        description:
          "Engineered an end-to-end pipeline taking 3D NFT collections from Blender through Python automation to AWS S3 + CDN, dynamically streamed into Unity as AssetBundles — new NFT filters go live without a client release.",
      },
      {
        name: "Dynamic Content via AWS SDK",
        description:
          "Integrated the AWS SDK into Unity to sync and cache NFT avatar assets between the CDN and device at runtime, keeping the in-app library of face filters always current.",
      },
      {
        name: "ChubbyCub Mascot & Branded Filters",
        description:
          "Implemented Torum's ChubbyCub mascot and branded AR filters end to end — from rigged 3D source through the pipeline to a polished, shippable in-app experience.",
      },
    ],
    techTags: ["Unity", "AR Foundation", "ARKit", "ARCore", "C#", "Python", "Blender", "AWS S3", "Asset Bundles", "iOS Native"],
    media: [
      {
        type: "image",
        src: withBasePath("/images/projects/torum/ar-screen.jpg"),
        alt: "Torum app live AR face filter turning a user's face into a 3D Pudgy Penguin NFT avatar",
        isHero: true,
      },
      {
        type: "video",
        src: withBasePath("/images/projects/torum/landing-intro.webm"),
        poster: withBasePath("/images/projects/torum/landing-poster.jpg"),
        alt: "Torum brand and landing-page intro motion",
      },
      {
        type: "image",
        src: withBasePath("/images/projects/torum/nft-penguin.jpg"),
        alt: "3D-rendered Pudgy Penguin NFT avatar prepared as an AR face filter",
      },
      {
        type: "image",
        src: withBasePath("/images/projects/torum/chubbycub.png"),
        alt: "ChubbyCub — Torum's mascot character",
      },
    ],
    links: [],
    featured: false,
    accentVariant: "teal",
    size: "full",
  },
  {
    id: "rickshaw-vibes",
    contextLabel: "Professional · Mobile · Shipped to App Store",
    studio: "THE WIDER COLLECTIVE",
    year: "2024",
    title: "Rickshaw Vibes — Endless Runner",
    role: "Unity Developer · Team Lead",
    platforms: ["Android", "iOS"],
    description:
      "Led the Unity development team end-to-end on a mobile endless runner commissioned for a cultural client, shipping from concept to live release. Owned the full technical delivery including external API integration, real-time analytics, and third-party SDK implementation across a multi-discipline team.",
    systems: [
      {
        name: "Deep Link Integration",
        description:
          "Implemented deep linking enabling seamless app-to-game transitions from the client's parent application.",
      },
      {
        name: "Real-Time Analytics API",
        description:
          "Integrated a custom server API to track user playtime and session engagement, feeding data back to the client's platform.",
      },
      {
        name: "Firebase Leaderboard",
        description:
          "Integrated Firebase SDK and Google Play Services to power a competitive real-time leaderboard system.",
      },
      {
        name: "Team Technical Leadership",
        description:
          "Coordinated Unity development across artists and designers, managing scope, code consistency, and full delivery.",
      },
    ],
    techTags: ["Unity", "Firebase", "C#", "Deep Linking", "REST API", "Android", "iOS", "Google Play Services"],
    media: [
      {
        type: "image",
        src: withBasePath("/images/projects/rickshaw-vibes/hero.png"),
        alt: "Rickshaw Vibes endless runner — winged rickshaw racing through colorful city streets",
        isHero: true,
      },
    ],
    links: [],
    featured: false,
    accentVariant: "teal",
    size: "half",
  },
  {
    id: "ryder-action-rpg",
    contextLabel: "Personal Project · Systems Showcase",
    studio: "PERSONAL PROJECT",
    year: "2024",
    title: "RYDER — Action RPG Systems",
    role: "Sole Programmer",
    platforms: ["PC"],
    description:
      "Designed and implemented the complete gameplay systems architecture for a third-person action RPG, using this project as a testbed for production-grade modular systems including AI behavior, combat mechanics, RPG progression, and custom Unity editor tooling. Built with scalability and maintainability as primary engineering goals.",
    systems: [
      {
        name: "FSM-Based Enemy AI",
        description:
          "Modular finite state machine architecture driving enemy perception, navigation, and combat behavior with clean state separation.",
      },
      {
        name: "RPG Progression Systems",
        description:
          "Implemented inventory, stats, ability, and save/load systems using ScriptableObject architecture for designer-friendly data management.",
      },
      {
        name: "Combat System",
        description:
          "Designed the core combat loop including hit detection, damage calculation, ability triggering, and player feedback systems.",
      },
      {
        name: "Custom Editor Tools",
        description:
          "Built production-grade Unity editor tools including custom inspectors and ScriptableObject pipelines to accelerate team iteration.",
      },
    ],
    techTags: ["Unity", "C#", "FSM", "ScriptableObjects", "HDRP", "Design Patterns", "Editor Tools", "NavMesh"],
    media: [
      {
        type: "image",
        src: withBasePath("/images/projects/ryder/hero.jpg"),
        alt: "RYDER action RPG — third-person combat showing player character fighting multiple enemies",
        isHero: true,
      },
      {
        type: "image",
        src: withBasePath("/images/projects/ryder/media01.png"),
        alt: "RYDER gameplay UI and combat action scene",
      },
      {
        type: "image",
        src: withBasePath("/images/projects/ryder/media02.png"),
        alt: "RYDER exploration and enemy encounter showcase",
      },
      {
        type: "video",
        src: withBasePath("/images/projects/ryder/media_video.webm"),
        poster: withBasePath("/images/projects/ryder/hero.jpg"),
        alt: "RYDER action RPG gameplay walkthrough",
      },
      {
        type: "video",
        src: withBasePath("/images/projects/ryder/media_video01.webm"),
        poster: withBasePath("/images/projects/ryder/hero.jpg"),
        alt: "RYDER systems combat and animation demo",
      },
    ],
    links: [
      {
        label: "View on Itch.io",
        href: "https://uowmgames.itch.io/ryder",
        external: true,
        variant: "secondary",
      },
    ],
    featured: false,
    accentVariant: "teal",
    size: "full",
  },
];
