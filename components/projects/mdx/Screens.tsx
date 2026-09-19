import Image from "next/image";
import { Zoomable } from "./Zoomable";

/** Row of mobile screens (prototype) — 2 columns on phones, 4 on desktop. */
export function Screens({
  items,
  caption,
  cols = 4,
  width = 780,
  height = 1688,
}: {
  items: { src: string; label?: string }[];
  caption?: string;
  /** Desktop column count (phones always show 2). */
  cols?: 4 | 5;
  /** Intrinsic pixel size of the screen images. */
  width?: number;
  height?: number;
}) {
  const colClass = cols === 5 ? "md:grid-cols-5" : "md:grid-cols-4";
  return (
    <figure className="my-10">
      <div className={`grid grid-cols-2 ${colClass} gap-4`}>
        {items.map((s) => (
          <div key={s.src} className="flex flex-col gap-2">
            <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-black">
              <Zoomable src={s.src} alt={s.label ?? ""}>
                <Image
                  src={s.src}
                  alt={s.label ?? ""}
                  width={width}
                  height={height}
                  sizes="(max-width: 768px) 50vw, 200px"
                  className="w-full h-auto !my-0"
                />
              </Zoomable>
            </div>
            {s.label && (
              <span className="text-xs text-[var(--muted)] text-center">{s.label}</span>
            )}
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
