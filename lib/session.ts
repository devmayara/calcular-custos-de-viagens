const SESSION_STORAGE_KEY = "calcula-custo-session-id";

export function getSessionId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing?.trim()) {
    return existing.trim();
  }

  const created =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(SESSION_STORAGE_KEY, created);
  return created;
}
