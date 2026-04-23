const BOOKMARK_KEY = "hairfolio.bookmarks";
const VIEWED_KEY = "hairfolio.viewed";

function safeParse(input: string | null): string[] {
  if (!input) return [];
  try {
    const parsed = JSON.parse(input);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function unique(items: string[]) {
  return Array.from(new Set(items));
}

export function getBookmarkedDesignerIds() {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(BOOKMARK_KEY));
}

export function toggleBookmarkedDesignerId(designerId: string) {
  if (typeof window === "undefined") return [];
  const current = getBookmarkedDesignerIds();
  const exists = current.includes(designerId);
  const next = exists
    ? current.filter((item) => item !== designerId)
    : unique([designerId, ...current]);
  window.localStorage.setItem(BOOKMARK_KEY, JSON.stringify(next));
  return next;
}

export function getViewedDesignerIds() {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(VIEWED_KEY));
}

export function addViewedDesignerId(designerId: string) {
  if (typeof window === "undefined") return [];
  const current = getViewedDesignerIds();
  const next = unique([designerId, ...current]).slice(0, 20);
  window.localStorage.setItem(VIEWED_KEY, JSON.stringify(next));
  return next;
}
