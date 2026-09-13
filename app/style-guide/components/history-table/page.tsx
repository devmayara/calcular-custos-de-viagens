"use client";

import * as React from "react";
import { HistoryTable } from "@/components/history-table";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Viagem } from "@/types/viagem";
import {
  CodeBlock,
  PropsTable,
  ShowcaseHeader,
  ShowcaseSection,
} from "../../showcase";

const sampleHistory: Viagem[] = [
  {
    id: "1",
    destino: "Praia Grande",
    distanciaKm: 320,
    precoCombustivel: 5.89,
    consumoCarro: 12.5,
    quantidadePassageiros: 2,
    litrosTotais: 25.6,
    custoTotal: 150.78,
    custoPorKm: 0.47,
    custoPorPessoa: 75.39,
    createdAt: "2026-09-13T14:30:00.000Z",
  },
  {
    id: "2",
    destino: "Campinas",
    distanciaKm: 180,
    precoCombustivel: 5.49,
    consumoCarro: 11,
    quantidadePassageiros: 3,
    litrosTotais: 16.364,
    custoTotal: 89.84,
    custoPorKm: 0.5,
    custoPorPessoa: 29.95,
    createdAt: "2026-09-12T09:15:00.000Z",
  },
  {
    id: "3",
    distanciaKm: 45,
    precoCombustivel: 6.1,
    consumoCarro: 13,
    quantidadePassageiros: 1,
    litrosTotais: 3.462,
    custoTotal: 21.12,
    custoPorKm: 0.47,
    custoPorPessoa: 21.12,
    createdAt: "2026-09-10T18:45:00.000Z",
  },
];

const usageCode = `import { HistoryTable } from "@/components/history-table"
import type { Viagem } from "@/types/viagem"

export function HistorySection({ items }: { items: Viagem[] }) {
  return (
    <HistoryTable
      items={items}
      onSelect={(viagem) => console.log(viagem.id)}
      onEmptyAction={() => console.log("ir para calculadora")}
    />
  )
}`;

export default function HistoryTableShowcasePage() {
  const [selectedId, setSelectedId] = React.useState<string | undefined>("1");
  const [items, setItems] = React.useState<Viagem[]>(sampleHistory);

  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-muted/40 px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Showcase · HistoryTable
          </p>
          <ThemeToggle />
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-10 md:px-8">
        <ShowcaseHeader
          title="HistoryTable"
          description="Tabela interativa do histórico de viagens com colunas organizadas, seleção de linha e empty state."
        />

        <ShowcaseSection
          id="demo"
          title="Demo interativa"
          description="Clique em uma linha para selecionar. Use Limpar para forçar o empty state."
        >
          <HistoryTable
            items={items}
            selectedId={selectedId}
            onSelect={(viagem) => setSelectedId(viagem.id)}
            onClearHistory={() => {
              setItems([]);
              setSelectedId(undefined);
            }}
            onEmptyAction={() => setItems(sampleHistory)}
            emptyActionLabel="Restaurar exemplos"
          />
        </ShowcaseSection>

        <ShowcaseSection
          id="empty"
          title="Empty state"
          description="Quando não há registros salvos."
        >
          <HistoryTable
            items={[]}
            onEmptyAction={() => undefined}
            emptyActionLabel="Calcular primeira viagem"
          />
        </ShowcaseSection>

        <ShowcaseSection
          id="usage"
          title="Uso"
          description="Lista tipada com Viagem[] da API / domínio."
        >
          <CodeBlock code={usageCode} />
        </ShowcaseSection>

        <ShowcaseSection
          id="props"
          title="API"
          description="Props da tabela de histórico."
        >
          <PropsTable
            rows={[
              {
                name: "items",
                type: "Viagem[]",
                description: "Lista de viagens (já ordenada ou não).",
              },
              {
                name: "selectedId",
                type: "string",
                description: "Id da linha selecionada (estado visual).",
              },
              {
                name: "onSelect",
                type: "(viagem: Viagem) => void",
                description: "Torna as linhas clicáveis/selecionáveis.",
              },
              {
                name: "onClearHistory",
                type: "() => void",
                description: "Exibe botão Limpar no header quando há itens.",
              },
              {
                name: "onEmptyAction",
                type: "() => void",
                description: "CTA do empty state.",
              },
              {
                name: "emptyActionLabel",
                type: "string",
                defaultValue: '"Calcular primeira viagem"',
                description: "Texto do botão no empty state.",
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
          description="Navegação por teclado nas linhas e status do empty state."
        >
          <Card>
            <CardContent className="space-y-2 pt-6 text-sm text-muted-foreground">
              <p>
                Com <code className="font-mono text-foreground">onSelect</code>,
                linhas recebem <code className="font-mono text-foreground">tabIndex=0</code>,{" "}
                <code className="font-mono text-foreground">role=&quot;button&quot;</code> e
                respondem a Enter/Espaço.
              </p>
              <p>
                Empty state usa <code className="font-mono text-foreground">role=&quot;status&quot;</code>{" "}
                para anunciar a ausência de registros.
              </p>
              <p>
                Valores numéricos e datas usam tipografia mono para leitura
                alinhada em dashboards.
              </p>
            </CardContent>
          </Card>
        </ShowcaseSection>
      </div>
    </div>
  );
}
