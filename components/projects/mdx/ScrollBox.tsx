"use client";

import { useState, type ReactNode } from "react";

/**
 * Horizontal scroll container for very wide figures. Shows a fade on the right
 * edge and a "scroll" hint pill until the visitor starts scrolling.
 */
export function ScrollBox({ hint, children }: { hint: string; children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  return (
    <div className="relative">
      <div
        className="overflow-x-auto"
        onScroll={(e) => {
          if (!scrolled && e.currentTarget.scrollLeft > 8) setScrolled(true);
        }}
      >
        {children}
      </div>
      {!scrolled && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-24 rounded-r-xl bg-gradient-to-l from-[var(--background)] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-full bg-[var(--foreground)] px-3 py-1.5 text-xs font-medium text-[var(--background)] shadow-md animate-pulse"
          >
            {hint}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
