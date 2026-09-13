import { AlertCircle, Calculator, CheckCircle2, Info, Pencil } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { AppHeader } from "@/components/app-header";
import { ThemeToggle } from "@/components/theme-toggle";
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
] as const;

const neutralScale = [
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
  { name: "Accent", className: "bg-accent", token: "--accent" },
  { name: "Border", className: "bg-border", token: "--border" },
  { name: "Input", className: "bg-input", token: "--input" },
] as const;

const typeScale = [
  {
    label: "Display LG",
    sample: "R$ 248,90",
    className: "text-[40px] font-bold leading-[48px] tracking-[-0.02em]",
  },
  {
    label: "Headline LG",
    sample: "Custo da viagem",
    className: "text-[28px] font-semibold leading-[34px]",
  },
  {
    label: "Title MD",
    sample: "Dados do combustível",
    className: "text-lg font-semibold leading-6",
  },
  {
    label: "Body MD",
    sample:
      "Informe km, preço do litro e consumo médio para calcular o custo total.",
    className: "text-base font-normal leading-6",
  },
  {
    label: "Label Numeric",
    sample: "12,5 km/L · R$ 5,89",
    className: "font-mono text-sm font-medium leading-5 tracking-[0.02em]",
  },
  {
    label: "Label SM",
    sample: "Última troca de óleo",
    className: "text-xs font-medium leading-4",
  },
] as const;

const radii = [
  { name: "sm", className: "rounded-sm", token: "--radius-sm", value: "4px" },
  { name: "md", className: "rounded-md", token: "--radius-md", value: "8px" },
  { name: "lg", className: "rounded-lg", token: "--radius-lg", value: "12px" },
  { name: "xl", className: "rounded-xl", token: "--radius-xl", value: "16px" },
  {
    name: "2xl",
    className: "rounded-2xl",
    token: "--radius-2xl",
    value: "24px",
  },
  {
    name: "full",
    className: "rounded-full",
    token: "--radius-full",
    value: "9999px",
  },
] as const;

const shadows = [
  { name: "sm", className: "shadow-sm", token: "--shadow-sm" },
  { name: "md", className: "shadow-md", token: "--shadow-md" },
  { name: "lg", className: "shadow-lg", token: "--shadow-lg" },
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
    <div className="overflow-hidden rounded-lg ring-1 ring-foreground/10">
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
      {/* <div className="border-b border-border bg-muted/40 px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              Preview · App chrome
            </p>
            <p className="text-sm text-foreground">
              Cabeçalho e navegação principal do aplicativo
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div> */}

      <div className="relative pb-20 md:pb-0">
        <AppHeader />
        <AppBottomNav />
      </div>

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-10 md:px-8">
        <header className="space-y-3">
          <Badge variant="secondary">Foundation</Badge>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Style Guide
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Design tokens e componentes base do{" "}
            <span className="text-foreground">Calcula Custo de Viagem</span>,
            inspirados em Kinetic Precision — confiável, eficiente e técnico.
          </p>
        </header>

        <Section
          id="colors"
          title="Paleta de cores"
          description="Cores semânticas e de superfície usadas pelos componentes shadcn/ui."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
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
          title="Escala Primary (Forest Green)"
          description="Verde da marca — CTAs, estados ativos e status positivos."
        >
          <div className="grid grid-cols-5 gap-2 lg:grid-cols-10">
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
          title="Escala Secondary (Gold)"
          description="Âmbar para alertas de manutenção, combustível baixo e avisos."
        >
          <div className="grid grid-cols-5 gap-2 lg:grid-cols-10">
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
          id="neutral-scale"
          title="Escala Neutral (Deep Forest)"
          description="Fundação estrutural — backgrounds, cards e divisores."
        >
          <div className="grid grid-cols-5 gap-2 lg:grid-cols-10">
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
          description="Inter para interface; JetBrains Mono para valores numéricos."
        >
          <Card>
            <CardContent className="space-y-6 pt-6">
              {typeScale.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-2 border-b border-border pb-4 last:border-0 last:pb-0 sm:grid-cols-[140px_1fr]"
                >
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
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
          description="Soft Modern — 8px em botões/inputs, 16px em cards."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {radii.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
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
          title="Sombras"
          description="Elevação ambientada — sombra preta em baixa opacidade sobre tons profundos."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {shadows.map((item) => (
              <div
                key={item.name}
                className={`rounded-xl bg-card p-6 ${item.className}`}
              >
                <p className="text-sm font-medium">shadow-{item.name}</p>
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
          description="Variantes e estados do Button shadcn/ui com os tokens aplicados."
        >
          <Card>
            <CardHeader>
              <CardTitle>Variants</CardTitle>
              <CardDescription>
                Primary para ações principais; outline para secundárias.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>Calcular Custo</Button>
              <Button variant="secondary">Secundário</Button>
              <Button variant="outline">Ver Histórico</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Excluir</Button>
              <Button variant="link">Saiba mais</Button>
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
          description="Campos de formulário com foco na primary e tipografia mono para números."
        >
          <Card>
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
                  className="font-mono"
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
                  className="font-mono"
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
                  className="font-mono"
                  defaultValue="12.5"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="search">Busca no histórico</Label>
                <Input
                  id="search"
                  type="search"
                  placeholder="Buscar viagem..."
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Estado disabled para referência visual.
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
          description="Containers e feedback semântico para saúde do veículo e custos."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>Resumo da viagem</CardTitle>
                  <Badge>OK</Badge>
                </div>
                <CardDescription>Último cálculo salvo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-mono text-[40px] font-bold leading-none tracking-[-0.02em] text-primary">
                  R$ 150,78
                </p>
                <p className="font-mono text-sm text-muted-foreground">
                  R$ 0,47 / km
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Gasolina</Badge>
                  <Badge variant="outline">320 km</Badge>
                  <Badge variant="destructive">Óleo em breve</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Alert>
                <Info />
                <AlertTitle>Informação</AlertTitle>
                <AlertDescription>
                  Salve o cálculo para acompanhar o gasto mensal no histórico.
                </AlertDescription>
              </Alert>
              <Alert className="border-warning/40 bg-warning/10 text-foreground">
                <AlertCircle className="text-warning-foreground" />
                <AlertTitle>Manutenção em breve</AlertTitle>
                <AlertDescription>
                  Faltam menos de 500 km para a próxima troca de óleo.
                </AlertDescription>
              </Alert>
              <Alert className="border-success/40 bg-success/10">
                <CheckCircle2 className="text-success" />
                <AlertTitle>Sistema OK</AlertTitle>
                <AlertDescription>
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
          <Card>
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
