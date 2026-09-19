import Image from "next/image";

/** Row of mobile screens (prototype) — 2 columns on phones, 4 on desktop. */
export function Screens({
  items,
  caption,
}: {
  items: { src: string; label: string }[];
  caption?: string;
}) {
  return (
    <figure className="my-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((s) => (
          <div key={s.src} className="flex flex-col gap-2">
            <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-black">
              <Image
                src={s.src}
                alt={s.label}
                width={780}
                height={1688}
                sizes="(max-width: 768px) 50vw, 200px"
                className="w-full h-auto !my-0"
              />
            </div>
            <span className="text-xs text-[var(--muted)] text-center">{s.label}</span>
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-[var(--muted)] text-center leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
