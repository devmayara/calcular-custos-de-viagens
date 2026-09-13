export const TIPO_COMBUSTIVEL_LABEL: Record<string, string> = {
  gasolina: "Gasolina",
  etanol: "Etanol",
  diesel: "Diesel",
  gnv: "GNV",
};

export const TIPO_TRAJETO_LABEL: Record<string, string> = {
  ida: "Ida",
  "ida-volta": "Ida e volta",
};

export function labelCombustivel(tipo?: string): string | null {
  if (!tipo) return null;
  return TIPO_COMBUSTIVEL_LABEL[tipo] ?? tipo;
}

export function labelTrajeto(tipo?: string): string | null {
  if (!tipo) return null;
  return TIPO_TRAJETO_LABEL[tipo] ?? tipo;
}
