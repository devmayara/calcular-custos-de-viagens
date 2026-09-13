import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { CalcularCustoInput, Viagem } from "@/types/viagem";
import { calcularCustoViagem } from "@/lib/calcular-custo";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "viagens.json");

async function ensureDataFile(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(DATA_FILE, "utf-8");
  } catch {
    await writeFile(DATA_FILE, "[]", "utf-8");
  }
}

async function lerViagens(): Promise<Viagem[]> {
  await ensureDataFile();
  const raw = await readFile(DATA_FILE, "utf-8");

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as Viagem[]) : [];
  } catch {
    return [];
  }
}

async function salvarViagens(viagens: Viagem[]): Promise<void> {
  await ensureDataFile();
  await writeFile(DATA_FILE, JSON.stringify(viagens, null, 2), "utf-8");
}

export async function registrarViagem(
  input: CalcularCustoInput,
  sessionId?: string
): Promise<Viagem> {
  const quantidadePassageiros = input.quantidadePassageiros ?? 1;
  const calculo = calcularCustoViagem({
    ...input,
    quantidadePassageiros,
  });

  const viagem: Viagem = {
    id: randomUUID(),
    destino: input.destino?.trim() || undefined,
    distanciaKm: input.distanciaKm,
    precoCombustivel: input.precoCombustivel,
    consumoCarro: input.consumoCarro,
    quantidadePassageiros,
    ...calculo,
    ...(sessionId ? { sessionId } : {}),
    createdAt: new Date().toISOString(),
  };

  const viagens = await lerViagens();
  viagens.push(viagem);
  await salvarViagens(viagens);

  return viagem;
}

export async function listarHistorico(sessionId?: string): Promise<Viagem[]> {
  const viagens = await lerViagens();

  const filtradas = sessionId
    ? viagens.filter((viagem) => viagem.sessionId === sessionId)
    : viagens;

  return filtradas.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
