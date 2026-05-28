"use client";

import { useShallow } from "zustand/react/shallow";
import Link from "next/link";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { ClientStatusBadge } from "@/components/demo/status-badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/format";
import type { ClientFilter } from "@/lib/types";
import { teamMembers } from "@/lib/data/seed";
import { cn } from "@/lib/utils";

const filters: { id: ClientFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "leads", label: "Leads" },
  { id: "active", label: "Active" },
  { id: "past_due", label: "Past Due" },
  { id: "follow_up", label: "Needs follow-up" },
  { id: "recent", label: "Recently added" },
];

export default function ClientsPage() {
  const clients = useDemoStore(useShallow((s) => s.getFilteredClients()));
  const search = useDemoStore((s) => s.clientSearch);
  const filter = useDemoStore((s) => s.clientFilter);
  const setSearch = useDemoStore((s) => s.setClientSearch);
  const setFilter = useDemoStore((s) => s.setClientFilter);
  return (
    <>
      <PageHeader
        eyebrow="CRM"
        title="Clients"
        description="Search, filter, and manage your client pipeline in one place."
      />
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search name, email, service, status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex flex-wrap gap-1">
          {filters.map((f) => (
            <Button
              key={f.id}
              size="sm"
              variant={filter === f.id ? "default" : "outline"}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="atlas-panel overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Assigned</TableHead>
              <TableHead>Next appointment</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((c) => {
              const tm = teamMembers.find((t: { id: string }) => t.id === c.assignedTeamMemberId);
              return (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <ClientStatusBadge status={c.status} />
                  </TableCell>
                  <TableCell>{c.service}</TableCell>
                  <TableCell>{tm?.name ?? "—"}</TableCell>
                  <TableCell>
                    {c.nextAppointment ? formatDate(c.nextAppointment) : "—"}
                  </TableCell>
                  <TableCell className={cn(c.balance > 0 && "text-atlas-warning font-medium")}>
                    {formatCurrency(c.balance)}
                  </TableCell>
                  <TableCell>
                    <ButtonLink href={`/demo/owner/clients/${c.id}`} size="sm" variant="ghost">
                      View
                    </ButtonLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
