"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-8 mt-16">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[var(--muted)]">
        <span>{t("made_with")}</span>
        <span>© {year} Sareli Santiago García. {t("rights")}.</span>
      </div>
    </footer>
  );
}
