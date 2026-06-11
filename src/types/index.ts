export interface ProjectMedia {
  type: "video" | "image" | "placeholder";
  src?: string;
  poster?: string;
  alt: string;
  youtubeId?: string;
}

export interface ProjectSystem {
  name: string;
  description: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  external: boolean;
  variant?: "primary" | "secondary";
}

export interface Project {
  id: string;
  contextLabel: string;
  studio: string;
  year: string;
  title: string;
  role: string;
  platforms: string[];
  description: string;
  systems: ProjectSystem[];
  techTags: string[];
  media: ProjectMedia;
  links: ProjectLink[];
  featured: boolean;
  accentVariant: "teal" | "gold";
  size: "full" | "half";
}

export interface ExperienceItem {
  id: string;
  studio: string;
  role: string;
  period: string;
  location: string;
  subtitle?: string;
  logo?: string;
}

export interface SkillDomain {
  title: string;
  skills: string[];
}

export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  ogImage: string;
  keywords: string[];
  twitterHandle?: string;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: "email" | "linkedin" | "itch" | "github" | "cv";
  external?: boolean;
  copyValue?: string;
}
