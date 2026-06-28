"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/routing";

const LOCALES: Locale[] = ["es", "en", "fr"];

export function Navbar({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  function switchLocale(next: Locale) {
    const segments = pathname.split("/");
    segments[1] = next;
    return segments.join("/");
  }

  return (
    <header className="border-b border-[var(--border)] bg-white/90 backdrop-blur-sm sticky top-0 z-40">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
        >
          Sareli
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href={`/${locale}#projects`}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            {t("projects")}
          </Link>
          <Link
            href={`/${locale}#about`}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            {t("about")}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            {t("contact")}
          </Link>

          <div className="flex items-center gap-1 ml-2 border border-[var(--border)] rounded-md overflow-hidden">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={switchLocale(l)}
                className={`px-2 py-1 text-xs font-medium uppercase transition-colors ${
                  l === locale
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-gray-50"
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
