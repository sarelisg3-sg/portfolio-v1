"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Horizontal scroll container for very wide figures. Shows a fade on the right
 * edge and a "scroll" hint pill until the visitor starts scrolling.
 */
export function ScrollBox({
  hint,
  axis = "x",
  maxHeight,
  children,
}: {
  hint: string;
  axis?: "x" | "y";
  maxHeight?: number;
  children: ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Only show the hint when there is actually something to scroll to.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () =>
      setScrollable(axis === "x" ? el.scrollWidth > el.clientWidth + 8 : el.scrollHeight > el.clientHeight + 8);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [axis]);

  return (
    <div className="relative">
      <div
        ref={ref}
        className={axis === "x" ? "overflow-x-auto" : "overflow-y-auto"}
        style={axis === "y" ? { maxHeight } : undefined}
        onScroll={(e) => {
          const el = e.currentTarget;
          if (!scrolled && (axis === "x" ? el.scrollLeft : el.scrollTop) > 8) setScrolled(true);
        }}
      >
        {children}
      </div>
      {scrollable && !scrolled && (
        <>
          <div
            aria-hidden="true"
            className={
              axis === "x"
                ? "pointer-events-none absolute inset-y-0 right-0 w-24 rounded-r-xl bg-gradient-to-l from-[var(--background)] to-transparent"
                : "pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-xl bg-gradient-to-t from-[var(--background)] to-transparent"
            }
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inline-flex items-center gap-1.5 rounded-full bg-[var(--foreground)] px-3 py-1.5 text-xs font-medium text-[var(--background)] shadow-md animate-pulse ${
              axis === "x" ? "right-3 top-1/2 -translate-y-1/2" : "bottom-3 left-1/2 -translate-x-1/2"
            }`}
          >
            {hint}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {axis === "x" ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M12 5v14M6 13l6 6 6-6" />}
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
