"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

/**
 * Click/tap-to-enlarge wrapper for figure images. Renders the thumbnail (children)
 * with an expand hint, and a full-screen viewer showing the original file.
 * In the viewer, a second click toggles 1:1 zoom (scrollable).
 */
export function Zoomable({
  src,
  zoomSrc,
  alt,
  children,
}: {
  src: string;
  /** Optional larger file to open in the viewer (e.g. a full-page capture). */
  zoomSrc?: string;
  alt: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setZoomed(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Zoom: ${alt}`}
        className="group/zoom relative block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        {children}
        {/* expand hint: appears on hover (pointer devices); faintly visible on touch screens */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover/zoom:opacity-100 [@media(hover:none)]:opacity-60"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
          className={`fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm ${
            zoomed ? "overflow-auto" : "flex items-center justify-center p-4 sm:p-8"
          }`}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="fixed top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 text-white text-xl leading-none hover:bg-white/20 transition-colors"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zoomSrc ?? src}
            alt={alt}
            onClick={(e) => {
              e.stopPropagation();
              setZoomed((z) => !z);
            }}
            className={
              zoomed
                ? "block max-w-none cursor-zoom-out m-auto p-4"
                : "max-h-full max-w-full object-contain cursor-zoom-in rounded-lg shadow-2xl"
            }
          />
          {!zoomed && (
            <p className="pointer-events-none fixed bottom-4 left-0 right-0 text-center text-xs text-white/60">
              Click · 100 %  —  Esc
            </p>
          )}
        </div>
      )}
    </>
  );
}
