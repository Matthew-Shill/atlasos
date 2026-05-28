import { AppShell } from "@/components/demo/app-shell";

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <AppShell variant="team">{children}</AppShell>;
}
