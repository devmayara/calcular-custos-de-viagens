"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { HistoryTable } from "@/components/history-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getHistorico } from "@/lib/api-client";
import type { Viagem } from "@/types/viagem";

export function HistoryPage() {
  const router = useRouter();
  const [items, setItems] = React.useState<Viagem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function loadHistorico() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getHistorico();
        if (!cancelled) {
          setItems(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setItems([]);
          setError(
            err instanceof Error
              ? err.message
              : "Não foi possível carregar o histórico."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadHistorico();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 md:px-6 md:py-10">
      <header className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[28px] sm:leading-[34px]">
          Histórico de viagens
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Consulte as viagens anteriores.
        </p>
      </header>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Erro ao carregar histórico</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {isLoading ? (
        <div
          className="rounded-xl border border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          Carregando histórico...
        </div>
      ) : (
        <HistoryTable
          items={items}
          emptyActionLabel="Fazer um cálculo"
          onEmptyAction={() => router.push("/")}
        />
      )}
    </div>
  );
}
