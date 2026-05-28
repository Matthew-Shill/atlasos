"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const LABELS: Record<string, string> = {
  demo: "Demo",
  owner: "Owner",
  client: "Client",
  team: "Team",
  clients: "Clients",
  calendar: "Calendar",
  messages: "Messages",
  automations: "Automations",
  billing: "Billing",
  intake: "Intake",
  tasks: "Tasks",
  analytics: "Analytics",
  settings: "Settings",
  invoices: "Invoices",
  appointments: "Appointments",
  documents: "Documents",
  payments: "Payments",
  profile: "Profile",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) return null;

  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = LABELS[seg] ?? (seg.startsWith("client-") || seg.startsWith("intake-") ? "Detail" : seg);
    return { href, label, isLast: i === segments.length - 1 };
  });

  return (
    <nav aria-label="Breadcrumb" className="hidden items-center gap-1 text-sm md:flex">
      {crumbs.map((c, i) => (
        <span key={c.href} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />}
          {c.isLast ? (
            <span className="font-medium text-foreground">{c.label}</span>
          ) : (
            <Link
              href={c.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {c.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
