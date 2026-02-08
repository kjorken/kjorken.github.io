/**
 * Theme management — 2-state toggle (light / dark).
 *
 * Behavior:
 * 1. First visit / no stored preference: default to dark.
 * 2. After user toggles: persist in `localStorage`.
 * 3. A minimal inline script in BaseLayout.astro prevents flash (FOUC).
 * 4. This module handles post-load sync and view-transition re-application.
 */

const THEME_KEY = "theme";

/** Read the effective theme: stored preference or default dark. */
function getTheme(): "dark" | "light" {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return "dark";
}

/** Apply theme class to <html> without writing to localStorage. */
function apply(theme: "dark" | "light") {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/** Toggle between light and dark, persisting the user's choice. */
export function toggleTheme() {
  const next = getTheme() === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  apply(next);
}

/* ---- Lifecycle hooks ---- */

// Re-apply after Astro view transitions swap the DOM.
document.addEventListener("astro:after-swap", () => apply(getTheme()));

