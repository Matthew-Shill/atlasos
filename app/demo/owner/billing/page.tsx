"use client";

import Link from "next/link";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { StatCard } from "@/components/demo/stat-card";
import { InvoiceStatusBadge } from "@/components/demo/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, AlertCircle, CreditCard } from "lucide-react";
import { formatCurrency, formatDateShort } from "@/lib/format";

export default function BillingPage() {
  const invoices = useDemoStore((s) => s.invoices);
  const mrr = 18420;
  const outstanding = invoices
    .filter((i) => i.status === "Open" || i.status === "Past Due")
    .reduce((s, i) => s + i.amount, 0);
  const failed = invoices.filter((i) => i.status === "Failed").length;

  return (
    <>
      <PageHeader title="Billing" description="Invoices, subscriptions, and payments" />
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <StatCard label="Monthly recurring revenue" value={formatCurrency(mrr)} icon={DollarSign} />
        <StatCard label="Outstanding invoices" value={formatCurrency(outstanding)} icon={AlertCircle} />
        <StatCard label="Failed payments" value={failed} icon={CreditCard} />
      </div>
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-medium">{inv.number}</TableCell>
                <TableCell>{inv.clientName}</TableCell>
                <TableCell>{formatCurrency(inv.amount)}</TableCell>
                <TableCell>
                  <InvoiceStatusBadge status={inv.status} />
                </TableCell>
                <TableCell>{formatDateShort(inv.dueDate)}</TableCell>
                <TableCell>
                  <Link
                    href={`/demo/owner/billing/invoices/${inv.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
