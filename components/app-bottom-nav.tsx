"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, History } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Calcular", href: "/", icon: Calculator },
  { name: "Histórico", href: "/historico", icon: History },
] as const;

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      aria-label="Navegação principal"
    >
      <ul className="mx-auto grid h-16 max-w-lg grid-cols-2">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <li key={href} className="flex">
              <Link
                href={href}
                className={cn(
                  "flex min-h-12 flex-1 flex-col items-center justify-center gap-1 px-2 text-xs font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={cn("size-5", isActive && "stroke-[2.25px]")}
                  aria-hidden
                />
                <span>{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
