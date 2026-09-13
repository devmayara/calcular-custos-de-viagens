import type { CalcularCustoInput } from "@/types/viagem";

type ValidationSuccess = {
  ok: true;
  data: CalcularCustoInput;
};

type ValidationFailure = {
  ok: false;
  status: number;
  error: string;
  details?: string[];
};

export type ValidationResult = ValidationSuccess | ValidationFailure;

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function validarCalcularBody(body: unknown): ValidationResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      ok: false,
      status: 400,
      error: "Body inválido. Envie um objeto JSON.",
    };
  }

  const payload = body as Record<string, unknown>;
  const details: string[] = [];

  if (payload.destino !== undefined && typeof payload.destino !== "string") {
    details.push("destino deve ser uma string");
  }

  if (payload.distanciaKm === undefined) {
    details.push("distanciaKm é obrigatório");
  } else if (!isNumber(payload.distanciaKm)) {
    details.push("distanciaKm deve ser um número");
  } else if (payload.distanciaKm <= 0) {
    details.push("distanciaKm deve ser maior que zero");
  }

  if (payload.precoCombustivel === undefined) {
    details.push("precoCombustivel é obrigatório");
  } else if (!isNumber(payload.precoCombustivel)) {
    details.push("precoCombustivel deve ser um número");
  } else if (payload.precoCombustivel < 0) {
    details.push("precoCombustivel não pode ser negativo");
  }

  if (payload.consumoCarro === undefined) {
    details.push("consumoCarro é obrigatório");
  } else if (!isNumber(payload.consumoCarro)) {
    details.push("consumoCarro deve ser um número");
  } else if (payload.consumoCarro <= 0) {
    return {
      ok: false,
      status: 400,
      error: "Consumo não pode ser zero",
    };
  }

  if (payload.quantidadePassageiros !== undefined) {
    if (!isNumber(payload.quantidadePassageiros)) {
      details.push("quantidadePassageiros deve ser um número");
    } else if (
      !Number.isInteger(payload.quantidadePassageiros) ||
      payload.quantidadePassageiros < 1
    ) {
      details.push("quantidadePassageiros deve ser um inteiro maior ou igual a 1");
    }
  }

  if (details.length > 0) {
    return {
      ok: false,
      status: 400,
      error: "Dados de entrada inválidos",
      details,
    };
  }

  return {
    ok: true,
    data: {
      destino: payload.destino as string | undefined,
      distanciaKm: payload.distanciaKm as number,
      precoCombustivel: payload.precoCombustivel as number,
      consumoCarro: payload.consumoCarro as number,
      quantidadePassageiros:
        (payload.quantidadePassageiros as number | undefined) ?? 1,
    },
  };
}
