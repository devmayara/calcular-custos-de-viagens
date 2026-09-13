"use client";

import { History, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/format";
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

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle>Histórico de viagens</CardTitle>
          <CardDescription>
            Últimos cálculos salvos, do mais recente ao mais antigo.
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
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
