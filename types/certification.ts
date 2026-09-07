import type { Locale } from "./project";

export interface CertificationFrontmatter {
  slug: string;
  locale: Locale;
  title: string;
  issuer: string;
  date?: string;
  order?: number;
  credentialUrl?: string;
  image?: string;
  imageAlt?: string;
  description: string;
}

export interface Certification {
  frontmatter: CertificationFrontmatter;
  content: string;
  slug: string;
}
