/** Live app embedded in the page (the app renders its own phone frame). */
export function AppEmbed({
  src,
  title,
  caption,
  height = 860,
}: {
  src: string;
  title: string;
  caption?: string;
  height?: number;
}) {
  return (
    <figure className="not-prose my-10">
      <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[#0f0f0f]">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="w-full block"
          style={{ height }}
          allow="clipboard-write"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-[var(--muted)] text-center leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
