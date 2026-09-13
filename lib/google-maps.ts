import {
  isGoogleMapsEnabled,
  requireGoogleMapsApiKey,
} from "@/lib/google-maps-config";
import {
  buscarPlacesNominatim,
  calcularDistanciaOsrm,
  geocodeNominatim,
} from "@/lib/osm-maps";
import type { PlaceSuggestion, RotaResultado } from "@/types/viagem";

type AutocompletePrediction = {
  place_id: string;
  description: string;
};

type AutocompleteResponse = {
  status: string;
  error_message?: string;
  predictions?: AutocompletePrediction[];
};

type DistanceMatrixResponse = {
  status: string;
  error_message?: string;
  rows?: Array<{
    elements?: Array<{
      status: string;
      distance?: { value: number; text: string };
      duration?: { value: number; text: string };
    }>;
  }>;
};

type PlaceDetailsResponse = {
  status: string;
  error_message?: string;
  result?: {
    geometry?: { location?: { lat: number; lng: number } };
    formatted_address?: string;
  };
};

export type RotaPoint =
  | { placeId: string; lat?: number; lng?: number }
  | { lat: number; lng: number }
  | { address: string };

function encodePoint(point: RotaPoint): string {
  if ("placeId" in point && point.placeId) return `place_id:${point.placeId}`;
  if ("lat" in point && point.lat != null && point.lng != null) {
    return `${point.lat},${point.lng}`;
  }
  if ("address" in point) return point.address;
  throw new Error("Ponto de rota inválido");
}

async function buscarPlacesGoogle(
  input: string,
  sessionToken?: string
): Promise<PlaceSuggestion[]> {
  const key = requireGoogleMapsApiKey();
  const params = new URLSearchParams({
    input: input.trim(),
    key,
    language: "pt-BR",
    components: "country:br",
  });
  if (sessionToken) params.set("sessiontoken", sessionToken);

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`,
    { next: { revalidate: 0 } }
  );

  if (!response.ok) {
    throw new Error("Falha ao consultar autocomplete de lugares");
  }

  const data = (await response.json()) as AutocompleteResponse;

  if (data.status === "ZERO_RESULTS") return [];
  if (data.status !== "OK") {
    throw new Error(data.error_message || `Places API: ${data.status}`);
  }

  return (data.predictions ?? []).map((p) => ({
    placeId: p.place_id,
    description: p.description,
  }));
}

export async function buscarPlacesAutocomplete(
  input: string,
  sessionToken?: string
): Promise<PlaceSuggestion[]> {
  if (isGoogleMapsEnabled()) {
    try {
      return await buscarPlacesGoogle(input, sessionToken);
    } catch (error) {
      console.warn("[maps] Google Places falhou, usando OpenStreetMap", error);
    }
  }

  return buscarPlacesNominatim(input);
}

async function googlePlaceDetails(
  placeId: string
): Promise<{ lat: number; lng: number } | null> {
  const key = requireGoogleMapsApiKey();
  const params = new URLSearchParams({
    place_id: placeId,
    fields: "geometry",
    key,
    language: "pt-BR",
  });

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
    { next: { revalidate: 0 } }
  );
  if (!response.ok) return null;

  const data = (await response.json()) as PlaceDetailsResponse;
  const loc = data.result?.geometry?.location;
  if (!loc) return null;
  return { lat: loc.lat, lng: loc.lng };
}

async function resolveLatLng(
  point: RotaPoint
): Promise<{ lat: number; lng: number }> {
  if (
    "lat" in point &&
    typeof point.lat === "number" &&
    typeof point.lng === "number" &&
    Number.isFinite(point.lat) &&
    Number.isFinite(point.lng)
  ) {
    return { lat: point.lat, lng: point.lng };
  }

  if ("placeId" in point && point.placeId) {
    if (point.placeId.startsWith("osm:")) {
      throw new Error(
        "Selecione novamente o local na lista para obter a distância automática"
      );
    }
    if (isGoogleMapsEnabled()) {
      const details = await googlePlaceDetails(point.placeId);
      if (details) return details;
    }
    throw new Error("Não foi possível resolver as coordenadas do lugar");
  }

  if ("address" in point) {
    const geo = await geocodeNominatim(point.address);
    if (!geo) {
      throw new Error(`Endereço não encontrado: ${point.address}`);
    }
    return { lat: geo.lat, lng: geo.lng };
  }

  throw new Error("Ponto de rota inválido");
}

async function calcularDistanciaGoogle(
  origem: RotaPoint,
  destino: RotaPoint
): Promise<RotaResultado> {
  const key = requireGoogleMapsApiKey();
  const params = new URLSearchParams({
    origins: encodePoint(origem),
    destinations: encodePoint(destino),
    key,
    language: "pt-BR",
    mode: "driving",
    units: "metric",
  });

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?${params}`,
    { next: { revalidate: 0 } }
  );

  if (!response.ok) {
    throw new Error("Falha ao calcular distância da rota");
  }

  const data = (await response.json()) as DistanceMatrixResponse;

  if (data.status !== "OK") {
    throw new Error(data.error_message || `Distance Matrix: ${data.status}`);
  }

  const element = data.rows?.[0]?.elements?.[0];
  if (!element || element.status !== "OK" || !element.distance) {
    throw new Error(
      element?.status === "ZERO_RESULTS"
        ? "Não foi possível traçar rota entre origem e destino"
        : "Rota indisponível para esses pontos"
    );
  }

  const distanciaKm = Math.round((element.distance.value / 1000) * 10) / 10;

  return {
    distanciaKm,
    duracaoSegundos: element.duration?.value,
  };
}

export async function calcularDistanciaRota(
  origem: RotaPoint,
  destino: RotaPoint
): Promise<RotaResultado> {
  const canUseGoogleMatrix =
    isGoogleMapsEnabled() &&
    !(
      ("placeId" in origem && origem.placeId?.startsWith("osm:")) ||
      ("placeId" in destino && destino.placeId?.startsWith("osm:"))
    );

  if (canUseGoogleMatrix) {
    try {
      return await calcularDistanciaGoogle(origem, destino);
    } catch (error) {
      console.warn("[maps] Google Distance Matrix falhou, usando OSRM", error);
    }
  }

  const from = await resolveLatLng(origem);
  const to = await resolveLatLng(destino);
  return calcularDistanciaOsrm(from, to);
}

export { isMapsConfigError } from "@/lib/google-maps-config";
