import { jsonError, jsonOk } from "@/lib/api-response";
import { calcularDistanciaRota, type RotaPoint } from "@/lib/google-maps";

type PointBody = {
  placeId?: string;
  lat?: number;
  lng?: number;
  address?: string;
};

function toRotaPoint(point: PointBody | undefined): RotaPoint | null {
  if (!point || typeof point !== "object") return null;

  const hasCoords =
    typeof point.lat === "number" &&
    Number.isFinite(point.lat) &&
    typeof point.lng === "number" &&
    Number.isFinite(point.lng);

  if (hasCoords) {
    if (typeof point.placeId === "string" && point.placeId.trim()) {
      return {
        placeId: point.placeId.trim(),
        lat: point.lat,
        lng: point.lng,
      };
    }
    return { lat: point.lat as number, lng: point.lng as number };
  }

  if (typeof point.placeId === "string" && point.placeId.trim()) {
    return { placeId: point.placeId.trim() };
  }

  if (typeof point.address === "string" && point.address.trim()) {
    return { address: point.address.trim() };
  }

  return null;
}

/**
 * @swagger
 * /api/rota:
 *   post:
 *     tags:
 *       - Maps
 *     summary: Distância de condução entre origem e destino
 */
export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonError(400, "JSON inválido no body da requisição");
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return jsonError(400, "Body inválido");
    }

    const payload = body as { origem?: PointBody; destino?: PointBody };
    const origem = toRotaPoint(payload.origem);
    const destino = toRotaPoint(payload.destino);

    if (!origem || !destino) {
      return jsonError(
        400,
        "Informe origem e destino com placeId, coordenadas ou endereço"
      );
    }

    const resultado = await calcularDistanciaRota(origem, destino);
    return jsonOk(resultado);
  } catch (error) {
    console.error("[POST /api/rota]", error);
    return jsonError(
      502,
      error instanceof Error
        ? error.message
        : "Não foi possível calcular a distância da rota"
    );
  }
}
