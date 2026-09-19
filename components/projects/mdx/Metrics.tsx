/** Big-number stats row used inside project pages. */
export function Metrics({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <div className="not-prose my-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
      {items.map((m) => (
        <div
          key={m.label}
          className="rounded-xl border border-[var(--border)] px-5 py-4 bg-gray-50 dark:bg-white/[0.03]"
        >
          <div className="text-3xl font-bold tracking-tight text-[var(--accent)]">
            {m.value}
          </div>
          <div className="mt-1 text-sm text-[var(--muted)] leading-snug">{m.label}</div>
        </div>
      ))}
    </div>
  );
}
