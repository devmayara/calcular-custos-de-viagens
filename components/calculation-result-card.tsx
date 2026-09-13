import { Fuel, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CalculoResultado } from "@/types/viagem";

export type CalculationResultCardProps = {
  result: CalculoResultado;
  destino?: string;
  distanciaKm?: number;
  quantidadePassageiros?: number;
  className?: string;
};

export function CalculationResultCard({
  result,
  destino,
  distanciaKm,
  quantidadePassageiros = 1,
  className,
}: CalculationResultCardProps) {
  const metrics = [
    {
      label: "Custo por Km",
      value: formatCurrency(result.custoPorKm),
      hint: "R$/km",
    },
    {
      label: "Custo por passageiro",
      value: formatCurrency(result.custoPorPessoa),
      hint: `${quantidadePassageiros} ${quantidadePassageiros === 1 ? "pessoa" : "pessoas"}`,
    },
    {
      label: "Litros totais",
      value: `${formatNumber(result.litrosTotais)} L`,
      hint: "combustível estimado",
    },
  ] as const;

  return (
    <Card className={cn(className)} aria-live="polite">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>Resultado do cálculo</CardTitle>
            <CardDescription>
              Custo estimado com base nos dados informados.
            </CardDescription>
          </div>
          <Badge variant="secondary">OK</Badge>
        </div>

        {(destino || distanciaKm !== undefined) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {destino ? (
              <Badge variant="outline" className="gap-1 font-normal">
                <MapPin className="size-3.5" aria-hidden />
                {destino}
              </Badge>
            ) : null}
            {distanciaKm !== undefined ? (
              <Badge variant="outline" className="gap-1 font-mono font-normal">
                <Fuel className="size-3.5" aria-hidden />
                {formatNumber(distanciaKm)} km
              </Badge>
            ) : null}
            <Badge variant="outline" className="gap-1 font-normal">
              <Users className="size-3.5" aria-hidden />
              {quantidadePassageiros}{" "}
              {quantidadePassageiros === 1 ? "passageiro" : "passageiros"}
            </Badge>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Custo total
          </p>
          <p className="mt-1 font-mono text-[40px] font-bold leading-[48px] tracking-[-0.02em] text-primary">
            {formatCurrency(result.custoTotal)}
          </p>
        </div>

        <Separator />

        <dl className="grid gap-4 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <dt className="text-xs font-medium text-muted-foreground">
                {metric.label}
              </dt>
              <dd className="font-mono text-lg font-semibold tracking-[0.02em] text-foreground">
                {metric.value}
              </dd>
              <p className="text-xs text-muted-foreground">{metric.hint}</p>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
