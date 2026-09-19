import Image from "next/image";
import { Zoomable } from "./Zoomable";

/** Image with caption. `width`/`height` are the intrinsic pixel size (keeps layout stable). */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  max = "full",
  scroll = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  max?: "full" | "sm";
  /** Very wide images: show at a readable height with horizontal scrolling. */
  scroll?: boolean;
}) {
  return (
    <figure className={`my-10 ${max === "sm" ? "max-w-sm mx-auto" : ""}`}>
      <div
        className={`rounded-xl border border-[var(--border)] bg-gray-50 dark:bg-white/5 ${
          scroll ? "overflow-x-auto" : "overflow-hidden"
        }`}
      >
        <Zoomable src={src} alt={alt}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={scroll ? "2400px" : "(max-width: 768px) 100vw, 768px"}
            className={scroll ? "h-auto !my-0 min-w-[2400px]" : "w-full h-auto !my-0"}
          />
        </Zoomable>
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-[var(--muted)] text-center leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
