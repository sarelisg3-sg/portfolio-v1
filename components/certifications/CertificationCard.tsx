import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Certification } from "@/types/certification";

export function CertificationCard({
  certification,
}: {
  certification: Certification;
  locale: string;
}) {
  const t = useTranslations("certifications");
  const { frontmatter } = certification;

  return (
    <article className="flex flex-col rounded-2xl border border-[var(--border)] overflow-hidden bg-white dark:bg-white/[0.02]">
      <div className="relative aspect-[16/9] bg-gray-100 dark:bg-white/5 overflow-hidden">
        {frontmatter.image ? (
          <Image
            src={frontmatter.image}
            alt={frontmatter.imageAlt ?? frontmatter.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--muted)] text-sm">{frontmatter.issuer}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 gap-2">
        <h3 className="font-semibold text-lg leading-snug text-[var(--foreground)]">
          {frontmatter.title}
        </h3>
        <p className="text-sm text-[var(--muted)]">
          {frontmatter.issuer}
          {frontmatter.date ? ` · ${frontmatter.date}` : ""}
        </p>
        {frontmatter.description && (
          <p className="text-sm text-[var(--muted)] mt-1">{frontmatter.description}</p>
        )}
        {frontmatter.credentialId && (
          <p className="text-xs text-[var(--muted)]">
            {t("credential_id")}: {frontmatter.credentialId}
          </p>
        )}

        {frontmatter.credentialUrl && (
          <a
            href={frontmatter.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-3 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
          >
            {t("view_credential")} ↗
          </a>
        )}
      </div>
    </article>
  );
}
