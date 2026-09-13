import { CalculationResultCard } from "@/components/calculation-result-card";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { calcularCustoViagem } from "@/lib/calcular-custo";
import {
  CodeBlock,
  PropsTable,
  ShowcaseHeader,
  ShowcaseSection,
} from "../../showcase";

const sampleResult = calcularCustoViagem({
  distanciaKm: 320,
  precoCombustivel: 5.89,
  consumoCarro: 12.5,
  quantidadePassageiros: 2,
});

const soloResult = calcularCustoViagem({
  distanciaKm: 80,
  precoCombustivel: 6.2,
  consumoCarro: 10,
  quantidadePassageiros: 1,
});

const usageCode = `import { CalculationResultCard } from "@/components/calculation-result-card"
import { calcularCustoViagem } from "@/lib/calcular-custo"

const result = calcularCustoViagem({
  distanciaKm: 320,
  precoCombustivel: 5.89,
  consumoCarro: 12.5,
  quantidadePassageiros: 2,
})

export function ResultPreview() {
  return (
    <CalculationResultCard
      result={result}
      destino="Praia Grande"
      distanciaKm={320}
      quantidadePassageiros={2}
    />
  )
}`;

export default function CalculationResultCardShowcasePage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-muted/40 px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Showcase · CalculationResultCard
          </p>
          <ThemeToggle />
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-10 md:px-8">
        <ShowcaseHeader
          title="CalculationResultCard"
          description="Card de resultado com Custo Total em destaque (display-lg / mono), além de Custo por Km, por Passageiro e Litros Totais."
        />

        <ShowcaseSection
          id="demo"
          title="Demo"
          description="Estado padrão com metadados de destino e distância."
        >
          <CalculationResultCard
            result={sampleResult}
            destino="Praia Grande"
            distanciaKm={320}
            quantidadePassageiros={2}
          />
        </ShowcaseSection>

        <ShowcaseSection
          id="variants"
          title="Variantes"
          description="Com contexto completo vs. apenas métricas."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <CalculationResultCard
              result={sampleResult}
              destino="Praia Grande"
              distanciaKm={320}
              quantidadePassageiros={2}
            />
            <CalculationResultCard
              result={soloResult}
              quantidadePassageiros={1}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="usage"
          title="Uso"
          description="Compose com o resultado de calcularCustoViagem."
        >
          <CodeBlock code={usageCode} />
        </ShowcaseSection>

        <ShowcaseSection
          id="props"
          title="API"
          description="Props do card de resultado."
        >
          <PropsTable
            rows={[
              {
                name: "result",
                type: "CalculoResultado",
                description:
                  "Objeto com custoTotal, custoPorKm, custoPorPessoa e litrosTotais.",
              },
              {
                name: "destino",
                type: "string",
                description: "Badge opcional com o nome do destino.",
              },
              {
                name: "distanciaKm",
                type: "number",
                description: "Badge opcional com a distância da viagem.",
              },
              {
                name: "quantidadePassageiros",
                type: "number",
                defaultValue: "1",
                description: "Usado no hint de rateio por pessoa.",
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
          description="Atualizações anunciadas e hierarquia semântica."
        >
          <Card>
            <CardContent className="space-y-2 pt-6 text-sm text-muted-foreground">
              <p>
                O card usa <code className="font-mono text-foreground">aria-live=&quot;polite&quot;</code>{" "}
                para anunciar mudanças de resultado após o cálculo.
              </p>
              <p>
                Métricas secundárias estão em lista de definição (
                <code className="font-mono text-foreground">dl/dt/dd</code>) para
                leitura estruturada por leitores de tela.
              </p>
              <p>
                Valores monetários e litros usam tipografia mono (
                label-numeric) para alinhamento e leitura rápida.
              </p>
            </CardContent>
          </Card>
        </ShowcaseSection>
      </div>
    </div>
  );
}
