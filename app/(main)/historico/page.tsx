import type { Metadata } from "next";
import { HistoryPage } from "@/components/pages/history-page";

export const metadata: Metadata = {
  title: "Histórico de Viagens | Calcula Custo",
  description:
    "Acompanhe os cálculos de custo de viagem salvos nesta sessão.",
};

export default function HistoricoPage() {
  return <HistoryPage />;
}
