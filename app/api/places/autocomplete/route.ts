import { jsonError, jsonOk } from "@/lib/api-response";
import { buscarPlacesAutocomplete } from "@/lib/google-maps";

/**
 * @swagger
 * /api/places/autocomplete:
 *   get:
 *     tags:
 *       - Maps
 *     summary: Sugestões de lugares (Google Places ou OpenStreetMap)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get("input")?.trim() ?? "";
    const sessionToken = searchParams.get("sessionToken")?.trim() || undefined;

    if (input.length < 3) {
      return jsonOk({ suggestions: [] });
    }

    const suggestions = await buscarPlacesAutocomplete(input, sessionToken);
    return jsonOk({ suggestions });
  } catch (error) {
    console.error("[GET /api/places/autocomplete]", error);
    return jsonError(
      502,
      error instanceof Error
        ? error.message
        : "Não foi possível buscar sugestões de lugares"
    );
  }
}
