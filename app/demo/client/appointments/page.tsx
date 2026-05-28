"use client";

import { useMemo } from "react";
import { usePortalClient } from "@/lib/client-portal";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { AppointmentStatusBadge } from "@/components/demo/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";

export default function ClientAppointmentsPage() {
  const { clientId, client } = usePortalClient();
  const allAppointments = useDemoStore((s) => s.appointments);

  const appointments = useMemo(
    () =>
      allAppointments
        .filter((a) => a.clientId === clientId && a.status !== "Canceled")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [allAppointments, clientId]
  );

  const now = new Date();
  const upcoming = appointments.filter(
    (a) => new Date(a.date) >= now && a.status !== "Completed"
  );
  const past = appointments.filter(
    (a) => new Date(a.date) < now || a.status === "Completed"
  );

  if (!client) return null;

  return (
    <>
      <PageHeader
        title="Appointments"
        description="Upcoming visits and your appointment history"
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Upcoming</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground">No upcoming appointments.</p>
          ) : (
            upcoming.map((a) => (
              <div
                key={a.id}
                className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{a.service}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(a.date)} · with {a.teamMemberName}
                  </p>
                  {a.location && (
                    <p className="text-sm text-muted-foreground">{a.location}</p>
                  )}
                </div>
                <AppointmentStatusBadge status={a.status} />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {past.length === 0 ? (
            <p className="text-sm text-muted-foreground">No past appointments yet.</p>
          ) : (
            past.map((a) => (
              <div key={a.id} className="rounded-lg border p-4 text-sm">
                <div className="flex justify-between gap-2">
                  <p className="font-medium">{a.service}</p>
                  <AppointmentStatusBadge status={a.status} />
                </div>
                <p className="text-muted-foreground mt-1">
                  {formatDate(a.date)} · {a.teamMemberName}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </>
  );
}
