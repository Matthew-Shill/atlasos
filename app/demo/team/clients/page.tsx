"use client";

import { useMemo, useState } from "react";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { ClientStatusBadge } from "@/components/demo/status-badge";
import { CompanyLogo } from "@/components/demo/company-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/format";
import { getClientsForTeamMember } from "@/lib/demo-team";

export default function TeamClientsPage() {
  const allClients = useDemoStore((s) => s.clients);
  const [search, setSearch] = useState("");

  const clients = useMemo(() => {
    const assigned = getClientsForTeamMember(allClients);
    const q = search.trim().toLowerCase();
    if (!q) return assigned;
    return assigned.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.service.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q)
    );
  }, [allClients, search]);

  return (
    <>
      <PageHeader
        eyebrow="Your roster"
        title="My clients"
        description="Clients assigned to Jordan Lee."
      />
      <div className="mb-4">
        <Input
          placeholder="Search name, email, service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="atlas-panel overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Next appointment</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No clients match your search.
                </TableCell>
              </TableRow>
            ) : (
              clients.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <CompanyLogo clientId={c.id} name={c.name} size={32} />
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ClientStatusBadge status={c.status} />
                  </TableCell>
                  <TableCell>{c.service}</TableCell>
                  <TableCell>
                    {c.nextAppointment ? formatDate(c.nextAppointment) : "—"}
                  </TableCell>
                  <TableCell>{formatCurrency(c.balance)}</TableCell>
                  <TableCell>
                    <ButtonLink
                      href={`/demo/team/clients/${c.id}`}
                      size="sm"
                      variant="ghost"
                    >
                      View
                    </ButtonLink>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
