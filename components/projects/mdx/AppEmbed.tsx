"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Live app embedded in the page. With `desktopWidth`, the iframe renders at that
 * width and is scaled down to fit the column, so desktop layouts keep their
 * proportions instead of collapsing to a mobile breakpoint.
 */
export function AppEmbed({
  src,
  title,
  caption,
  height = 860,
  desktopWidth,
  openLabel = "Open in a new tab",
}: {
  src: string;
  title: string;
  caption?: string;
  height?: number;
  desktopWidth?: number;
  /** Label of the "open in a new tab" link (localized by the page). */
  openLabel?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!desktopWidth || !boxRef.current) return;
    const el = boxRef.current;
    const update = () => setScale(Math.min(1, el.clientWidth / desktopWidth));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [desktopWidth]);

  const scaled = !!desktopWidth;
  const host = src.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  return (
    <figure className="not-prose my-10">
      {/* toolbar: where it runs + open full size */}
      <div className="flex items-center justify-between gap-3 rounded-t-2xl border border-b-0 border-[var(--border)] bg-gray-50 px-4 py-2 text-xs text-[var(--muted)] dark:bg-white/[0.03]">
        <span className="truncate font-mono">{host}</span>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 font-medium text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
        >
          {openLabel}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
          </svg>
        </a>
      </div>
      <div
        ref={boxRef}
        className="relative rounded-b-2xl overflow-hidden border border-[var(--border)] bg-[#0f0f0f]"
        style={{ height: scaled ? Math.round(height * scale) : height }}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="clipboard-write"
          className="block"
          style={
            scaled
              ? { width: desktopWidth, height, transform: `scale(${scale})`, transformOrigin: "top left" }
              : { width: "100%", height }
          }
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
