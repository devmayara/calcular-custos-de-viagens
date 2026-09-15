import {
  AlertCircle,
  Calculator,
  CheckCircle2,
  Info,
  Pencil,
} from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { AppHeader } from "@/components/app-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const brandCore = [
  { name: "deep", hex: "#073B1A", className: "bg-primary-800" },
  { name: "lime", hex: "#76BB2A", className: "bg-secondary-500" },
  { name: "mid", hex: "#4F7F45", className: "bg-[#4F7F45]" },
  { name: "orange", hex: "#E8752E", className: "bg-brand-accent-500" },
  { name: "offwhite", hex: "#F4F1E8", className: "bg-neutral-100" },
  { name: "graphite", hex: "#20262E", className: "bg-neutral-900" },
] as const;

const primaryScale = [
  { name: "50", token: "--primary-50", className: "bg-primary-50" },
  { name: "100", token: "--primary-100", className: "bg-primary-100" },
  { name: "200", token: "--primary-200", className: "bg-primary-200" },
  { name: "300", token: "--primary-300", className: "bg-primary-300" },
  { name: "400", token: "--primary-400", className: "bg-primary-400" },
  { name: "500", token: "--primary-500", className: "bg-primary-500" },
  { name: "600", token: "--primary-600", className: "bg-primary-600" },
  { name: "700", token: "--primary-700", className: "bg-primary-700" },
  { name: "800", token: "--primary-800", className: "bg-primary-800" },
  { name: "900", token: "--primary-900", className: "bg-primary-900" },
  { name: "950", token: "--primary-950", className: "bg-primary-950" },
] as const;

const secondaryScale = [
  { name: "50", token: "--secondary-50", className: "bg-secondary-50" },
  { name: "100", token: "--secondary-100", className: "bg-secondary-100" },
  { name: "200", token: "--secondary-200", className: "bg-secondary-200" },
  { name: "300", token: "--secondary-300", className: "bg-secondary-300" },
  { name: "400", token: "--secondary-400", className: "bg-secondary-400" },
  { name: "500", token: "--secondary-500", className: "bg-secondary-500" },
  { name: "600", token: "--secondary-600", className: "bg-secondary-600" },
  { name: "700", token: "--secondary-700", className: "bg-secondary-700" },
  { name: "800", token: "--secondary-800", className: "bg-secondary-800" },
  { name: "900", token: "--secondary-900", className: "bg-secondary-900" },
  { name: "950", token: "--secondary-950", className: "bg-secondary-950" },
] as const;

const accentScale = [
  { name: "50", token: "--brand-accent-50", className: "bg-brand-accent-50" },
  {
    name: "100",
    token: "--brand-accent-100",
    className: "bg-brand-accent-100",
  },
  {
    name: "200",
    token: "--brand-accent-200",
    className: "bg-brand-accent-200",
  },
  {
    name: "300",
    token: "--brand-accent-300",
    className: "bg-brand-accent-300",
  },
  {
    name: "400",
    token: "--brand-accent-400",
    className: "bg-brand-accent-400",
  },
  {
    name: "500",
    token: "--brand-accent-500",
    className: "bg-brand-accent-500",
  },
  {
    name: "600",
    token: "--brand-accent-600",
    className: "bg-brand-accent-600",
  },
  {
    name: "700",
    token: "--brand-accent-700",
    className: "bg-brand-accent-700",
  },
  {
    name: "800",
    token: "--brand-accent-800",
    className: "bg-brand-accent-800",
  },
  {
    name: "900",
    token: "--brand-accent-900",
    className: "bg-brand-accent-900",
  },
  {
    name: "950",
    token: "--brand-accent-950",
    className: "bg-brand-accent-950",
  },
] as const;

const neutralScale = [
  { name: "0", token: "--neutral-0", className: "bg-neutral-0" },
  { name: "50", token: "--neutral-50", className: "bg-neutral-50" },
  { name: "100", token: "--neutral-100", className: "bg-neutral-100" },
  { name: "200", token: "--neutral-200", className: "bg-neutral-200" },
  { name: "300", token: "--neutral-300", className: "bg-neutral-300" },
  { name: "400", token: "--neutral-400", className: "bg-neutral-400" },
  { name: "500", token: "--neutral-500", className: "bg-neutral-500" },
  { name: "600", token: "--neutral-600", className: "bg-neutral-600" },
  { name: "700", token: "--neutral-700", className: "bg-neutral-700" },
  { name: "800", token: "--neutral-800", className: "bg-neutral-800" },
  { name: "900", token: "--neutral-900", className: "bg-neutral-900" },
  { name: "950", token: "--neutral-950", className: "bg-neutral-950" },
  { name: "1000", token: "--neutral-1000", className: "bg-neutral-1000" },
] as const;

const semanticColors = [
  {
    name: "Primary",
    bg: "bg-primary",
    fg: "text-primary-foreground",
    token: "--primary",
  },
  {
    name: "Secondary",
    bg: "bg-secondary",
    fg: "text-secondary-foreground",
    token: "--secondary",
  },
  {
    name: "Accent",
    bg: "bg-brand-accent",
    fg: "text-neutral-900",
    token: "--brand-accent",
  },
  {
    name: "Success",
    bg: "bg-success",
    fg: "text-success-foreground",
    token: "--success",
  },
  {
    name: "Warning",
    bg: "bg-warning",
    fg: "text-warning-foreground",
    token: "--warning",
  },
  {
    name: "Info",
    bg: "bg-info",
    fg: "text-info-foreground",
    token: "--info",
  },
  {
    name: "Destructive",
    bg: "bg-destructive",
    fg: "text-destructive-foreground",
    token: "--destructive",
  },
] as const;

const surfaceColors = [
  { name: "Background", className: "bg-background", token: "--background" },
  { name: "Card", className: "bg-card", token: "--card" },
  { name: "Muted", className: "bg-muted", token: "--muted" },
  { name: "Accent UI", className: "bg-accent", token: "--accent" },
  { name: "Border", className: "bg-border", token: "--border" },
  { name: "Input", className: "bg-input", token: "--input" },
] as const;

const typeScale = [
  {
    label: "Display XL",
    sample: "Economia em movimento.",
    className:
      "font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.035em]",
  },
  {
    label: "H1",
    sample: "Seu carro em boas mãos.",
    className:
      "font-heading text-4xl font-bold leading-[1.08] tracking-[-0.025em] sm:text-5xl",
  },
  {
    label: "H2",
    sample: "Controle dos seus gastos.",
    className: "font-heading text-[40px] font-semibold leading-[1.12]",
  },
  {
    label: "H3",
    sample: "Próxima revisão",
    className: "font-heading text-[32px] font-semibold leading-[1.18]",
  },
  {
    label: "Body",
    sample:
      "Acompanhe custos, manutenção e documentos em um único lugar, com informações claras para decidir melhor.",
    className: "font-sans text-base font-normal leading-[1.6]",
  },
  {
    label: "Label",
    sample: "Economizados este mês",
    className:
      "font-sans text-[13px] font-semibold leading-[1.25] tracking-[0.04em] uppercase",
  },
] as const;

const radii = [
  { name: "XS", className: "rounded-sm", token: "radius.xs", value: "4px" },
  { name: "SM", className: "rounded-md", token: "radius.sm", value: "8px" },
  { name: "MD", className: "rounded-lg", token: "radius.md", value: "12px" },
  { name: "LG", className: "rounded-xl", token: "radius.lg", value: "16px" },
  {
    name: "XL",
    className: "rounded-2xl",
    token: "radius.xl",
    value: "24px",
  },
  {
    name: "Full",
    className: "rounded-full",
    token: "radius.full",
    value: "9999px",
  },
] as const;

const shadows = [
  { name: "Elevation 1", className: "shadow-sm", token: "--elevation-1" },
  { name: "Elevation 2", className: "shadow-md", token: "--elevation-2" },
  { name: "Elevation 3", className: "shadow-lg", token: "--elevation-3" },
] as const;

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 space-y-4">
      <div>
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}

function ColorSwatch({
  name,
  token,
  className,
  textClassName,
}: {
  name: string;
  token: string;
  className: string;
  textClassName?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-border">
      <div className={`h-16 ${className} ${textClassName ?? ""}`} />
      <div className="space-y-0.5 bg-card p-2">
        <p className="text-xs font-medium text-foreground">{name}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{token}</p>
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen">
      <div className="relative pb-20 md:pb-0">
        <AppHeader />
        <AppBottomNav />
      </div>

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-10 md:px-8">
        <header className="space-y-3">
          <Badge variant="secondary">Foundation · NaGota v1.0</Badge>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            Style Guide
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Design tokens e componentes base do{" "}
            <span className="text-foreground">NaGota</span> — Modern Utility +
            Sustainable Mobility.
          </p>
        </header>

        <Section
          id="brand-core"
          title="Paleta observada"
          description="Seis tons-núcleo da identidade NaGota."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {brandCore.map((color) => (
              <ColorSwatch
                key={color.name}
                name={color.name}
                token={color.hex}
                className={color.className}
              />
            ))}
          </div>
        </Section>

        <Section
          id="colors"
          title="Cores semânticas e superfícies"
          description="Tokens usados pelos componentes shadcn/ui."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {semanticColors.map((color) => (
              <ColorSwatch
                key={color.token}
                name={color.name}
                token={color.token}
                className={color.bg}
                textClassName={color.fg}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {surfaceColors.map((color) => (
              <ColorSwatch
                key={color.token}
                name={color.name}
                token={color.token}
                className={color.className}
              />
            ))}
          </div>
        </Section>

        <Section
          id="primary-scale"
          title="Primary · Verde profundo"
          description="Âncora da marca — hierarquia, CTAs principais e superfícies fortes."
        >
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
            {primaryScale.map((swatch) => (
              <ColorSwatch
                key={swatch.token}
                name={swatch.name}
                token={swatch.token}
                className={swatch.className}
              />
            ))}
          </div>
        </Section>

        <Section
          id="secondary-scale"
          title="Secondary · Verde-lima"
          description="Sinal de performance, economia e estados positivos."
        >
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
            {secondaryScale.map((swatch) => (
              <ColorSwatch
                key={swatch.token}
                name={swatch.name}
                token={swatch.token}
                className={swatch.className}
              />
            ))}
          </div>
        </Section>

        <Section
          id="accent-scale"
          title="Accent · Laranja"
          description="Energia e CTA estratégico — no máximo 5–10% da composição."
        >
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
            {accentScale.map((swatch) => (
              <ColorSwatch
                key={swatch.token}
                name={swatch.name}
                token={swatch.token}
                className={swatch.className}
              />
            ))}
          </div>
        </Section>

        <Section
          id="neutral-scale"
          title="Neutros"
          description="Do off-white ao grafite — leitura limpa sem aspecto clínico."
        >
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {neutralScale.map((swatch) => (
              <ColorSwatch
                key={swatch.token}
                name={swatch.name}
                token={swatch.token}
                className={swatch.className}
              />
            ))}
          </div>
        </Section>

        <Section
          id="typography"
          title="Tipografia"
          description="Urbanist para voz da marca; Inter para leitura e UI."
        >
          <Card className="shadow-sm">
            <CardContent className="space-y-6 pt-6">
              {typeScale.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-2 border-b border-border pb-4 last:border-0 last:pb-0 sm:grid-cols-[120px_1fr]"
                >
                  <p className="text-xs font-medium text-muted-foreground">
                    {item.label}
                  </p>
                  <p className={`text-foreground ${item.className}`}>
                    {item.sample}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </Section>

        <Section
          id="radius"
          title="Border radius"
          description="Curvas moderadas: 12px em UI, até 24px em cards promocionais."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {radii.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center gap-3 rounded-xl bg-card p-4 shadow-sm ring-1 ring-border"
              >
                <div
                  className={`size-16 bg-primary ${item.className}`}
                  aria-hidden
                />
                <div className="text-center">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="shadows"
          title="Elevação"
          description="Flat por padrão. Profundidade tingida de verde profundo quando ajuda."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {shadows.map((item) => (
              <div
                key={item.name}
                className={`rounded-xl bg-card p-6 ${item.className}`}
              >
                <p className="font-heading text-sm font-semibold">{item.name}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {item.token}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="buttons"
          title="Botões"
          description="Primary profundo para ação; secondary lima para ganho/positivo."
        >
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Variants</CardTitle>
              <CardDescription>
                Laranja fica reservado a CTAs promocionais pontuais.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>Calcular Custo</Button>
              <Button variant="secondary">Economia</Button>
              <Button variant="outline">Ver Histórico</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Excluir</Button>
              <Button variant="link">Saiba mais</Button>
              <Button className="bg-brand-accent text-neutral-900 hover:bg-brand-accent-600 hover:text-white">
                CTA Accent
              </Button>
              <Button>
                <Pencil data-icon="inline-start" />
                Editar
              </Button>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Calcular">
                <Calculator />
              </Button>
            </CardFooter>
          </Card>
        </Section>

        <Section
          id="inputs"
          title="Inputs"
          description="Campos com altura mínima de toque (min-h-12), focus ring em lima (#95CB43) e labels em tipografia label."
        >
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Dados da viagem</CardTitle>
              <CardDescription>
                Exemplo alinhado ao fluxo MVP (km, preço, consumo).
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="destino">Destino (opcional)</Label>
                <Input id="destino" placeholder="Ex.: Praia Grande" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="km">Km total (ida + volta)</Label>
                <Input
                  id="km"
                  type="number"
                  inputMode="decimal"
                  placeholder="320"
                  className="font-heading tabular-nums"
                  defaultValue="320"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preco">Preço do combustível (R$/L)</Label>
                <Input
                  id="preco"
                  type="number"
                  inputMode="decimal"
                  placeholder="5,89"
                  className="font-heading tabular-nums"
                  defaultValue="5.89"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consumo">Consumo médio (Km/L)</Label>
                <Input
                  id="consumo"
                  type="number"
                  inputMode="decimal"
                  placeholder="12,5"
                  className="font-heading tabular-nums"
                  defaultValue="12.5"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="search">Busca no histórico</Label>
                <Input
                  id="search"
                  type="search"
                  placeholder="Buscar viagem..."
                />
                <p className="text-xs text-muted-foreground">
                  Mesma altura mínima usada na busca do histórico e na calculadora.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="min-h-12 w-full sm:w-auto">
                Calcular Custo
              </Button>
            </CardFooter>
          </Card>
        </Section>

        <Section
          id="cards-alerts"
          title="Cards, Badges & Alerts"
          description="Estado nunca é decoração — success, warning e error com função clara."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>Resumo da viagem</CardTitle>
                  <Badge>OK</Badge>
                </div>
                <CardDescription>Último cálculo salvo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-heading text-[40px] font-bold leading-none tracking-[-0.03em] text-primary">
                  R$ 150,78
                </p>
                <p className="text-sm text-muted-foreground">R$ 0,47 / km</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Gasolina</Badge>
                  <Badge variant="outline">320 km</Badge>
                  <Badge variant="destructive">Óleo em breve</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Alert className="border-[#A9CBEA] bg-[#EEF5FC]">
                <Info className="text-info" />
                <AlertTitle className="text-[#1B4F7E]">Informação</AlertTitle>
                <AlertDescription className="text-[#1B4F7E]/90">
                  Nova recomendação para otimizar o consumo nesta rota.
                </AlertDescription>
              </Alert>
              <Alert className="border-[#F5C77A] bg-[#FFF7E6]">
                <AlertCircle className="text-warning" />
                <AlertTitle className="text-[#8A5200]">
                  Manutenção em breve
                </AlertTitle>
                <AlertDescription className="text-[#8A5200]/90">
                  Faltam menos de 500 km para a próxima troca de óleo.
                </AlertDescription>
              </Alert>
              <Alert className="border-[#A5D6A7] bg-[#EDF7ED]">
                <CheckCircle2 className="text-success" />
                <AlertTitle className="text-[#1B5E20]">
                  Economia confirmada
                </AlertTitle>
                <AlertDescription className="text-[#1B5E20]/90">
                  Consumo dentro da média cadastrada do veículo.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </Section>

        <Section
          id="radio"
          title="Radio Group"
          description="Seleção de tipo de combustível no cadastro do veículo."
        >
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Tipo de combustível</CardTitle>
              <CardDescription>
                Usado no cadastro do veículo (MVP).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="gasolina" className="gap-3">
                {[
                  { value: "gasolina", label: "Gasolina" },
                  { value: "etanol", label: "Etanol" },
                  { value: "diesel", label: "Diesel" },
                ].map((option) => (
                  <div
                    key={option.value}
                    className="flex min-h-12 items-center gap-3 rounded-lg border border-border px-3"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`fuel-${option.value}`}
                    />
                    <Label htmlFor={`fuel-${option.value}`} className="flex-1">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </Section>
      </div>
    </div>
  );
}
