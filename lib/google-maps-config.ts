/**
 * Google Maps Platform — chave apenas no servidor (opcional).
 * Sem chave, o app usa OpenStreetMap (Nominatim) + OSRM automaticamente.
 * Com chave: Places API + Distance Matrix API.
 */

export function getGoogleMapsApiKey(): string | null {
  const key = process.env.GOOGLE_MAPS_API_KEY?.trim();
  return key || null;
}

export function isGoogleMapsEnabled(): boolean {
  if (process.env.GOOGLE_MAPS_ENABLED === "false") return false;
  return Boolean(getGoogleMapsApiKey());
}

export class MapsConfigError extends Error {
  readonly code = "MAPS_NOT_CONFIGURED";

  constructor(message = "Google Maps não está configurado") {
    super(message);
    this.name = "MapsConfigError";
  }
}

export function requireGoogleMapsApiKey(): string {
  const key = getGoogleMapsApiKey();
  if (!key || !isGoogleMapsEnabled()) {
    throw new MapsConfigError(
      "Configure GOOGLE_MAPS_API_KEY para usar autocomplete e rota automática"
    );
  }
  return key;
}

export function isMapsConfigError(error: unknown): error is MapsConfigError {
  return (
    error instanceof MapsConfigError ||
    (typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "MAPS_NOT_CONFIGURED")
  );
}
