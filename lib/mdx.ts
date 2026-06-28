import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, ProjectFrontmatter, Locale } from "@/types/project";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs.readdirSync(PROJECTS_DIR).filter((name) => {
    const full = path.join(PROJECTS_DIR, name);
    return fs.statSync(full).isDirectory();
  });
}

export function getProject(slug: string, locale: Locale): Project | null {
  const filePath = path.join(PROJECTS_DIR, slug, `${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

export function getAllProjects(locale: Locale): Project[] {
  const slugs = getProjectSlugs();
  return slugs
    .map((slug) => getProject(slug, locale))
    .filter((p): p is Project => p !== null)
    .sort((a, b) => {
      if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
      if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
      return 0;
    });
}

export function getFeaturedProjects(locale: Locale): Project[] {
  return getAllProjects(locale).filter((p) => p.frontmatter.featured);
}
