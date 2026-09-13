"use client";

import * as React from "react";
import { Eye, History, Route, X } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatCurrency,
  formatDateTime,
  formatNumber,
} from "@/lib/format";
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
  const detailOpen = detailViagem !== null;

  return (
    <>
      <Card className={cn(className)}>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
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
              className="min-h-12 shrink-0"
              onClick={onClearHistory}
            >
              Limpar
            </Button>
          ) : null}
        </CardHeader>

        <CardContent>
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
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead className="text-right">Distância</TableHead>
                  <TableHead className="text-right">Custo total</TableHead>
                  <TableHead className="text-right">Custo/km</TableHead>
                  <TableHead className="text-right">Passageiros</TableHead>
                  <TableHead className="w-14 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((viagem) => {
                  const isSelected = selectedId === viagem.id;
                  const interactive = Boolean(onSelect);

                  return (
                    <TableRow
                      key={viagem.id}
                      data-state={isSelected ? "selected" : undefined}
                      className={cn(interactive && "cursor-pointer")}
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
                      <TableCell className="font-mono text-xs">
                        {formatDateTime(viagem.createdAt)}
                      </TableCell>
                      <TableCell>
                        {viagem.destino?.trim() || (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatNumber(viagem.distanciaKm)} km
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium text-primary">
                        {formatCurrency(viagem.custoTotal)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(viagem.custoPorKm)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {viagem.quantidadePassageiros}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="min-h-12 min-w-12"
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
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
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
                destino={detailViagem.destino}
                distanciaKm={detailViagem.distanciaKm}
                quantidadePassageiros={detailViagem.quantidadePassageiros}
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
