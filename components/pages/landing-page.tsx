"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Fuel, Route, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <section className="relative isolate flex flex-1 flex-col justify-center overflow-hidden bg-[linear-gradient(145deg,#052D14_0%,#073B1A_55%,#0B4825_100%)] px-4 py-16 text-white md:px-6 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-20 size-[420px] rounded-full border-[72px] border-[#76BB2A]/20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-16 size-[280px] rounded-full bg-[#76BB2A]/10 blur-2xl"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-xl space-y-6">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              O custo da viagem, gota a gota.
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-[#DDE8E0] sm:text-lg">
              Calcule combustível, rateie por passageiro e guarde o histórico,
              com a rota e o preço que você informa.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="min-h-12 bg-[#76BB2A] px-6 text-[#073B1A] hover:bg-[#95CB43]"
              >
                <Link href="/calcular">
                  Calcular agora
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-12 border-white/25 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/historico">Ver histórico</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="rounded-[1.75rem] bg-white p-8 shadow-[0_26px_70px_rgba(0,0,0,0.22)] sm:p-10">
              <Image
                src="/brand/logo-full.png"
                alt="Logo NaGota"
                width={384}
                height={384}
                className="mx-auto h-auto w-full max-w-[280px] object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background px-4 py-14 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">
            Como funciona
          </h2>
          <p className="mt-2 mb-8 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Três passos para saber quanto a viagem realmente custa.
          </p>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Route,
                title: "Informe o trecho",
                body: "Origem, destino e distância, manual ou pela rota.",
              },
              {
                icon: Fuel,
                title: "Preço e consumo",
                body: "Combustível, preço do litro e Km/L do seu carro.",
              },
              {
                icon: Users,
                title: "Veja o rateio",
                body: "Custo total, por km e por passageiro, com histórico.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <li key={title} className="space-y-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
