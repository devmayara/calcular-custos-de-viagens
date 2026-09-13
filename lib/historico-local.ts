import type { Viagem } from "@/types/viagem";

const HISTORICO_STORAGE_KEY = "calcula-custo-historico";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function lerRaw(): Viagem[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(HISTORICO_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as Viagem[]) : [];
  } catch {
    return [];
  }
}

function salvarRaw(viagens: Viagem[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(HISTORICO_STORAGE_KEY, JSON.stringify(viagens));
}

export function salvarViagemLocal(viagem: Viagem): void {
  const viagens = lerRaw();
  viagens.push(viagem);
  salvarRaw(viagens);
}

export function listarHistoricoLocal(): Viagem[] {
  return lerRaw().sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
