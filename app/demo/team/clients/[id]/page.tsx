"use client";

import { use, useMemo, useState } from "react";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import {
  AppointmentStatusBadge,
  ClientStatusBadge,
} from "@/components/demo/status-badge";
import { CompanyLogo } from "@/components/demo/company-logo";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { DEMO_TEAM_MEMBER_ID } from "@/lib/demo-team";
import { formatDate, formatRelative } from "@/lib/format";
import { toast } from "sonner";

export default function TeamClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const client = useDemoStore((s) => s.getClient(id));
  const addNote = useDemoStore((s) => s.addNote);
  const completeTask = useDemoStore((s) => s.completeTask);
  const allNotes = useDemoStore((s) => s.clientNotes);
  const allAppointments = useDemoStore((s) => s.appointments);
  const allTasks = useDemoStore((s) => s.tasks);
  const [note, setNote] = useState("");

  const notes = useMemo(
    () =>
      allNotes
        .filter((n) => n.clientId === id)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
    [allNotes, id]
  );

  const appointments = useMemo(
    () =>
      allAppointments
        .filter(
          (a) =>
            a.clientId === id && a.teamMemberId === DEMO_TEAM_MEMBER_ID
        )
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
    [allAppointments, id]
  );

  const upcoming = appointments.filter(
    (a) => new Date(a.date) >= new Date() && a.status !== "Canceled"
  );
  const past = appointments.filter(
    (a) => new Date(a.date) < new Date() || a.status === "Completed"
  );

  const tasks = useMemo(
    () => allTasks.filter((t) => t.clientId === id && t.status !== "Done"),
    [allTasks, id]
  );

  if (!client) {
    return (
      <div>
        <p>Client not found</p>
        <ButtonLink href="/demo/team/clients" className="mt-4">
          Back to clients
        </ButtonLink>
      </div>
    );
  }

  if (client.assignedTeamMemberId !== DEMO_TEAM_MEMBER_ID) {
    return (
      <div>
        <p className="text-muted-foreground">This client is not on your roster.</p>
        <ButtonLink href="/demo/team/clients" className="mt-4">
          Back to my clients
        </ButtonLink>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={client.name}
        description="Assigned client — staff view"
        actions={
          <>
            <ButtonLink href="/demo/team/messages" variant="outline">
              Messages
            </ButtonLink>
            <ButtonLink href="/demo/team/clients" variant="outline">
              All clients
            </ButtonLink>
          </>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <CompanyLogo clientId={client.id} name={client.name} size={48} />
        <div>
          <ClientStatusBadge status={client.status} />
          <p className="mt-1 text-sm text-muted-foreground">{client.email}</p>
          <p className="text-sm text-muted-foreground">{client.phone}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {client.service}
            {client.plan ? ` · ${client.plan}` : ""}
          </p>
        </div>
      </div>

      <Tabs defaultValue="schedule">
        <TabsList>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {upcoming.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No upcoming appointments.
                </p>
              ) : (
                upcoming.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-lg border p-3 text-sm"
                  >
                    <div>
                      <p className="font-medium">{a.service}</p>
                      <p className="text-muted-foreground">
                        {formatDate(a.date)}
                        {a.location ? ` · ${a.location}` : ""}
                      </p>
                    </div>
                    <AppointmentStatusBadge status={a.status} />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Past appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {past.length === 0 ? (
                <p className="text-sm text-muted-foreground">No past visits yet.</p>
              ) : (
                past.map((a) => (
                  <div key={a.id} className="rounded-lg border p-3 text-sm">
                    <p className="font-medium">{a.service}</p>
                    <p className="text-muted-foreground">
                      {formatDate(a.date)} — {a.status}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-4 space-y-4">
          <Card className="max-w-lg">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">Add private note</h3>
              <Textarea
                placeholder="Add internal note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button
                onClick={() => {
                  if (!note.trim()) return;
                  addNote(id, note, "Jordan Lee");
                  setNote("");
                  toast.success("Note saved");
                }}
              >
                Save note
              </Button>
            </CardContent>
          </Card>
          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notes yet.</p>
          ) : (
            notes.map((n) => (
              <Card key={n.id}>
                <CardContent className="p-4">
                  <p className="text-sm">{n.content}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {n.authorName} · {formatRelative(n.createdAt)}
                    {n.pinned ? " · Pinned" : ""}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="tasks" className="mt-4 space-y-2">
          {tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">No open tasks.</p>
          ) : (
            tasks.map((t) => (
              <div
                key={t.id}
                className="flex justify-between rounded-lg border p-3 text-sm"
              >
                <span>{t.title}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    completeTask(t.id);
                    toast.success("Task completed");
                  }}
                >
                  Complete
                </Button>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
