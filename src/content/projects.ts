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
    contextLabel: "Professional · Cross-Platform · Production Shipped",
    studio: "TORUM TECHNOLOGY SDN. BHD.",
    year: "2024",
    title: "AR Asset Pipeline & Face Tracking App",
    role: "AR Unity Developer",
    platforms: ["iOS", "Android"],
    description:
      "Designed and shipped a cross-platform AR face tracking application for iOS and Android, built on a custom automated asset pipeline that streamlined delivery of 3D assets from production to device. Engineered the full stack: Unity runtime, native iOS integration, and a cloud-backed asset management system using AWS S3 and CDN.",
    systems: [
      {
        name: "Automated Asset Pipeline",
        description:
          "Built a workflow automating the full cycle from 3D asset creation in Blender to CDN deployment in Unity via AWS S3, eliminating manual asset management.",
      },
      {
        name: "AR Face Tracking Runtime",
        description:
          "Implemented real-time face tracking via Unity AR Foundation across Android and iOS with native iOS plugin bridge integration.",
      },
      {
        name: "AWS SDK Integration",
        description:
          "Integrated AWS SDK into Unity to manage dynamic asset syncing between the CDN and client device at runtime.",
      },
      {
        name: "Python/Blender Automation",
        description:
          "Created Python scripting plugins for Blender to procedurally compose and batch-export 3D assets directly into the Unity pipeline.",
      },
    ],
    techTags: ["Unity", "AR Foundation", "AWS S3", "C#", "Python", "iOS", "Android", "Asset Bundles"],
    media: [
      {
        type: "image",
        src: withBasePath("/images/projects/ar-pipeline/hero.jpg"),
        alt: "AR face tracking application showing real-time 3D asset overlay on mobile device",
        isHero: true,
      },
    ],
    links: [],
    featured: false,
    accentVariant: "teal",
    size: "half",
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
      // Example of a gameplay video entry. Replace youtubeId with a real ID to enable.
      // {
      //   type: "video",
      //   youtubeId: "REPLACE_ME",
      //   poster: "/images/projects/ryder/hero.jpg",
      //   alt: "RYDER combat systems gameplay walkthrough",
      // },
    ],
    links: [
      {
        label: "View on Itch.io",
        href: "https://anwar10.itch.io/",
        external: true,
        variant: "secondary",
      },
    ],
    featured: false,
    accentVariant: "teal",
    size: "full",
  },
];
