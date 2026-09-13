import { jsonError, jsonOk } from "@/lib/api-response";

/**
 * @swagger
 * /api/historico:
 *   get:
 *     tags:
 *       - Viagens
 *     summary: Lista o histórico de viagens calculadas
 *     description: |
 *       O histórico é persistido no localStorage do cliente.
 *       Este endpoint existe por compatibilidade e retorna lista vazia;
 *       use `listarHistoricoLocal` no front-end.
 *     responses:
 *       200:
 *         description: Lista vazia (histórico é local no cliente)
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
 *                   example: 0
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
export async function GET() {
  try {
    return jsonOk({ data: [], total: 0 });
  } catch (error) {
    console.error("[GET /api/historico]", error);
    return jsonError(500, "Erro interno ao buscar o histórico de viagens");
  }
}
