import { AppShell } from "@/components/demo/app-shell";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <AppShell variant="client">{children}</AppShell>;
}
