"use client";

import { useEffect, useState } from "react";

/** Sticky "on this page" nav — highlights the section currently in view. */
export function ProjectToc({
  headings,
  label,
}: {
  headings: { id: string; text: string }[];
  label: string;
}) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    // Active = last heading whose top has scrolled past the sticky-header line.
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = 120;
      let current = headings[0]?.id ?? "";
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= line) current = h.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav aria-label={label} className="text-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-3">
        {label}
      </p>
      <ol className="space-y-2 border-l border-[var(--border)]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block -ml-px pl-4 border-l-2 leading-snug transition-colors ${
                active === h.id
                  ? "border-[var(--accent)] text-[var(--foreground)] font-medium"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
