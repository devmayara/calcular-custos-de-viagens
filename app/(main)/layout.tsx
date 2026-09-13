import { AppHeader } from "@/components/app-header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      <main className="flex flex-1 flex-col bg-background">{children}</main>
    </>
  );
}
