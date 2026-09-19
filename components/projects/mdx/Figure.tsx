import Image from "next/image";
import { Zoomable } from "./Zoomable";
import { ScrollBox } from "./ScrollBox";

/** Image with caption. `width`/`height` are the intrinsic pixel size (keeps layout stable). */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  max = "full",
  scroll = false,
  scrollHint = "Scroll",
  scrollWidth = 2400,
  maxHeight,
  zoomSrc,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  max?: "full" | "sm";
  /** Very wide images: show at a readable height with horizontal scrolling. */
  scroll?: boolean;
  /** Label of the hint pill shown until the visitor scrolls (localized by the page). */
  scrollHint?: string;
  /** Rendered width (px) of a horizontally scrolling image. */
  scrollWidth?: number;
  /** Very tall images: cap the height and scroll vertically. */
  maxHeight?: number;
  /** Larger file to open in the zoom viewer (defaults to src). */
  zoomSrc?: string;
}) {
  return (
    <figure className={`my-10 ${max === "sm" ? "max-w-sm mx-auto" : ""}`}>
      <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-gray-50 dark:bg-white/5">
        {scroll ? (
          <ScrollBox hint={scrollHint}>
            <Zoomable src={src} zoomSrc={zoomSrc} alt={alt}>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes={`${scrollWidth}px`}
                quality={90}
                className="h-auto !my-0"
                style={{ minWidth: scrollWidth }}
              />
            </Zoomable>
          </ScrollBox>
        ) : maxHeight ? (
          <ScrollBox hint={scrollHint} axis="y" maxHeight={maxHeight}>
            <Zoomable src={src} zoomSrc={zoomSrc} alt={alt}>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={90}
                className="w-full h-auto !my-0"
              />
            </Zoomable>
          </ScrollBox>
        ) : (
          <Zoomable src={src} zoomSrc={zoomSrc} alt={alt}>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="(max-width: 768px) 100vw, 1200px"
              quality={90}
              className="w-full h-auto !my-0"
            />
          </Zoomable>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-[var(--muted)] text-center leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
