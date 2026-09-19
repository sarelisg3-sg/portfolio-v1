export type ProjectType =
  | "redesign"
  | "frontend"
  | "ux-deep-dive"
  | "ux-research"
  | "external"
  | "design-system";

export type ProjectStatus = "done" | "in-progress" | "concept";

export type Locale = "es" | "en" | "fr";

export interface ProjectFrontmatter {
  slug: string;
  locale: Locale;
  title: string;
  tagline: string;
  date?: string;
  order?: number;
  status: ProjectStatus;
  type: ProjectType;
  tags: string[];
  featured: boolean;
  liveUrl?: string;
  /** Optional label for the live link (defaults to the localized "Try the app") */
  liveLabel?: string;
  repoUrl?: string;
  legacyRepoUrl?: string;
  externalUrl?: string;
  pdfUrl?: string;
  /** Interactive prototype (Figma etc.) — rendered as its own CTA */
  prototypeUrl?: string;
  /** Research board (Miro etc.) */
  boardUrl?: string;
  /** 2–4 headline metrics shown in the project header and card */
  highlights?: { value: string; label: string }[];
  coverImage?: string;
  coverAlt?: string;
  description: string;
}

export interface Project {
  frontmatter: ProjectFrontmatter;
  content: string;
  slug: string;
}
