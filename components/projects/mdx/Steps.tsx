/** Horizontal task flow rendered as numbered steps (wraps on small screens). */
export function Steps({ items, caption }: { items: string[]; caption?: string }) {
  return (
    <figure className="not-prose my-8">
      <ol className="flex flex-wrap items-stretch gap-2">
        {items.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <div className="flex h-full max-w-[13rem] items-start gap-2 rounded-lg border border-[var(--border)] bg-gray-50 px-3 py-2 text-sm leading-snug text-[var(--foreground)] dark:bg-white/[0.03]">
              <span className="mt-px shrink-0 text-xs font-semibold text-[var(--accent)]">{i + 1}</span>
              <span>{step}</span>
            </div>
            {i < items.length - 1 && (
              <span aria-hidden="true" className="text-[var(--muted)]">→</span>
            )}
          </li>
        ))}
      </ol>
      {caption && (
        <figcaption className="mt-3 text-sm text-[var(--muted)] text-center">{caption}</figcaption>
      )}
    </figure>
  );
}
