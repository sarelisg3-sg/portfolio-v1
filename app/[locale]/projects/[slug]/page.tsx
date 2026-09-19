import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getTranslations } from "next-intl/server";
import { getProject, getProjectSlugs, getFeaturedProjects } from "@/lib/mdx";
import { extractHeadings } from "@/lib/slugify";
import { routing } from "@/lib/i18n/routing";
import type { Locale } from "@/lib/i18n/routing";
import { mdxComponents } from "@/components/projects/mdx";
import { ProjectToc } from "@/components/projects/ProjectToc";

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

const BTN_PRIMARY =
  "px-4 py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-lg hover:bg-[var(--accent-hover)] transition-colors";
const BTN_SECONDARY =
  "px-4 py-2 border border-[var(--border)] text-sm font-medium rounded-lg text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors";
const BTN_TERTIARY =
  "px-4 py-2 border border-[var(--border)] text-sm text-[var(--muted)] rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors";

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
  const headings = extractHeadings(content);

  // Previous / next project in the same order as the home grid.
  const siblings = getFeaturedProjects(locale as Locale);
  const index = siblings.findIndex((p) => p.slug === slug);
  const prevProject = index > 0 ? siblings[index - 1] : null;
  const nextProject = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;

  // Primary CTA: the most "real" artefact available — live site/app first, then prototype.
  const primaryHref = frontmatter.externalUrl ?? frontmatter.liveUrl ?? null;
  const primaryLabel = frontmatter.externalUrl
    ? t("view_site")
    : (frontmatter.liveLabel ?? t("view_live"));

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-16">
      <article className="max-w-3xl">
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

          {/* Headline metrics */}
          {frontmatter.highlights && frontmatter.highlights.length > 0 && (
            <dl className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
              {frontmatter.highlights.map((h) => (
                <div key={h.label} className="flex flex-col">
                  <dd className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                    {h.value}
                  </dd>
                  <dt className="mt-1 text-xs text-[var(--muted)] leading-snug">
                    {h.label}
                  </dt>
                </div>
              ))}
            </dl>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3 mt-8">
            {primaryHref && (
              <a href={primaryHref} target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY}>
                {primaryLabel} ↗
              </a>
            )}
            {frontmatter.prototypeUrl && (
              <a
                href={frontmatter.prototypeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryHref ? BTN_SECONDARY : BTN_PRIMARY}
              >
                {t("view_prototype")} ↗
              </a>
            )}
            {frontmatter.boardUrl && (
              <a href={frontmatter.boardUrl} target="_blank" rel="noopener noreferrer" className={BTN_SECONDARY}>
                {t("view_board")} ↗
              </a>
            )}
            {frontmatter.repoUrl && (
              <a href={frontmatter.repoUrl} target="_blank" rel="noopener noreferrer" className={BTN_SECONDARY}>
                {t("view_repo")} ↗
              </a>
            )}
            {frontmatter.legacyRepoUrl && (
              <a href={frontmatter.legacyRepoUrl} target="_blank" rel="noopener noreferrer" className={BTN_TERTIARY}>
                {t("view_legacy")} ↗
              </a>
            )}
          </div>
        </header>

        {/* Cover */}
        {frontmatter.coverImage && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-12 bg-gray-100 dark:bg-white/5">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.coverAlt ?? frontmatter.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* On-this-page index for phones/tablets (the sticky sidebar only exists on desktop) */}
        {headings.length >= 3 && (
          <details className="lg:hidden mb-10 rounded-xl border border-[var(--border)] bg-gray-50 dark:bg-white/[0.03] px-5 py-4">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm font-semibold text-[var(--foreground)]">
              <span>{t("on_this_page")}</span>
              <span className="text-xs font-normal text-[var(--muted)]">
                {t("sections_count", { count: headings.length })}
              </span>
            </summary>
            <ol className="mt-4 space-y-2 text-sm">
              {headings.map((h, i) => (
                <li key={h.id} className="flex gap-3">
                  <span className="w-5 shrink-0 tabular-nums text-[var(--muted)]">{i + 1}.</span>
                  <a href={`#${h.id}`} className="text-[var(--foreground)] hover:text-[var(--accent)]">
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        )}

        {/* MDX Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:mt-14 prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline">
          <MDXRemote
            source={content}
            components={mdxComponents}
            // Content is our own local MDX: allow JSX expression props (blocked by default in v6).
            options={{ blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {/* Prev / next project — no dead end after a long read */}
        <nav
          aria-label={t("section_title")}
          className="mt-20 pt-8 border-t border-[var(--border)]"
        >
          <Link
            href={`/${locale}#projects`}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            ← {t("all_projects")}
          </Link>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject ? (
              <Link
                href={`/${locale}/projects/${prevProject.slug}`}
                className="group rounded-xl border border-[var(--border)] p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <span className="block text-xs uppercase tracking-wide text-[var(--muted)] mb-1">
                  ← {t("prev_project")}
                </span>
                <span className="block font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {prevProject.frontmatter.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {nextProject && (
              <Link
                href={`/${locale}/projects/${nextProject.slug}`}
                className="group rounded-xl border border-[var(--border)] p-5 text-left sm:text-right hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <span className="block text-xs uppercase tracking-wide text-[var(--muted)] mb-1">
                  {t("next_project")} →
                </span>
                <span className="block font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {nextProject.frontmatter.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </article>

      {/* On-this-page nav (desktop only) */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <ProjectToc headings={headings} label={t("on_this_page")} />
        </div>
      </aside>
    </div>
  );
}
