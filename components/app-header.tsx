"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Calculator, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { name: "Calcular", href: "/", icon: Calculator },
  { name: "Histórico de Viagens", href: "/historico", icon: History },
] as const;

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 text-foreground transition-opacity hover:opacity-80"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Calculator className="size-4" aria-hidden />
          </span>
          <span className="font-heading truncate text-sm font-semibold tracking-tight sm:text-base">
            Calcula Custo
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav
            className="hidden items-center gap-2 md:flex"
            aria-label="Navegação principal"
          >
            {navItems.map(({ name, href, icon: Icon }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);

              return (
                <Button
                  key={href}
                  asChild
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-10 min-h-10 gap-2 px-3",
                    !isActive && "bg-transparent"
                  )}
                >
                  <Link href={href}>
                    <Icon className="size-4" aria-hidden />
                    {name}
                  </Link>
                </Button>
              );
            })}
          </nav>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="size-10 min-h-12 min-w-12 md:min-h-10 md:min-w-10"
          >
            <Link href="/style-guide" aria-label="Abrir Style Guide">
              <BookOpen className="size-4" aria-hidden />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
