import { getSessionId } from "@/lib/session";
import type {
  ApiErrorBody,
  CalcularCustoInput,
  Viagem,
} from "@/types/viagem";

export type HistoricoResponse = {
  data: Viagem[];
  total: number;
};

function sessionHeaders(init?: HeadersInit): Headers {
  const headers = new Headers(init);
  const sessionId = getSessionId();

  if (sessionId) {
    headers.set("x-session-id", sessionId);
  }

  return headers;
}

async function parseError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as ApiErrorBody;
    if (body.details?.length) {
      return `${body.error}: ${body.details.join("; ")}`;
    }
    return body.error || `Erro ${response.status}`;
  } catch {
    return `Erro ${response.status}`;
  }
}

export async function postCalcular(
  input: CalcularCustoInput
): Promise<Viagem> {
  const response = await fetch("/api/calcular", {
    method: "POST",
    headers: sessionHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as Viagem;
}

export async function getHistorico(): Promise<HistoricoResponse> {
  const response = await fetch("/api/historico", {
    method: "GET",
    headers: sessionHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as HistoricoResponse;
}
