import type { Metadata } from "next";
import { LandingPage } from "@/components/pages/landing-page";

export const metadata: Metadata = {
  title: "NaGota — Custo de viagem na gota",
  description:
    "Calcule o custo de combustível das suas viagens, rateie por passageiro e acompanhe o histórico.",
};

export default function HomePage() {
  return <LandingPage />;
}
