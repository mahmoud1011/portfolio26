import type { SiteMetadata, ContactLink } from "@/types";

export const siteMetadata: SiteMetadata = {
  title: "Mahmoud Anwar — Unity Gameplay Programmer",
  description:
    "Gameplay systems engineer specializing in Unity, HDRP, AI architecture, and console development. Previously shipped Rust: Console Edition at Double Eleven.",
  url: "https://mahmoud1011.github.io/portfolio",
  ogImage: "/og-image.jpg",
  keywords: [
    "Unity Gameplay Programmer",
    "Game Developer Portfolio",
    "Unity C# Developer",
    "HDRP Unity",
    "Console Game Developer",
    "Unity AI Systems",
    "Game Systems Engineer",
    "Kuala Lumpur Game Developer",
    "Double Eleven",
    "Rust Console Edition",
  ],
};

export const contactLinks: ContactLink[] = [
  {
    label: "mahmoudanwar75888@gmail.com",
    href: "mailto:mahmoudanwar75888@gmail.com",
    icon: "email",
    copyValue: "mahmoudanwar75888@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mahmoud-anwar10",
    icon: "linkedin",
    external: true,
  },
  {
    label: "Itch.io",
    href: "https://anwar10.itch.io/",
    icon: "itch",
    external: true,
  },
  {
    label: "Download CV",
    href: "/cv/mahmoud-anwar-cv.pdf",
    icon: "cv",
    external: true,
  },
];

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mahmoud Anwar",
  jobTitle: "Unity Gameplay Programmer",
  url: siteMetadata.url,
  email: "mahmoudanwar75888@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kuala Lumpur",
    addressCountry: "MY",
  },
  sameAs: [
    "https://www.linkedin.com/in/mahmoud-anwar10",
    "https://anwar10.itch.io/",
  ],
};
