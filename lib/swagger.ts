import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Calcula Custo de Viagem",
        version: "1.0.0",
        description:
          "API MVP para cálculo de custo de viagem com combustível e histórico por sessão (localStorage via header x-session-id).",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Desenvolvimento local",
        },
      ],
      tags: [
        {
          name: "Viagens",
          description: "Cálculo de custo e histórico de viagens",
        },
      ],
      components: {
        schemas: {
          CalcularCustoRequest: {
            type: "object",
            required: ["distanciaKm", "precoCombustivel", "consumoCarro"],
            properties: {
              destino: {
                type: "string",
                description: "Nome opcional do destino da viagem",
                example: "Rio de Janeiro",
              },
              distanciaKm: {
                type: "number",
                description: "Distância total da viagem em km (ida + volta)",
                exclusiveMinimum: 0,
                example: 400,
              },
              precoCombustivel: {
                type: "number",
                description: "Preço do combustível em R$/L",
                minimum: 0,
                example: 5.89,
              },
              consumoCarro: {
                type: "number",
                description: "Consumo médio do carro em Km/L (deve ser > 0)",
                exclusiveMinimum: 0,
                example: 12.5,
              },
              quantidadePassageiros: {
                type: "integer",
                description: "Quantidade de passageiros para rateio (padrão: 1)",
                minimum: 1,
                default: 1,
                example: 2,
              },
            },
          },
          Viagem: {
            type: "object",
            required: [
              "id",
              "distanciaKm",
              "precoCombustivel",
              "consumoCarro",
              "quantidadePassageiros",
              "litrosTotais",
              "custoTotal",
              "custoPorKm",
              "custoPorPessoa",
              "createdAt",
            ],
            properties: {
              id: {
                type: "string",
                format: "uuid",
                example: "550e8400-e29b-41d4-a716-446655440000",
              },
              destino: {
                type: "string",
                example: "Rio de Janeiro",
              },
              distanciaKm: {
                type: "number",
                example: 400,
              },
              precoCombustivel: {
                type: "number",
                example: 5.89,
              },
              consumoCarro: {
                type: "number",
                example: 12.5,
              },
              quantidadePassageiros: {
                type: "integer",
                example: 2,
              },
              litrosTotais: {
                type: "number",
                description: "distanciaKm / consumoCarro",
                example: 32,
              },
              custoTotal: {
                type: "number",
                description: "litrosTotais * precoCombustivel",
                example: 188.48,
              },
              custoPorKm: {
                type: "number",
                description: "custoTotal / distanciaKm",
                example: 0.47,
              },
              custoPorPessoa: {
                type: "number",
                description: "custoTotal / quantidadePassageiros",
                example: 94.24,
              },
              sessionId: {
                type: "string",
                description: "Sessão associada (quando enviada via x-session-id)",
                example: "sessao-abc-123",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                example: "2026-09-13T19:00:00.000Z",
              },
            },
          },
          ApiError: {
            type: "object",
            required: ["error"],
            properties: {
              error: {
                type: "string",
                example: "Consumo não pode ser zero",
              },
              details: {
                type: "array",
                items: {
                  type: "string",
                },
                example: ["distanciaKm é obrigatório"],
              },
            },
          },
        },
      },
    },
  });

  return spec;
};
