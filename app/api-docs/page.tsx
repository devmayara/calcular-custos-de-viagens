import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";

export const metadata = {
  title: "API Docs | Calcula Custo de Viagem",
  description: "Documentação OpenAPI da API de cálculo de custo de viagem",
};

export default async function ApiDocsPage() {
  const spec = await getApiDocs();

  return (
    <main className="min-h-full bg-white">
      <div className="border-b border-zinc-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-zinc-900">
          Documentação da API
        </h1>
        <p className="text-sm text-zinc-600">
          OpenAPI / Swagger — Calcula Custo de Viagem
        </p>
      </div>
      <ReactSwagger spec={spec as Record<string, unknown>} />
    </main>
  );
}
