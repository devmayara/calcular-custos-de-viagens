import { jsonError, jsonOk } from "@/lib/api-response";
import { listarHistorico } from "@/lib/viagens-store";

/**
 * @swagger
 * /api/historico:
 *   get:
 *     tags:
 *       - Viagens
 *     summary: Lista o histórico de viagens calculadas
 *     description: |
 *       Retorna todas as viagens salvas em ordem decrescente por `createdAt`
 *       (mais recente primeiro).
 *       Se o header `x-session-id` for enviado (mesmo valor guardado no
 *       localStorage do cliente), filtra apenas as viagens daquela sessão.
 *     parameters:
 *       - in: header
 *         name: x-session-id
 *         required: false
 *         schema:
 *           type: string
 *         description: Identificador da sessão local (localStorage) do cliente
 *     responses:
 *       200:
 *         description: Lista de viagens ordenada da mais recente para a mais antiga
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - data
 *                 - total
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Viagem'
 *                 total:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
export async function GET(request: Request) {
  try {
    const sessionId = request.headers.get("x-session-id")?.trim() || undefined;
    const data = await listarHistorico(sessionId);

    return jsonOk({ data, total: data.length });
  } catch (error) {
    console.error("[GET /api/historico]", error);
    return jsonError(500, "Erro interno ao buscar o histórico de viagens");
  }
}
