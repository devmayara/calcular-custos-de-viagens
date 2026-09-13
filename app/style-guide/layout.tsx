"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation } from "./navigation";

export default function StyleGuideLayout({
  children,
}: LayoutProps<"/style-guide">) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed top-0 left-0 z-30 hidden h-screen w-64 flex-col gap-6 overflow-y-auto border-r border-border bg-card p-6 md:flex">
        <div>
          <Link
            href="/style-guide"
            className="font-heading text-xl font-bold text-foreground"
          >
            Design System
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">
            Kinetic Precision
          </p>
        </div>

        <nav className="flex flex-col gap-6" aria-label="Style Guide">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                {section.title}
              </h3>
              {section.items.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm transition-colors",
                          pathname === item.href ||
                            (item.href !== "/style-guide" &&
                              pathname.startsWith(item.href))
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="mt-auto border-t border-border pt-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Voltar ao app
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto md:ml-64">{children}</main>
    </div>
  );
}
