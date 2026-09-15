"use client";

import * as React from "react";
import { Calculator, Loader2, LocateFixed } from "lucide-react";
import { PlaceAutocompleteField } from "@/components/place-autocomplete-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fetchReverseGeocode, fetchRotaDistancia } from "@/lib/maps-client";
import { cn } from "@/lib/utils";
import type {
  CalcularCustoInput,
  DistanciaFonte,
  LugarRef,
  TipoCombustivel,
  TipoTrajeto,
} from "@/types/viagem";

export type CalculatorFormValues = {
  origemInput: string;
  destinoInput: string;
  distanciaKm: string;
  precoCombustivel: string;
  consumoCarro: string;
  quantidadePassageiros: string;
  tipoCombustivel: TipoCombustivel;
  tipoTrajeto: TipoTrajeto;
};

export type CalculatorFormErrors = Partial<
  Record<keyof CalculatorFormValues | "origem" | "destino", string>
>;

export type CalculatorFormProps = {
  defaultValues?: Partial<CalculatorFormValues>;
  onSubmit?: (data: CalcularCustoInput) => void;
  isSubmitting?: boolean;
  className?: string;
};

const FUEL_OPTIONS: { value: TipoCombustivel; label: string }[] = [
  { value: "gasolina-comum", label: "Gasolina Comum" },
  { value: "gasolina-aditivada", label: "Gasolina Aditivada" },
  { value: "etanol", label: "Etanol" },
  { value: "diesel", label: "Diesel" },
  { value: "gnv", label: "GNV" },
];

const initialValues: CalculatorFormValues = {
  origemInput: "",
  destinoInput: "",
  distanciaKm: "",
  precoCombustivel: "",
  consumoCarro: "",
  quantidadePassageiros: "1",
  tipoCombustivel: "gasolina-comum",
  tipoTrajeto: "ida",
};

function parsePositiveNumber(raw: string): number | null {
  const normalized = raw.trim().replace(",", ".");
  if (!normalized) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

function formatKm(value: number): string {
  return Number.isInteger(value) ? String(value) : String(Math.round(value * 10) / 10);
}

function distanciaEfetiva(idaKm: number, tipoTrajeto: TipoTrajeto): number {
  return tipoTrajeto === "ida-volta" ? idaKm * 2 : idaKm;
}

function lugarParaRota(lugar: LugarRef | null, fallbackLabel: string) {
  if (!lugar) {
    const address = fallbackLabel.trim();
    return address ? { address } : null;
  }

  const hasCoords = lugar.lat != null && lugar.lng != null;

  // Coordenadas têm prioridade — OSRM/Nominatim dependem delas
  if (hasCoords) {
    return {
      lat: lugar.lat as number,
      lng: lugar.lng as number,
      ...(lugar.placeId ? { placeId: lugar.placeId } : {}),
    };
  }

  // placeId do Google (sem prefixo osm:)
  if (lugar.placeId && !lugar.placeId.startsWith("osm:")) {
    return { placeId: lugar.placeId };
  }

  const address = (lugar.label || fallbackLabel).trim();
  return address ? { address } : null;
}

function lugarProntoParaRota(lugar: LugarRef | null): boolean {
  if (!lugar) return false;
  if (lugar.lat != null && lugar.lng != null) return true;
  if (lugar.placeId && !lugar.placeId.startsWith("osm:")) return true;
  return false;
}

export function validateCalculatorForm(
  values: CalculatorFormValues,
  origem: LugarRef | null,
  destino: LugarRef | null,
  distanciaFonte: DistanciaFonte
): { ok: true; data: CalcularCustoInput } | { ok: false; errors: CalculatorFormErrors } {
  const errors: CalculatorFormErrors = {};

  const distanciaKm = parsePositiveNumber(values.distanciaKm);
  if (distanciaKm === null) {
    errors.distanciaKm = "Informe a distância em km";
  } else if (distanciaKm <= 0) {
    errors.distanciaKm = "Distância deve ser maior que zero";
  }

  const precoCombustivel = parsePositiveNumber(values.precoCombustivel);
  if (precoCombustivel === null) {
    errors.precoCombustivel = "Informe o preço do combustível";
  } else if (precoCombustivel < 0) {
    errors.precoCombustivel = "Preço não pode ser negativo";
  }

  const consumoCarro = parsePositiveNumber(values.consumoCarro);
  if (consumoCarro === null) {
    errors.consumoCarro = "Informe o consumo médio";
  } else if (consumoCarro <= 0) {
    errors.consumoCarro = "Consumo não pode ser zero";
  }

  const quantidadePassageiros = parsePositiveNumber(
    values.quantidadePassageiros
  );
  if (quantidadePassageiros === null) {
    errors.quantidadePassageiros = "Informe a quantidade de passageiros";
  } else if (
    !Number.isInteger(quantidadePassageiros) ||
    quantidadePassageiros < 1
  ) {
    errors.quantidadePassageiros =
      "Deve ser um inteiro maior ou igual a 1";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const origemLabel = (origem?.label || values.origemInput).trim();
  const destinoLabel = (destino?.label || values.destinoInput).trim();

  return {
    ok: true,
    data: {
      ...(origemLabel ? { origem: origemLabel } : {}),
      ...(destinoLabel ? { destino: destinoLabel } : {}),
      ...(origem ? { origemPlace: origem } : {}),
      ...(destino ? { destinoPlace: destino } : {}),
      distanciaKm: distanciaKm as number,
      precoCombustivel: precoCombustivel as number,
      consumoCarro: consumoCarro as number,
      quantidadePassageiros: quantidadePassageiros as number,
      tipoCombustivel: values.tipoCombustivel,
      tipoTrajeto: values.tipoTrajeto,
      distanciaFonte,
    },
  };
}

export function CalculatorForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  className,
}: CalculatorFormProps) {
  const [values, setValues] = React.useState<CalculatorFormValues>({
    ...initialValues,
    ...defaultValues,
  });
  const [errors, setErrors] = React.useState<CalculatorFormErrors>({});
  const [origem, setOrigem] = React.useState<LugarRef | null>(null);
  const [destino, setDestino] = React.useState<LugarRef | null>(null);
  const [distanciaIdaKm, setDistanciaIdaKm] = React.useState<number | null>(null);
  const [distanciaFonte, setDistanciaFonte] =
    React.useState<DistanciaFonte>("manual");
  const [rotaLoading, setRotaLoading] = React.useState(false);
  const [rotaMessage, setRotaMessage] = React.useState<string | null>(null);
  const [geoLoading, setGeoLoading] = React.useState(false);
  const [geoError, setGeoError] = React.useState<string | null>(null);

  function updateField<K extends keyof CalculatorFormValues>(
    key: K,
    value: CalculatorFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function applyDistanciaFromIda(idaKm: number, tipoTrajeto: TipoTrajeto) {
    setDistanciaIdaKm(idaKm);
    updateField("distanciaKm", formatKm(distanciaEfetiva(idaKm, tipoTrajeto)));
  }

  function handleTipoTrajetoChange(next: TipoTrajeto) {
    updateField("tipoTrajeto", next);
    if (distanciaIdaKm != null) {
      updateField("distanciaKm", formatKm(distanciaEfetiva(distanciaIdaKm, next)));
      return;
    }
    const atual = parsePositiveNumber(values.distanciaKm);
    if (atual == null) return;
    if (values.tipoTrajeto === "ida" && next === "ida-volta") {
      setDistanciaIdaKm(atual);
      updateField("distanciaKm", formatKm(atual * 2));
    } else if (values.tipoTrajeto === "ida-volta" && next === "ida") {
      const ida = atual / 2;
      setDistanciaIdaKm(ida);
      updateField("distanciaKm", formatKm(ida));
    }
  }

  function handleDistanciaManualChange(raw: string) {
    updateField("distanciaKm", raw);
    setDistanciaFonte("manual");
    const parsed = parsePositiveNumber(raw);
    if (parsed == null) {
      setDistanciaIdaKm(null);
      return;
    }
    setDistanciaIdaKm(
      values.tipoTrajeto === "ida-volta" ? parsed / 2 : parsed
    );
  }

  React.useEffect(() => {
    if (!lugarProntoParaRota(origem) || !lugarProntoParaRota(destino)) {
      return;
    }
    if (!origem || !destino) return;

    const origemPoint = lugarParaRota(origem, origem.label);
    const destinoPoint = lugarParaRota(destino, destino.label);
    if (!origemPoint || !destinoPoint) return;

    let cancelled = false;
    setRotaLoading(true);
    setRotaMessage(null);

    void (async () => {
      try {
        const rota = await fetchRotaDistancia({
          origem: origemPoint,
          destino: destinoPoint,
        });
        if (cancelled) return;
        setDistanciaFonte("rota");
        applyDistanciaFromIda(rota.distanciaKm, values.tipoTrajeto);
        const duracaoMin =
          rota.duracaoSegundos != null
            ? Math.round(rota.duracaoSegundos / 60)
            : null;
        setRotaMessage(
          duracaoMin != null
            ? `Rota: ${formatKm(rota.distanciaKm)} km de ida (~${duracaoMin} min)`
            : `Rota: ${formatKm(rota.distanciaKm)} km de ida`
        );
      } catch (err) {
        if (cancelled) return;
        setRotaMessage(
          err instanceof Error
            ? err.message
            : "Não foi possível calcular a rota. Informe o km manualmente."
        );
      } finally {
        if (!cancelled) setRotaLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- só reagimos a mudança de lugares
  }, [origem, destino]);

  function handleUseMyLocation() {
    setGeoError(null);

    if (!navigator.geolocation) {
      setGeoError("Geolocalização não é suportada neste navegador.");
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        void (async () => {
          try {
            const resolved = await fetchReverseGeocode(lat, lng);
            const lugar: LugarRef = {
              label: resolved.label,
              lat: resolved.lat,
              lng: resolved.lng,
            };
            setOrigem(lugar);
            updateField("origemInput", lugar.label);
          } catch {
            const lugar: LugarRef = {
              label: "Minha localização",
              lat,
              lng,
            };
            setOrigem(lugar);
            updateField("origemInput", lugar.label);
            setGeoError(
              "Localização obtida, mas o endereço não pôde ser resolvido."
            );
          } finally {
            setGeoLoading(false);
          }
        })();
      },
      (err) => {
        setGeoLoading(false);
        setGeoError(
          err.code === err.PERMISSION_DENIED
            ? "Permissão de localização negada. Digite a origem manualmente."
            : "Não foi possível obter sua localização."
        );
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateCalculatorForm(
      values,
      origem,
      destino,
      distanciaFonte
    );

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    onSubmit?.(result.data);
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Calcular custo da viagem</CardTitle>
      </CardHeader>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-(--card-spacing)"
      >
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <Label htmlFor="origem">Origem</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="min-h-10"
                disabled={isSubmitting || geoLoading}
                onClick={handleUseMyLocation}
              >
                {geoLoading ? (
                  <Loader2 data-icon="inline-start" className="animate-spin" />
                ) : (
                  <LocateFixed data-icon="inline-start" />
                )}
                Minha localização
              </Button>
            </div>
            <PlaceAutocompleteField
              id="origem"
              name="origem"
              placeholder="De onde você sai?"
              value={origem}
              inputValue={values.origemInput}
              disabled={isSubmitting}
              error={errors.origem}
              onInputChange={(text) => {
                updateField("origemInput", text);
                setOrigem((prev) =>
                  prev && prev.label === text
                    ? prev
                    : text.trim()
                      ? { label: text.trim() }
                      : null
                );
              }}
              onSelect={(lugar) => {
                setOrigem(lugar);
                updateField("origemInput", lugar.label);
              }}
            />
            {geoError ? (
              <p className="text-xs text-destructive" role="alert">
                {geoError}
              </p>
            ) : null}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="destino">Destino</Label>
            <PlaceAutocompleteField
              id="destino"
              name="destino"
              placeholder="Para onde você vai?"
              value={destino}
              inputValue={values.destinoInput}
              disabled={isSubmitting}
              error={errors.destino}
              onInputChange={(text) => {
                updateField("destinoInput", text);
                setDestino((prev) =>
                  prev && prev.label === text
                    ? prev
                    : text.trim()
                      ? { label: text.trim() }
                      : null
                );
              }}
              onSelect={(lugar) => {
                setDestino(lugar);
                updateField("destinoInput", lugar.label);
              }}
            />
          </div>

          <fieldset className="space-y-2 sm:col-span-2">
            <Legend className="text-sm font-medium">Tipo de trajeto</Legend>
            <RadioGroup
              value={values.tipoTrajeto}
              onValueChange={(v) => handleTipoTrajetoChange(v as TipoTrajeto)}
              className="grid gap-2 sm:grid-cols-2"
              disabled={isSubmitting}
              aria-label="Tipo de trajeto"
            >
              <label
                htmlFor="trajeto-ida"
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-border px-3 has-[[data-state=checked]]:border-primary"
              >
                <RadioGroupItem value="ida" id="trajeto-ida" />
                <span className="text-sm">Ida</span>
              </label>
              <label
                htmlFor="trajeto-ida-volta"
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-border px-3 has-[[data-state=checked]]:border-primary"
              >
                <RadioGroupItem value="ida-volta" id="trajeto-ida-volta" />
                <span className="text-sm">Ida e volta</span>
              </label>
            </RadioGroup>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="distanciaKm">
              Distância ({values.tipoTrajeto === "ida-volta" ? "total" : "ida"}) (Km)
            </Label>
            <div className="relative">
              <Input
                id="distanciaKm"
                name="distanciaKm"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                placeholder="320"
                className="min-h-12 font-mono"
                value={values.distanciaKm}
                onChange={(e) => handleDistanciaManualChange(e.target.value)}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.distanciaKm)}
                aria-describedby={
                  errors.distanciaKm ? "distanciaKm-error" : "distanciaKm-hint"
                }
                required
              />
              {rotaLoading ? (
                <Loader2
                  className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-muted-foreground"
                  aria-hidden
                />
              ) : null}
            </div>
            {errors.distanciaKm ? (
              <p
                id="distanciaKm-error"
                className="text-xs text-destructive"
                role="alert"
              >
                {errors.distanciaKm}
              </p>
            ) : (
              <p id="distanciaKm-hint" className="text-xs text-muted-foreground">
                {rotaMessage ??
                  (distanciaFonte === "rota"
                    ? "Distância preenchida pela rota (editável)."
                    : "Preenchida pela rota ou manualmente.")}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipoCombustivel">Tipo de combustível</Label>
            <select
              id="tipoCombustivel"
              name="tipoCombustivel"
              className={cn(
                "h-12 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-base outline-none transition-colors",
                "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
              )}
              value={values.tipoCombustivel}
              onChange={(e) =>
                updateField("tipoCombustivel", e.target.value as TipoCombustivel)
              }
              disabled={isSubmitting}
            >
              {FUEL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="precoCombustivel">Preço combustível (R$/L)</Label>
            <Input
              id="precoCombustivel"
              name="precoCombustivel"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              placeholder="5,89"
              className="min-h-12 font-mono"
              value={values.precoCombustivel}
              onChange={(e) => updateField("precoCombustivel", e.target.value)}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.precoCombustivel)}
              aria-describedby={
                errors.precoCombustivel
                  ? "precoCombustivel-error"
                  : undefined
              }
              required
            />
            {errors.precoCombustivel ? (
              <p
                id="precoCombustivel-error"
                className="text-xs text-destructive"
                role="alert"
              >
                {errors.precoCombustivel}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="consumoCarro">Consumo (Km/L)</Label>
            <Input
              id="consumoCarro"
              name="consumoCarro"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              placeholder="12,5"
              className="min-h-12 font-mono"
              value={values.consumoCarro}
              onChange={(e) => updateField("consumoCarro", e.target.value)}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.consumoCarro)}
              aria-describedby={
                errors.consumoCarro ? "consumoCarro-error" : undefined
              }
              required
            />
            {errors.consumoCarro ? (
              <p
                id="consumoCarro-error"
                className="text-xs text-destructive"
                role="alert"
              >
                {errors.consumoCarro}
              </p>
            ) : null}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="quantidadePassageiros">
              Quantidade de passageiros
            </Label>
            <Input
              id="quantidadePassageiros"
              name="quantidadePassageiros"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              placeholder="1"
              className="min-h-12 font-mono sm:max-w-xs"
              value={values.quantidadePassageiros}
              onChange={(e) =>
                updateField("quantidadePassageiros", e.target.value)
              }
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.quantidadePassageiros)}
              aria-describedby={
                errors.quantidadePassageiros
                  ? "quantidadePassageiros-error"
                  : undefined
              }
              required
            />
            {errors.quantidadePassageiros ? (
              <p
                id="quantidadePassageiros-error"
                className="text-xs text-destructive"
                role="alert"
              >
                {errors.quantidadePassageiros}
              </p>
            ) : null}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            size="lg"
            className="min-h-12 w-full sm:w-auto"
            disabled={isSubmitting || rotaLoading}
          >
            <Calculator data-icon="inline-start" />
            {isSubmitting ? "Calculando..." : "Calcular Custo"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function Legend({
  className,
  ...props
}: React.ComponentProps<"legend">) {
  return <legend className={cn(className)} {...props} />;
}
