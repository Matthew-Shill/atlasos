"use client";

import { use } from "react";
import Link from "next/link";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { InvoiceStatusBadge } from "@/components/demo/status-badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDateShort } from "@/lib/format";
import { toast } from "sonner";

export default function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const invoice = useDemoStore((s) => s.invoices.find((i) => i.id === id));

  if (!invoice) return <p>Invoice not found</p>;

  return (
    <>
      <PageHeader
        title={invoice.number}
        description={invoice.clientName}
        actions={
          <>
            <InvoiceStatusBadge status={invoice.status} />
            <Button
              variant="outline"
              onClick={() => toast.success("Payment reminder sent (demo)")}
            >
              Send reminder
            </Button>
            <ButtonLink href="/demo/owner/billing" variant="ghost">
              Back
            </ButtonLink>
          </>
        }
      />
      <Card className="max-w-lg">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Due date</span>
            <span>{formatDateShort(invoice.dueDate)}</span>
          </div>
          <div className="border-t pt-4 space-y-2">
            {invoice.lineItems.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{item.description}</span>
                <span>{formatCurrency(item.amount)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold border-t pt-4">
            <span>Total</span>
            <span>{formatCurrency(invoice.amount)}</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
