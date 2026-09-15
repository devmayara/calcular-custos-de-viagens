"use client";

import * as React from "react";
import { Eye, History, Route, Search, X } from "lucide-react";
import { CalculationResultCard } from "@/components/calculation-result-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  formatCurrency,
  formatDateTime,
  formatNumber,
} from "@/lib/format";
import { labelCombustivel, labelTrajeto } from "@/lib/labels-viagem";
import { cn } from "@/lib/utils";
import type { Viagem } from "@/types/viagem";

export type HistoryTableProps = {
  items: Viagem[];
  selectedId?: string;
  onSelect?: (viagem: Viagem) => void;
  onClearHistory?: () => void;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  className?: string;
};

function trechoLabel(viagem: Viagem): string {
  if (viagem.origem && viagem.destino) {
    return `${viagem.origem} → ${viagem.destino}`;
  }
  return viagem.destino?.trim() || viagem.origem?.trim() || "Viagem sem trecho";
}

function matchesQuery(viagem: Viagem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    viagem.origem,
    viagem.destino,
    trechoLabel(viagem),
    labelCombustivel(viagem.tipoCombustivel),
    labelTrajeto(viagem.tipoTrajeto),
    formatDateTime(viagem.createdAt),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

export function HistoryTable({
  items,
  selectedId,
  onSelect,
  onClearHistory,
  emptyActionLabel = "Calcular primeira viagem",
  onEmptyAction,
  className,
}: HistoryTableProps) {
  const isEmpty = items.length === 0;
  const [detailViagem, setDetailViagem] = React.useState<Viagem | null>(null);
  const [search, setSearch] = React.useState("");
  const detailOpen = detailViagem !== null;

  const filtered = React.useMemo(
    () => items.filter((viagem) => matchesQuery(viagem, search)),
    [items, search]
  );
  const hasQuery = search.trim().length > 0;
  const noMatches = !isEmpty && hasQuery && filtered.length === 0;

  return (
    <>
      <Card className={cn(className)}>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle>Histórico de viagens</CardTitle>
            <CardDescription>
              Do mais recente ao mais antigo.
            </CardDescription>
          </div>
          {!isEmpty && onClearHistory ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="min-h-12 shrink-0 self-start"
              onClick={onClearHistory}
            >
              Limpar
            </Button>
          ) : null}
        </CardHeader>

        <CardContent className="space-y-4">
          {!isEmpty ? (
            <div className="space-y-2">
              <Label htmlFor="historico-busca">Buscar no histórico</Label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  id="historico-busca"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Origem, destino, combustível…"
                  className="pl-9"
                  autoComplete="off"
                />
              </div>
            </div>
          ) : null}

          {isEmpty ? (
            <div
              className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center"
              role="status"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <History className="size-6" aria-hidden />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Nenhuma viagem registrada
                </p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Calcule um custo para começar a acompanhar quanto você gasta no
                  mês.
                </p>
              </div>
              {onEmptyAction ? (
                <Button
                  type="button"
                  className="mt-2 min-h-12"
                  onClick={onEmptyAction}
                >
                  <Route data-icon="inline-start" />
                  {emptyActionLabel}
                </Button>
              ) : null}
            </div>
          ) : noMatches ? (
            <div
              className="rounded-xl border border-dashed border-border bg-muted/20 px-6 py-10 text-center"
              role="status"
            >
              <p className="text-sm font-medium text-foreground">
                Nenhuma viagem corresponde à busca
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tente outro trecho, destino ou tipo de combustível.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4 min-h-12"
                onClick={() => setSearch("")}
              >
                Limpar busca
              </Button>
            </div>
          ) : (
            <ul className="grid gap-3" role="list">
              {filtered.map((viagem) => {
                const isSelected = selectedId === viagem.id;
                const interactive = Boolean(onSelect);
                const combustivel = labelCombustivel(viagem.tipoCombustivel);
                const trajeto = labelTrajeto(viagem.tipoTrajeto);

                return (
                  <li key={viagem.id}>
                    <article
                      className={cn(
                        "rounded-xl border border-border bg-card p-4 transition-colors",
                        isSelected && "border-primary ring-2 ring-primary/20",
                        interactive && "cursor-pointer hover:bg-muted/40"
                      )}
                      data-state={isSelected ? "selected" : undefined}
                      onClick={
                        interactive ? () => onSelect?.(viagem) : undefined
                      }
                      onKeyDown={
                        interactive
                          ? (event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                onSelect?.(viagem);
                              }
                            }
                          : undefined
                      }
                      tabIndex={interactive ? 0 : undefined}
                      role={interactive ? "button" : undefined}
                      aria-selected={interactive ? isSelected : undefined}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <time
                              dateTime={viagem.createdAt}
                              className="font-mono text-xs text-muted-foreground"
                            >
                              {formatDateTime(viagem.createdAt)}
                            </time>
                            {trajeto ? (
                              <span className="text-xs text-muted-foreground">
                                · {trajeto}
                              </span>
                            ) : null}
                          </div>
                          <p className="font-heading text-base font-semibold leading-snug break-words text-foreground">
                            {trechoLabel(viagem)}
                          </p>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                            <span className="font-mono">
                              {formatNumber(viagem.distanciaKm)} km
                            </span>
                            {combustivel ? <span>{combustivel}</span> : null}
                            <span>
                              {viagem.quantidadePassageiros}{" "}
                              {viagem.quantidadePassageiros === 1
                                ? "passageiro"
                                : "passageiros"}
                            </span>
                          </div>
                          <p className="font-mono text-lg font-semibold text-primary">
                            {formatCurrency(viagem.custoTotal)}
                          </p>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="min-h-12 min-w-12 shrink-0"
                          aria-label={`Ver mais detalhes${
                            viagem.destino?.trim()
                              ? ` de ${viagem.destino.trim()}`
                              : ""
                          }`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setDetailViagem(viagem);
                          }}
                        >
                          <Eye className="size-4" aria-hidden />
                        </Button>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <Drawer
        open={detailOpen}
        onOpenChange={(open) => {
          if (!open) setDetailViagem(null);
        }}
        direction="bottom"
      >
        <DrawerContent className="flex max-h-[92vh] flex-col md:mx-auto md:max-w-lg md:rounded-t-xl">
          <DrawerHeader className="relative border-b border-border text-left">
            <div className="pr-12">
              <DrawerTitle>Detalhes do cálculo</DrawerTitle>
              <DrawerDescription>
                {detailViagem
                  ? `Registrado em ${formatDateTime(detailViagem.createdAt)}`
                  : "Resumo completo da viagem selecionada."}
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 size-10 min-h-12 min-w-12"
                aria-label="Fechar detalhes"
              >
                <X className="size-4" aria-hidden />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          {detailViagem ? (
            <div className="flex-1 overflow-y-auto p-4">
              {/* Preço e consumo só aqui — não repetidos no CalculationResultCard */}
              <dl className="mb-4 grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1 rounded-lg bg-muted/40 p-3">
                  <dt className="text-xs text-muted-foreground">
                    Preço combustível
                  </dt>
                  <dd className="font-mono font-medium">
                    {formatCurrency(detailViagem.precoCombustivel)}/L
                  </dd>
                </div>
                <div className="space-y-1 rounded-lg bg-muted/40 p-3">
                  <dt className="text-xs text-muted-foreground">Consumo</dt>
                  <dd className="font-mono font-medium">
                    {formatNumber(detailViagem.consumoCarro)} Km/L
                  </dd>
                </div>
              </dl>

              <CalculationResultCard
                result={detailViagem}
                origem={detailViagem.origem}
                destino={detailViagem.destino}
                distanciaKm={detailViagem.distanciaKm}
                quantidadePassageiros={detailViagem.quantidadePassageiros}
                tipoCombustivel={detailViagem.tipoCombustivel}
                tipoTrajeto={detailViagem.tipoTrajeto}
                hideStatusBadge
              />
            </div>
          ) : null}

          <DrawerFooter className="border-t border-border">
            <DrawerClose asChild>
              <Button type="button" variant="outline" className="min-h-12 w-full">
                Fechar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
