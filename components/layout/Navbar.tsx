"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/routing";

const LOCALES: Locale[] = ["es", "en", "fr"];

export function Navbar({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function switchLocale(next: Locale) {
    const segments = pathname.split("/");
    segments[1] = next;
    return segments.join("/");
  }

  const navLinks = (
    <>
      <Link
        href={`/${locale}#projects`}
        onClick={() => setOpen(false)}
        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        {t("projects")}
      </Link>
      <Link
        href={`/${locale}#about`}
        onClick={() => setOpen(false)}
        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        {t("about")}
      </Link>
      <Link
        href={`/${locale}/contact`}
        onClick={() => setOpen(false)}
        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        {t("contact")}
      </Link>
    </>
  );

  const localeSwitcher = (
    <div className="flex items-center gap-1 border border-[var(--border)] rounded-md overflow-hidden w-fit">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={switchLocale(l)}
          onClick={() => setOpen(false)}
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
  );

  return (
    <header className="border-b border-[var(--border)] bg-white/90 backdrop-blur-sm sticky top-0 z-40">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
        >
          Sareli
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks}
          <div className="ml-2">{localeSwitcher}</div>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden p-2 -mr-2 text-[var(--foreground)]"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-white px-6 py-4 flex flex-col gap-4">
          {navLinks}
          {localeSwitcher}
        </div>
      )}
    </header>
  );
}
