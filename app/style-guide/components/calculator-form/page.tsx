"use client";

import * as React from "react";
import { CalculatorForm } from "@/components/calculator-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { calcularCustoViagem } from "@/lib/calcular-custo";
import { formatCurrency } from "@/lib/format";
import type { CalcularCustoInput } from "@/types/viagem";
import {
  CodeBlock,
  PropsTable,
  ShowcaseHeader,
  ShowcaseSection,
} from "../../showcase";

const usageCode = `import { CalculatorForm } from "@/components/calculator-form"
import { calcularCustoViagem } from "@/lib/calcular-custo"

export function TripCalculator() {
  return (
    <CalculatorForm
      defaultValues={{
        destinoInput: "Praia Grande",
        distanciaKm: "320",
        precoCombustivel: "5.89",
        consumoCarro: "12.5",
        quantidadePassageiros: "2",
        tipoTrajeto: "ida",
        tipoCombustivel: "gasolina-comum",
      }}
      onSubmit={(data) => {
        const result = calcularCustoViagem(data)
        console.log(result.custoTotal)
      }}
    />
  )
}`;

export default function CalculatorFormShowcasePage() {
  const [lastSubmit, setLastSubmit] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit(data: CalcularCustoInput) {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const result = calcularCustoViagem(data);
    setLastSubmit(
      `${data.destino ?? "Sem destino"} · ${formatCurrency(result.custoTotal)}`
    );
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-muted/40 px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Showcase · CalculatorForm
          </p>
          <ThemeToggle />
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-10 md:px-8">
        <ShowcaseHeader
          title="CalculatorForm"
          description="Formulário com origem/destino (autocomplete), ida ou ida e volta, tipo de combustível e distância por rota ou manual."
        />

        <ShowcaseSection
          id="demo"
          title="Demo interativa"
          description="Envie o formulário para validar campos e simular o callback onSubmit."
        >
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <CalculatorForm
              defaultValues={{
                destinoInput: "Praia Grande",
                distanciaKm: "320",
                precoCombustivel: "5.89",
                consumoCarro: "12.5",
                quantidadePassageiros: "2",
              }}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Último envio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm text-muted-foreground">
                    {lastSubmit ?? "Nenhum cálculo enviado ainda."}
                  </p>
                </CardContent>
              </Card>
              <Alert>
                <AlertTitle>Validação</AlertTitle>
                <AlertDescription>
                  Distância e consumo devem ser &gt; 0. Consumo zero exibe
                  &quot;Consumo não pode ser zero&quot;. Passageiros: inteiro ≥ 1.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="states"
          title="Estados"
          description="Default preenchido, vazio e submitting."
        >
          <div className="grid gap-4 xl:grid-cols-2">
            <CalculatorForm
              defaultValues={{
                origemInput: "",
                destinoInput: "",
                distanciaKm: "",
                precoCombustivel: "",
                consumoCarro: "",
                quantidadePassageiros: "1",
              }}
            />
            <CalculatorForm
              defaultValues={{
                destinoInput: "Campinas",
                distanciaKm: "180",
                precoCombustivel: "5.49",
                consumoCarro: "11",
                quantidadePassageiros: "3",
              }}
              isSubmitting
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="usage"
          title="Uso"
          description="Import e composição básica com a lógica de domínio."
        >
          <CodeBlock code={usageCode} />
        </ShowcaseSection>

        <ShowcaseSection
          id="props"
          title="API"
          description="Props controláveis pelo consumidor."
        >
          <PropsTable
            rows={[
              {
                name: "defaultValues",
                type: "Partial<CalculatorFormValues>",
                description: "Valores iniciais dos campos (strings).",
              },
              {
                name: "onSubmit",
                type: "(data: CalcularCustoInput) => void",
                description:
                  "Callback após validação bem-sucedida, com payload tipado.",
              },
              {
                name: "isSubmitting",
                type: "boolean",
                defaultValue: "false",
                description: "Desabilita campos e altera o texto do botão.",
              },
              {
                name: "className",
                type: "string",
                description: "Classes extras no Card raiz.",
              },
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection
          id="a11y"
          title="Acessibilidade"
          description="Labels associados, aria-invalid e mensagens com role=alert."
        >
          <Card>
            <CardContent className="space-y-2 pt-6 text-sm text-muted-foreground">
              <p>
                Cada input possui <code className="font-mono text-foreground">Label</code>{" "}
                com <code className="font-mono text-foreground">htmlFor</code> correspondente.
              </p>
              <p>
                Erros usam <code className="font-mono text-foreground">aria-invalid</code>,{" "}
                <code className="font-mono text-foreground">aria-describedby</code> e{" "}
                <code className="font-mono text-foreground">role=&quot;alert&quot;</code>.
              </p>
              <p>
                Touch targets dos inputs e do CTA respeitam altura mínima de 48px
                (design system Kinetic Precision).
              </p>
            </CardContent>
          </Card>
        </ShowcaseSection>
      </div>
    </div>
  );
}
