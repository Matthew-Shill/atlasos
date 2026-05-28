"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { ClientStatusBadge } from "@/components/demo/status-badge";
import { BookingWizard } from "@/components/demo/booking-wizard";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { teamMembers } from "@/lib/data/seed";
import { formatCurrency, formatDate, formatRelative } from "@/lib/format";
import type { ClientStatus } from "@/lib/types";
import { toast } from "sonner";

export default function ClientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const client = useDemoStore((s) => s.getClient(id));
  const clientNotes = useDemoStore((s) => s.clientNotes);
  const documents = useDemoStore((s) => s.documents);
  const allInvoices = useDemoStore((s) => s.invoices);
  const appointments = useDemoStore((s) => s.appointments);
  const activityEvents = useDemoStore((s) => s.activityEvents);
  const notes = useMemo(
    () => clientNotes.filter((n) => n.clientId === id),
    [clientNotes, id]
  );
  const docs = useMemo(
    () => documents.filter((d) => d.clientId === id),
    [documents, id]
  );
  const invoices = useMemo(
    () => allInvoices.filter((i) => i.clientId === id),
    [allInvoices, id]
  );
  const apts = useMemo(
    () => appointments.filter((a) => a.clientId === id),
    [appointments, id]
  );
  const timeline = useMemo(
    () => activityEvents.filter((e) => e.clientId === id),
    [activityEvents, id]
  );
  const addNote = useDemoStore((s) => s.addNote);
  const updateStatus = useDemoStore((s) => s.updateClientStatus);
  const createInvoice = useDemoStore((s) => s.createInvoiceForClient);
  const [noteText, setNoteText] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);

  if (!client) {
    return (
      <div className="text-center py-12">
        <p>Client not found.</p>
        <ButtonLink href="/demo/owner/clients" className="mt-4">
          Back to clients
        </ButtonLink>
      </div>
    );
  }

  const assigned = teamMembers.find((t) => t.id === client.assignedTeamMemberId);

  return (
    <>
      <PageHeader
        title={client.name}
        description={client.email}
        actions={
          <>
            <Select
              value={client.status}
              onValueChange={(v) => {
                if (!v) return;
                updateStatus(id, v as ClientStatus);
                toast.success("Status updated");
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["Lead", "Trial", "Active", "Past Due", "Paused", "Archived"] as ClientStatus[]).map(
                  (s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <ButtonLink href={`/demo/owner/messages?clientId=${id}`} variant="outline">
              Message
            </ButtonLink>
            <Button onClick={() => setBookingOpen(true)}>Schedule</Button>
            <Button
              variant="outline"
              onClick={() => {
                createInvoice(id);
                toast.success("Invoice created");
              }}
            >
              Create invoice
            </Button>
          </>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <ClientStatusBadge status={client.status} />
        <span className="text-sm text-muted-foreground">{client.phone}</span>
        <span className="text-sm text-muted-foreground">Assigned: {assigned?.name}</span>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{client.plan ?? client.service}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Next appointment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">
                  {client.nextAppointment ? formatDate(client.nextAppointment) : "None"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{formatCurrency(client.totalRevenue)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{formatCurrency(client.balance)}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4 space-y-3">
          {timeline.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity yet.</p>
          ) : (
            timeline.map((e) => (
              <div key={e.id} className="flex gap-3 border-l-2 border-primary pl-4 py-1">
                <div>
                  <p className="text-sm font-medium">{e.description}</p>
                  <p className="text-xs text-muted-foreground">{formatRelative(e.createdAt)}</p>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="notes" className="mt-4 space-y-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Add internal note..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
            <Button
              onClick={() => {
                if (!noteText.trim()) return;
                addNote(id, noteText);
                setNoteText("");
                toast.success("Note added");
              }}
            >
              Add
            </Button>
          </div>
          {notes.map((n) => (
            <Card key={n.id}>
              <CardContent className="p-4">
                <p className="text-sm">{n.content}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {n.authorName} · {formatRelative(n.createdAt)}
                  {n.pinned && " · Pinned"}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="documents" className="mt-4 space-y-2">
          {docs.map((d) => (
            <div key={d.id} className="flex justify-between rounded-lg border p-3 text-sm">
              <span>{d.name}</span>
              <span className="text-muted-foreground">{formatRelative(d.uploadedAt)}</span>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="billing" className="mt-4 space-y-2">
          {invoices.map((inv) => (
            <Link
              key={inv.id}
              href={`/demo/owner/billing/invoices/${inv.id}`}
              className="flex justify-between rounded-lg border p-3 text-sm hover:bg-muted"
            >
              <span>
                {inv.number} — {formatCurrency(inv.amount)}
              </span>
              <span>{inv.status}</span>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value="appointments" className="mt-4 space-y-2">
          {apts.map((a) => (
            <div key={a.id} className="rounded-lg border p-3 text-sm">
              <p className="font-medium">{a.service}</p>
              <p className="text-muted-foreground">{formatDate(a.date)} — {a.status}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <BookingWizard open={bookingOpen} onOpenChange={setBookingOpen} defaultClientId={id} />
    </>
  );
}
