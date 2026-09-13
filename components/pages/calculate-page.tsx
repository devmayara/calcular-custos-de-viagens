"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";
import { CalculationResultCard } from "@/components/calculation-result-card";
import { CalculatorForm } from "@/components/calculator-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { postCalcular } from "@/lib/api-client";
import type { CalcularCustoInput, Viagem } from "@/types/viagem";

export function CalculatePage() {
  const [result, setResult] = React.useState<Viagem | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit(data: CalcularCustoInput) {
    setIsSubmitting(true);
    setError(null);

    try {
      const viagem = await postCalcular(data);
      setResult(viagem);
    } catch (err) {
      setResult(null);
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível calcular o custo da viagem."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 md:px-6 md:py-10">
      <header className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[28px] sm:leading-[34px]">
          Calcular custo
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Informe os dados da viagem para estimar combustível, custo total e
          rateio por passageiro.
        </p>
      </header>

      <CalculatorForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

      {error ? (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Falha no cálculo</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {result ? (
        <CalculationResultCard
          result={result}
          origem={result.origem}
          destino={result.destino}
          distanciaKm={result.distanciaKm}
          quantidadePassageiros={result.quantidadePassageiros}
          tipoCombustivel={result.tipoCombustivel}
          tipoTrajeto={result.tipoTrajeto}
        />
      ) : null}
    </div>
  );
}
