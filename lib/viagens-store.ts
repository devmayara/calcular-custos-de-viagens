import { randomUUID } from "node:crypto";
import type { CalcularCustoInput, Viagem } from "@/types/viagem";
import { calcularCustoViagem } from "@/lib/calcular-custo";

/**
 * Monta o registro da viagem a partir do cálculo.
 * Persistência fica no cliente (localStorage) para funcionar em serverless (Vercel).
 */
export function criarViagem(
  input: CalcularCustoInput,
  sessionId?: string
): Viagem {
  const quantidadePassageiros = input.quantidadePassageiros ?? 1;
  const tipoCombustivel = input.tipoCombustivel ?? "gasolina-comum";
  const tipoTrajeto = input.tipoTrajeto ?? "ida";
  const distanciaFonte = input.distanciaFonte ?? "manual";

  const calculo = calcularCustoViagem({
    ...input,
    quantidadePassageiros,
  });

  return {
    id: randomUUID(),
    origem: input.origem?.trim() || undefined,
    destino: input.destino?.trim() || undefined,
    distanciaKm: input.distanciaKm,
    precoCombustivel: input.precoCombustivel,
    consumoCarro: input.consumoCarro,
    quantidadePassageiros,
    tipoCombustivel,
    tipoTrajeto,
    distanciaFonte,
    ...calculo,
    ...(sessionId ? { sessionId } : {}),
    createdAt: new Date().toISOString(),
  };
}
