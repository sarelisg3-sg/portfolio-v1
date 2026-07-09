import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations } from "next-intl/server";
import { getProject, getProjectSlugs } from "@/lib/mdx";
import { routing } from "@/lib/i18n/routing";
import type { Locale } from "@/lib/i18n/routing";

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug, locale as Locale);
  if (!project) return {};

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      images: project.frontmatter.coverImage
        ? [{ url: project.frontmatter.coverImage }]
        : [],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug, locale as Locale);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projects" });
  const { frontmatter, content } = project;

  const primaryHref =
    frontmatter.externalUrl ?? frontmatter.liveUrl ?? null;
  const isExternal = !!frontmatter.externalUrl;

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      {/* Back */}
      <Link
        href={`/${locale}#projects`}
        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8 inline-block"
      >
        ← {t("section_title")}
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          <span className="font-medium text-[var(--accent)]">
            {t(`type.${frontmatter.type.replace(/-/g, "_")}`)}
          </span>
          {frontmatter.date && (
            <>
              <span className="text-[var(--muted)]">·</span>
              <span className="text-[var(--muted)]">{frontmatter.date}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-3 leading-tight">
          {frontmatter.title}
        </h1>
        <p className="text-xl text-[var(--muted)]">{frontmatter.tagline}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs border border-[var(--border)] px-2.5 py-0.5 rounded-full text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mt-6">
          {primaryHref && (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
            >
              {isExternal ? t("view_site") : t("view_live")} ↗
            </a>
          )}
          {frontmatter.repoUrl && (
            <a
              href={frontmatter.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-[var(--border)] text-sm font-medium rounded-lg text-[var(--foreground)] hover:bg-gray-50 transition-colors"
            >
              {t("view_repo")} ↗
            </a>
          )}
          {frontmatter.legacyRepoUrl && (
            <a
              href={frontmatter.legacyRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-[var(--border)] text-sm text-[var(--muted)] rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t("view_legacy")} ↗
            </a>
          )}
          {frontmatter.pdfUrl && (
            <a
              href={frontmatter.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-[var(--border)] text-sm font-medium rounded-lg text-[var(--foreground)] hover:bg-gray-50 transition-colors"
            >
              {t("view_case_study_pdf")} ↗
            </a>
          )}
        </div>
      </header>

      {/* Cover */}
      {frontmatter.coverImage && (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-12 bg-gray-100">
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.coverAlt ?? frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* MDX Content */}
      <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
