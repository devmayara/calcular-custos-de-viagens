import type { TipoCombustivel } from "@/types/viagem";

export const CALCULATOR_PREFS_KEY = "nagota:calculator-prefs";

export type CalculatorPrefs = {
  tipoCombustivel: TipoCombustivel;
  precoCombustivel: string;
  consumoCarro: string;
  quantidadePassageiros: string;
};

const FUEL_TYPES: readonly TipoCombustivel[] = [
  "gasolina-comum",
  "gasolina-aditivada",
  "etanol",
  "diesel",
  "gnv",
] as const;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isTipoCombustivel(value: unknown): value is TipoCombustivel {
  return (
    typeof value === "string" &&
    (FUEL_TYPES as readonly string[]).includes(value)
  );
}

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function loadCalculatorPrefs(): CalculatorPrefs | null {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(CALCULATOR_PREFS_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;

    const record = parsed as Record<string, unknown>;
    const tipoCombustivel = record.tipoCombustivel;
    const precoCombustivel = asNonEmptyString(record.precoCombustivel);
    const consumoCarro = asNonEmptyString(record.consumoCarro);
    const quantidadePassageiros = asNonEmptyString(
      record.quantidadePassageiros
    );

    if (
      !isTipoCombustivel(tipoCombustivel) ||
      !precoCombustivel ||
      !consumoCarro ||
      !quantidadePassageiros
    ) {
      return null;
    }

    return {
      tipoCombustivel,
      precoCombustivel,
      consumoCarro,
      quantidadePassageiros,
    };
  } catch {
    return null;
  }
}

export function saveCalculatorPrefs(prefs: CalculatorPrefs): void {
  if (!isBrowser()) return;

  const payload: CalculatorPrefs = {
    tipoCombustivel: prefs.tipoCombustivel,
    precoCombustivel: prefs.precoCombustivel.trim(),
    consumoCarro: prefs.consumoCarro.trim(),
    quantidadePassageiros: prefs.quantidadePassageiros.trim(),
  };

  window.localStorage.setItem(CALCULATOR_PREFS_KEY, JSON.stringify(payload));
}

export function prefsToFormDefaults(
  prefs: CalculatorPrefs
): Pick<
  CalculatorPrefs,
  | "tipoCombustivel"
  | "precoCombustivel"
  | "consumoCarro"
  | "quantidadePassageiros"
> {
  return {
    tipoCombustivel: prefs.tipoCombustivel,
    precoCombustivel: prefs.precoCombustivel,
    consumoCarro: prefs.consumoCarro,
    quantidadePassageiros: prefs.quantidadePassageiros,
  };
}
