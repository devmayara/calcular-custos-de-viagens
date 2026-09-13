export type TipoCombustivel = "gasolina-comum" | "gasolina-aditivada" | "etanol" | "diesel" | "gnv";

export type TipoTrajeto = "ida" | "ida-volta";

export type DistanciaFonte = "manual" | "rota";

export type LugarRef = {
  label: string;
  placeId?: string;
  lat?: number;
  lng?: number;
};

export type CalcularCustoInput = {
  origem?: string;
  destino?: string;
  origemPlace?: LugarRef;
  destinoPlace?: LugarRef;
  distanciaKm: number;
  precoCombustivel: number;
  consumoCarro: number;
  quantidadePassageiros?: number;
  tipoCombustivel?: TipoCombustivel;
  tipoTrajeto?: TipoTrajeto;
  distanciaFonte?: DistanciaFonte;
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
  code?: string;
};

export type PlaceSuggestion = {
  placeId: string;
  description: string;
  lat?: number;
  lng?: number;
};

export type RotaResultado = {
  distanciaKm: number;
  duracaoSegundos?: number;
  origemLabel?: string;
  destinoLabel?: string;
};
