import type { ReactNode } from "react";

/** Short highlighted note — e.g. scope disclaimer or key takeaway. */
export function Callout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="not-prose my-8 rounded-xl border-l-4 border-[var(--accent)] bg-blue-50/60 dark:bg-blue-950/30 px-5 py-4">
      {title && (
        <p className="text-sm font-semibold text-[var(--foreground)] mb-1">{title}</p>
      )}
      <div className="text-sm text-[var(--foreground)] leading-relaxed [&_p]:m-0">
        {children}
      </div>
    </aside>
  );
}
