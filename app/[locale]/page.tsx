import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProjects, getAllCertifications } from "@/lib/mdx";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CertificationCard } from "@/components/certifications/CertificationCard";
import type { Locale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("home_title"),
    description: t("home_description"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const projects = getFeaturedProjects(locale as Locale);
  const certifications = getAllCertifications(locale as Locale);

  return (
    <>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <div className="flex flex-col-reverse sm:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--accent)] mb-4">
              {t("hero.greeting")}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-[var(--foreground)] mb-6 whitespace-pre-line">
              {t("hero.headline")}
            </h1>
            <p className="text-lg text-[var(--muted)] max-w-2xl mb-10 leading-relaxed">
              {t("hero.subheadline")}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`#projects`}
                className="px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
              >
                {t("hero.cta_projects")}
              </a>
              <Link
                href={`/${locale}/contact`}
                className="px-5 py-2.5 border border-[var(--border)] text-sm font-medium rounded-lg text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                {t("hero.cta_contact")}
              </Link>
            </div>
            <div className="flex items-center gap-5 mt-6">
              <a
                href="https://www.linkedin.com/in/sareli-santiago-garcia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("social.linkedin")}
                className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/sarelisg3-sg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("social.github")}
                className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.809 1.304 3.495.997.107-.775.418-1.305.762-1.605-2.665-.303-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href={`/cv/CV_Sareli_Santiago_${locale.toUpperCase()}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("social.cv")}
                className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                <svg width="26" height="26" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M6 2h5l4 4v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" strokeLinejoin="round" />
                  <path d="M11 2v4h4" strokeLinejoin="round" />
                  <path d="M8.2 14l3.6-3.6" strokeLinecap="round" />
                  <path d="M9.4 10.2h2.4v2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
          <div className="shrink-0">
            <Image
              src="/sareli.png"
              alt="Sareli Santiago García"
              width={280}
              height={280}
              className="rounded-2xl object-cover object-top w-56 h-56 sm:w-64 sm:h-64"
              priority
            />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          {t("projects.section_title")}
        </h2>
        <p className="text-[var(--muted)] mb-10">
          {t("projects.section_subtitle")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
            />
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="border-t border-[var(--border)] bg-gray-50 dark:bg-white/[0.03]"
      >
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            {t("about.title")}
          </h2>
          <p className="text-[var(--muted)] max-w-2xl leading-relaxed mb-8">
            {t("about.body")}
          </p>
          <div>
            <p className="text-sm font-medium text-[var(--foreground)] mb-3">
              {t("about.skills_title")}
            </p>
            <div className="flex flex-wrap gap-2">
              {(t.raw("about.skills") as string[]).map((skill: string) => (
                <span
                  key={skill}
                  className="text-sm border border-[var(--border)] px-3 py-1 rounded-full text-[var(--muted)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <a
            href={`/cv/CV_Sareli_Santiago_${locale.toUpperCase()}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 2h5l4 4v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" strokeLinejoin="round" />
              <path d="M11 2v4h4" strokeLinejoin="round" />
              <path d="M8.2 14l3.6-3.6" strokeLinecap="round" />
              <path d="M9.4 10.2h2.4v2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("about.cv_link")}
          </a>
        </div>
      </section>

      {/* Certifications */}
      {certifications.length > 0 && (
        <section id="certifications" className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            {t("certifications.section_title")}
          </h2>
          <p className="text-[var(--muted)] mb-10">
            {t("certifications.section_subtitle")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certifications.map((certification) => (
              <CertificationCard
                key={certification.slug}
                certification={certification}
                locale={locale}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
