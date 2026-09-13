"use client";

import * as React from "react";
import { Calculator } from "lucide-react";
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
import { cn } from "@/lib/utils";
import type { CalcularCustoInput } from "@/types/viagem";

export type CalculatorFormValues = {
  destino: string;
  distanciaKm: string;
  precoCombustivel: string;
  consumoCarro: string;
  quantidadePassageiros: string;
};

export type CalculatorFormErrors = Partial<
  Record<keyof CalculatorFormValues, string>
>;

export type CalculatorFormProps = {
  defaultValues?: Partial<CalculatorFormValues>;
  onSubmit?: (data: CalcularCustoInput) => void;
  isSubmitting?: boolean;
  className?: string;
};

const initialValues: CalculatorFormValues = {
  destino: "",
  distanciaKm: "",
  precoCombustivel: "",
  consumoCarro: "",
  quantidadePassageiros: "1",
};

function parsePositiveNumber(raw: string): number | null {
  const normalized = raw.trim().replace(",", ".");
  if (!normalized) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function validateCalculatorForm(
  values: CalculatorFormValues
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

  const destino = values.destino.trim();

  return {
    ok: true,
    data: {
      ...(destino ? { destino } : {}),
      distanciaKm: distanciaKm as number,
      precoCombustivel: precoCombustivel as number,
      consumoCarro: consumoCarro as number,
      quantidadePassageiros: quantidadePassageiros as number,
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateCalculatorForm(values);

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
        <CardDescription>
          Informe km, preço do litro, consumo e passageiros para obter o custo.
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-(--card-spacing)"
      >
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="destino">Destino (opcional)</Label>
            <Input
              id="destino"
              name="destino"
              placeholder="Ex.: Praia Grande"
              value={values.destino}
              onChange={(e) => updateField("destino", e.target.value)}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.destino)}
              aria-describedby={errors.destino ? "destino-error" : undefined}
            />
            {errors.destino ? (
              <p id="destino-error" className="text-xs text-destructive" role="alert">
                {errors.destino}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="distanciaKm">Distância (Km)</Label>
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
              onChange={(e) => updateField("distanciaKm", e.target.value)}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.distanciaKm)}
              aria-describedby={
                errors.distanciaKm ? "distanciaKm-error" : undefined
              }
              required
            />
            {errors.distanciaKm ? (
              <p
                id="distanciaKm-error"
                className="text-xs text-destructive"
                role="alert"
              >
                {errors.distanciaKm}
              </p>
            ) : null}
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

          <div className="space-y-2">
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
              className="min-h-12 font-mono"
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
            disabled={isSubmitting}
          >
            <Calculator data-icon="inline-start" />
            {isSubmitting ? "Calculando..." : "Calcular Custo"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
