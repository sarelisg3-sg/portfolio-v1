export type ProjectType =
  | "redesign"
  | "frontend"
  | "ux-case-study"
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
  status: ProjectStatus;
  type: ProjectType;
  tags: string[];
  featured: boolean;
  liveUrl?: string;
  repoUrl?: string;
  legacyRepoUrl?: string;
  externalUrl?: string;
  coverImage?: string;
  coverAlt?: string;
  description: string;
}

export interface Project {
  frontmatter: ProjectFrontmatter;
  content: string;
  slug: string;
}
