"use client";

import { useMemo } from "react";
import { usePortalClient } from "@/lib/client-portal";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { toast } from "sonner";

export default function ClientPaymentsPage() {
  const { clientId, client } = usePortalClient();
  const allInvoices = useDemoStore((s) => s.invoices);

  const invoices = useMemo(
    () => allInvoices.filter((i) => i.clientId === clientId),
    [allInvoices, clientId]
  );

  if (!client) return null;

  return (
    <>
      <PageHeader
        title="Payments"
        description="Invoices and your current plan"
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Your plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium">{client.plan ?? client.service}</p>
          {client.balance > 0 && (
            <p className="text-sm text-atlas-warning mt-2 font-medium">
              Balance due: {formatCurrency(client.balance)}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Invoices
        </h2>
        {invoices.length === 0 ? (
          <p className="text-sm text-muted-foreground">No invoices yet.</p>
        ) : (
          invoices.map((inv) => (
            <div
              key={inv.id}
              className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{inv.number}</p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(inv.amount)} · {inv.status}
                </p>
              </div>
              {(inv.status === "Open" || inv.status === "Past Due") && (
                <Button
                  size="sm"
                  onClick={() => toast.success("Payment recorded (demo)")}
                >
                  Pay now
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
