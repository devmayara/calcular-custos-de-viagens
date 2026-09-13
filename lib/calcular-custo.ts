import type { CalcularCustoInput, CalculoResultado } from "@/types/viagem";

function arredondar(valor: number, casas = 2): number {
  const fator = 10 ** casas;
  return Math.round((valor + Number.EPSILON) * fator) / fator;
}

export function calcularCustoViagem(
  input: CalcularCustoInput
): CalculoResultado {
  const quantidadePassageiros = input.quantidadePassageiros ?? 1;
  const litrosTotais = input.distanciaKm / input.consumoCarro;
  const custoTotal = litrosTotais * input.precoCombustivel;
  const custoPorKm = custoTotal / input.distanciaKm;
  const custoPorPessoa = custoTotal / quantidadePassageiros;

  return {
    litrosTotais: arredondar(litrosTotais, 3),
    custoTotal: arredondar(custoTotal),
    custoPorKm: arredondar(custoPorKm),
    custoPorPessoa: arredondar(custoPorPessoa),
  };
}
