import { jsonError, jsonOk } from "@/lib/api-response";
import { reverseGeocodeNominatim } from "@/lib/osm-maps";

/**
 * @swagger
 * /api/places/reverse:
 *   get:
 *     tags:
 *       - Maps
 *     summary: Endereço a partir de coordenadas (reverse geocode)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = Number(searchParams.get("lat"));
    const lng = Number(searchParams.get("lng"));

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return jsonError(400, "Informe lat e lng válidos");
    }

    const result = await reverseGeocodeNominatim(lat, lng);

    if (!result) {
      return jsonError(404, "Não foi possível obter o endereço desta localização");
    }

    return jsonOk({
      label: result.label,
      lat: result.lat,
      lng: result.lng,
    });
  } catch (error) {
    console.error("[GET /api/places/reverse]", error);
    return jsonError(
      502,
      error instanceof Error
        ? error.message
        : "Não foi possível obter o endereço da localização"
    );
  }
}
