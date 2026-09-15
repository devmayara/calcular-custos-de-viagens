import type { Metadata } from "next";
import { CalculatePage } from "@/components/pages/calculate-page";

export const metadata: Metadata = {
  title: "Calcular | NaGota",
  description:
    "Calcule o custo de combustível da sua viagem com base em km, preço do litro e consumo.",
};

export default function CalcularRoutePage() {
  return <CalculatePage />;
}
