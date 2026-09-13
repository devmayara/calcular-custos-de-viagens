import type {
  ApiErrorBody,
  PlaceSuggestion,
  RotaResultado,
} from "@/types/viagem";

export type MapsClientError = Error & { code?: string };

async function parseError(response: Response): Promise<MapsClientError> {
  try {
    const body = (await response.json()) as ApiErrorBody;
    const err = new Error(body.error || `Erro ${response.status}`) as MapsClientError;
    err.code = body.code;
    return err;
  } catch {
    return new Error(`Erro ${response.status}`) as MapsClientError;
  }
}

export async function fetchPlaceSuggestions(
  input: string,
  sessionToken?: string
): Promise<PlaceSuggestion[]> {
  const params = new URLSearchParams({ input });
  if (sessionToken) params.set("sessionToken", sessionToken);

  const response = await fetch(`/api/places/autocomplete?${params}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  const body = (await response.json()) as { suggestions: PlaceSuggestion[] };
  return body.suggestions ?? [];
}

export type RotaRequestBody = {
  origem: {
    placeId?: string;
    lat?: number;
    lng?: number;
    address?: string;
  };
  destino: {
    placeId?: string;
    lat?: number;
    lng?: number;
    address?: string;
  };
};

export async function fetchRotaDistancia(
  body: RotaRequestBody
): Promise<RotaResultado> {
  const response = await fetch("/api/rota", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return (await response.json()) as RotaResultado;
}

export async function fetchReverseGeocode(
  lat: number,
  lng: number
): Promise<{ label: string; lat: number; lng: number }> {
  const params = new URLSearchParams({
    lat: String(lat),
    lng: String(lng),
  });

  const response = await fetch(`/api/places/reverse?${params}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return (await response.json()) as {
    label: string;
    lat: number;
    lng: number;
  };
}
