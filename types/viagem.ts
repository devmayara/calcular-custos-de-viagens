export type CalcularCustoInput = {
  destino?: string;
  distanciaKm: number;
  precoCombustivel: number;
  consumoCarro: number;
  quantidadePassageiros?: number;
};

export type CalculoResultado = {
  litrosTotais: number;
  custoTotal: number;
  custoPorKm: number;
  custoPorPessoa: number;
};

export type Viagem = CalcularCustoInput &
  CalculoResultado & {
    id: string;
    destino?: string;
    quantidadePassageiros: number;
    sessionId?: string;
    createdAt: string;
  };

export type ApiErrorBody = {
  error: string;
  details?: string[];
};
