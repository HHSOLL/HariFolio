import type { DesignerPageCustomization } from "@/lib/types";

const BOOKMARK_KEY = "hairfolio.bookmarks";
const VIEWED_KEY = "hairfolio.viewed";
const DESIGNER_CUSTOM_KEY = "hairfolio.designer-customizations";
const AUTH_SESSION_KEY = "hairfolio.auth-session";
export const DESIGNER_CUSTOM_EVENT = "hairfolio-designer-customization";
export const AUTH_SESSION_EVENT = "hairfolio-auth-session";

interface AuthSession {
  role: "general" | "designer";
  designerSlug?: string;
}

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

function safeParseObject(input: string | null): Record<string, DesignerPageCustomization> {
  if (!input) return {};
  try {
    const parsed = JSON.parse(input);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as Record<string, DesignerPageCustomization>;
  } catch {
    return {};
  }
}

function safeParseAuthSession(input: string | null): AuthSession | null {
  if (!input) return null;
  try {
    const parsed = JSON.parse(input);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    if (parsed.role !== "general" && parsed.role !== "designer") return null;
    return parsed as AuthSession;
  } catch {
    return null;
  }
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

export function getDesignerCustomization(designerSlug: string): DesignerPageCustomization | null {
  if (typeof window === "undefined") return null;
  const map = safeParseObject(window.localStorage.getItem(DESIGNER_CUSTOM_KEY));
  return map[designerSlug] ?? null;
}

export function setDesignerCustomization(customization: DesignerPageCustomization) {
  if (typeof window === "undefined") return null;
  const map = safeParseObject(window.localStorage.getItem(DESIGNER_CUSTOM_KEY));
  map[customization.designerSlug] = customization;
  window.localStorage.setItem(DESIGNER_CUSTOM_KEY, JSON.stringify(map));
  window.dispatchEvent(new CustomEvent(DESIGNER_CUSTOM_EVENT, { detail: customization.designerSlug }));
  return customization;
}

export function getAuthSession() {
  if (typeof window === "undefined") return null;
  return safeParseAuthSession(window.localStorage.getItem(AUTH_SESSION_KEY));
}

export function setAuthSession(session: AuthSession) {
  if (typeof window === "undefined") return null;
  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new CustomEvent(AUTH_SESSION_EVENT, { detail: session.role }));
  return session;
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_SESSION_KEY);
  window.dispatchEvent(new CustomEvent(AUTH_SESSION_EVENT, { detail: null }));
}
