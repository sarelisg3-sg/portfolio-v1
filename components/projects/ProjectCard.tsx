import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/types/project";

const STATUS_CLASSES = {
  done: "bg-green-50 text-green-700 border-green-200",
  "in-progress": "bg-amber-50 text-amber-700 border-amber-200",
  concept: "bg-gray-50 text-gray-600 border-gray-200",
};

const TYPE_KEY_MAP: Record<string, string> = {
  redesign: "redesign",
  frontend: "frontend",
  "ux-case-study": "ux_case_study",
  external: "external",
  "design-system": "design_system",
};

export function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const t = useTranslations("projects");
  const { frontmatter, slug } = project;

  const externalLink = frontmatter.externalUrl ?? frontmatter.liveUrl ?? null;
  const isExternal = !!frontmatter.externalUrl;
  const typeKey = TYPE_KEY_MAP[frontmatter.type] ?? frontmatter.type;
  const detailHref = `/${locale}/projects/${slug}`;

  return (
    <article className="group relative flex flex-col rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-md transition-shadow bg-white">
      {/* Cover */}
      <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
        {frontmatter.coverImage ? (
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.coverAlt ?? frontmatter.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--muted)] text-sm">{frontmatter.title}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4 pointer-events-none">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium text-[var(--accent)]">
            {t(`type.${typeKey}`)}
          </span>
          <span className="text-xs text-[var(--muted)]">·</span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
              STATUS_CLASSES[frontmatter.status]
            }`}
          >
            {t(`status.${frontmatter.status.replace("-", "_")}`)}
          </span>
        </div>

        {/* Title + tagline */}
        <div>
          <h3 className="font-semibold text-lg leading-snug text-[var(--foreground)]">
            {frontmatter.title}
          </h3>
          <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">
            {frontmatter.tagline}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {frontmatter.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-50 border border-[var(--border)] text-[var(--muted)] px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="relative z-10 mt-auto flex flex-wrap gap-3 pt-2 pointer-events-auto">
          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
            >
              {isExternal ? t("view_site") : t("view_live")} ↗
            </a>
          )}

          <Link
            href={detailHref}
            className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
          >
            {t("view_project")} →
          </Link>

          {frontmatter.legacyRepoUrl && (
            <a
              href={frontmatter.legacyRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              {t("view_legacy")} ↗
            </a>
          )}

          {frontmatter.repoUrl && (
            <a
              href={frontmatter.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              {t("view_repo")} ↗
            </a>
          )}
        </div>
      </div>

      {/* Stretched link — click anywhere on the card opens the case study */}
      <Link
        href={detailHref}
        className="absolute inset-0 z-0"
        aria-label={frontmatter.title}
      />
    </article>
  );
}
