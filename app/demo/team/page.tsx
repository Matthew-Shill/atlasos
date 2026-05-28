"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { DEMO_TEAM_MEMBER_ID } from "@/lib/demo-team";

export default function TeamDashboardPage() {
  const allAppointments = useDemoStore((s) => s.appointments);
  const allClients = useDemoStore((s) => s.clients);
  const allTasks = useDemoStore((s) => s.tasks);
  const messageThreads = useDemoStore((s) => s.messageThreads);
  const appointments = useMemo(
    () => allAppointments.filter((a) => a.teamMemberId === DEMO_TEAM_MEMBER_ID),
    [allAppointments]
  );
  const clients = useMemo(
    () => allClients.filter((c) => c.assignedTeamMemberId === DEMO_TEAM_MEMBER_ID),
    [allClients]
  );
  const tasks = useMemo(
    () =>
      allTasks.filter(
        (t) => t.assignedToId === DEMO_TEAM_MEMBER_ID && t.status !== "Done"
      ),
    [allTasks]
  );
  const unread = useMemo(
    () => messageThreads.reduce((sum, t) => sum + t.unread, 0),
    [messageThreads]
  );

  const todayApts = useMemo(
    () =>
      appointments.filter((a) => {
        const d = new Date(a.date);
        const t = new Date();
        return d.toDateString() === t.toDateString();
      }),
    [appointments]
  );

  return (
    <>
      <PageHeader
        title="Team dashboard"
        description="Jordan Lee — today's overview"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Today&apos;s appointments</p>
            <p className="text-2xl font-semibold">{todayApts.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Assigned clients</p>
            <p className="text-2xl font-semibold">{clients.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Open tasks</p>
            <p className="text-2xl font-semibold">{tasks.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Unread messages</p>
            <p className="text-2xl font-semibold">{unread}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today&apos;s schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {todayApts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No appointments today.</p>
            ) : (
              todayApts.map((a) => (
                <div key={a.id} className="rounded-lg border p-3 text-sm">
                  <p className="font-medium">{a.clientName}</p>
                  <p className="text-muted-foreground">
                    {a.service} · {formatDate(a.date)}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Assigned clients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {clients.slice(0, 6).map((c) => (
              <Link
                key={c.id}
                href={`/demo/team/clients/${c.id}`}
                className="block rounded-lg border p-3 text-sm hover:bg-muted"
              >
                <p className="font-medium">{c.name}</p>
                <p className="text-muted-foreground">{c.service}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
