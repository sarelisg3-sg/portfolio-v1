"use client";

function toggle() {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-1.5 rounded-md text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        className="block dark:hidden"
      >
        <path d="M17 10.5A7 7 0 1 1 9.5 3a5.5 5.5 0 0 0 7.5 7.5z" strokeLinejoin="round" />
      </svg>
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        className="hidden dark:block"
      >
        <circle cx="10" cy="10" r="4" />
        <path d="M10 2v2M10 16v2M18 10h-2M4 10H2M15.5 4.5l-1.4 1.4M5.9 14.1l-1.4 1.4M15.5 15.5l-1.4-1.4M5.9 5.9L4.5 4.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
