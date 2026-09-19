import Image from "next/image";

/** Image with caption. `width`/`height` are the intrinsic pixel size (keeps layout stable). */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  max = "full",
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  max?: "full" | "sm";
}) {
  return (
    <figure className={`my-10 ${max === "sm" ? "max-w-sm mx-auto" : ""}`}>
      <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-gray-50 dark:bg-white/5">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 768px"
          className="w-full h-auto !my-0"
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
