import { jsonError, jsonOk } from "@/lib/api-response";
import { validarCalcularBody } from "@/lib/validar-calcular";
import { criarViagem } from "@/lib/viagens-store";

/**
 * @swagger
 * /api/calcular:
 *   post:
 *     tags:
 *       - Viagens
 *     summary: Calcula o custo de uma viagem
 *     description: |
 *       Calcula litros totais, custo total, custo por km e custo por pessoa.
 *       A persistência do histórico é feita no cliente (localStorage).
 *       Envie o header `x-session-id` (valor do localStorage no cliente) para
 *       associar o cálculo à sessão do usuário.
 *     parameters:
 *       - in: header
 *         name: x-session-id
 *         required: false
 *         schema:
 *           type: string
 *         description: Identificador da sessão local (localStorage) do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CalcularCustoRequest'
 *           example:
 *             destino: "Rio de Janeiro"
 *             distanciaKm: 400
 *             precoCombustivel: 5.89
 *             consumoCarro: 12.5
 *             quantidadePassageiros: 2
 *     responses:
 *       201:
 *         description: Cálculo realizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viagem'
 *       400:
 *         description: Dados inválidos ou consumo <= 0
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             examples:
 *               consumoZero:
 *                 value:
 *                   error: "Consumo não pode ser zero"
 *               validacao:
 *                 value:
 *                   error: "Dados de entrada inválidos"
 *                   details:
 *                     - "distanciaKm é obrigatório"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return jsonError(400, "JSON inválido no body da requisição");
    }

    const validation = validarCalcularBody(body);

    if (!validation.ok) {
      return jsonError(validation.status, validation.error, validation.details);
    }

    const sessionId = request.headers.get("x-session-id")?.trim() || undefined;
    const viagem = criarViagem(validation.data, sessionId);

    return jsonOk(viagem, 201);
  } catch (error) {
    console.error("[POST /api/calcular]", error);
    return jsonError(500, "Erro interno ao calcular o custo da viagem");
  }
}
