import type { ReactNode } from "react";

/** Verbatim participant/user quote with attribution. */
export function Quote({ who, children }: { who: string; children: ReactNode }) {
  return (
    <figure className="not-prose my-6 border-l-2 border-[var(--border)] pl-5">
      <blockquote className="text-lg leading-relaxed text-[var(--foreground)] italic">
        {children}
      </blockquote>
      <figcaption className="mt-2 text-sm text-[var(--muted)]">— {who}</figcaption>
    </figure>
  );
}
