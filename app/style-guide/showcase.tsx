import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ShowcaseHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="space-y-3">
      <Badge variant="secondary">Components</Badge>
      <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="max-w-2xl text-muted-foreground">{description}</p>
    </header>
  );
}

export function ShowcaseSection({
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
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground">
      <code>{code}</code>
    </pre>
  );
}

export function PropsTable({
  rows,
}: {
  rows: Array<{
    name: string;
    type: string;
    defaultValue?: string;
    description: string;
  }>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Props</CardTitle>
        <CardDescription>
          Interface pública do componente para composição nas páginas do MVP.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="pb-2 pr-4 font-medium">Prop</th>
              <th className="pb-2 pr-4 font-medium">Tipo</th>
              <th className="pb-2 pr-4 font-medium">Default</th>
              <th className="pb-2 font-medium">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-border last:border-0">
                <td className="py-3 pr-4 font-mono text-xs text-primary">
                  {row.name}
                </td>
                <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">
                  {row.type}
                </td>
                <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">
                  {row.defaultValue ?? "—"}
                </td>
                <td className="py-3 text-muted-foreground">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
