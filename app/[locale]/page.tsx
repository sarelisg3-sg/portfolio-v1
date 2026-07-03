import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/projects/ProjectCard";
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
                className="px-5 py-2.5 border border-[var(--border)] text-sm font-medium rounded-lg text-[var(--foreground)] hover:bg-gray-50 transition-colors"
              >
                {t("hero.cta_contact")}
              </Link>
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
        className="border-t border-[var(--border)] bg-gray-50"
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
        </div>
      </section>
    </>
  );
}
