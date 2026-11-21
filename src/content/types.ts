import type { Localized } from "@/i18n/config";

export type ServiceSlug = "software-development" | "websites-ecommerce" | "ai-automation" | "mvp-product";
export type Hue = "software" | "web" | "ai" | "mvp";

export interface Service {
  slug: ServiceSlug;
  hue: Hue;
  icon: "server" | "layout" | "sparkles" | "rocket";
  title: Localized;
  tagline: Localized;
  summary: Localized;
  keywords: Localized<string[]>;
  intro: Localized;
  deliverables: Localized<{ title: string; text: string }[]>;
  useCases: Localized<string[]>;
  stack: string[];
  /** Related project slugs that demonstrate the service. */
  relatedProjects: string[];
}

export type ProjectStatus = "live" | "pilot" | "in-development" | "internal" | "placeholder";
export type ProjectArt = "jobs" | "replay" | "watcher" | "seasonality" | "insiders" | "shop";

export interface Project {
  slug: string;
  name: string;
  /** Internal / repository name when it differs from the public name. */
  codename?: string;
  year?: string;
  status: ProjectStatus;
  category: Localized;
  art: ProjectArt;
  /** Accent colour for the project's preview art. */
  color: string;
  tagline: Localized;
  problem: Localized;
  solution: Localized;
  features: Localized<string[]>;
  /** Verified from the project's repository. Leave empty when unknown. */
  stack: string[];
  architecture?: Localized<string[]>;
  role?: Localized;
  liveUrl?: string;
  repoUrl?: string;
  /** Optional real screenshot in /public (e.g. "/work/gastropozice.webp"). Falls back to illustrative art. */
  image?: { src: string; alt: Localized; width: number; height: number };
  /** Notes for the site owner; rendered as a visible placeholder notice. */
  todo?: Localized;
  featured?: boolean;
  services: ServiceSlug[];
}

export type TechLevel = "professional" | "projects" | "workflow";

export interface TechItem {
  name: string;
  level: TechLevel;
}

export interface TechGroup {
  id: string;
  title: Localized;
  description: Localized;
  items: TechItem[];
}

export interface ProcessStep {
  id: string;
  title: Localized;
  text: Localized;
  outputs: Localized<string[]>;
}
