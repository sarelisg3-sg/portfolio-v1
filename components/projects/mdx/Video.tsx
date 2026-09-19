/** Self-hosted video (MP4 in /public). Loads nothing until the visitor presses play. */
export function Video({
  src,
  poster,
  caption,
}: {
  src: string;
  poster?: string;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-10">
      <video
        src={src}
        poster={poster}
        controls
        preload="none"
        playsInline
        className="w-full aspect-video rounded-xl border border-[var(--border)] bg-black"
      />
      {caption && (
        <figcaption className="mt-3 text-sm text-[var(--muted)] text-center">{caption}</figcaption>
      )}
    </figure>
  );
}
