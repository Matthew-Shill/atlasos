"use client";

import { useMemo, useState } from "react";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { AppointmentStatusBadge } from "@/components/demo/status-badge";
import { AppointmentDetailDialog } from "@/components/demo/appointment-detail-dialog";
import { BookingWizard } from "@/components/demo/booking-wizard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, formatDateShort } from "@/lib/format";
import type { Appointment } from "@/lib/types";
import {
  eachWeekOfInterval,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  format,
} from "date-fns";

export function CalendarView({
  teamMemberId,
  allowBooking = true,
  description = "Scheduling and appointments",
}: {
  teamMemberId?: string;
  allowBooking?: boolean;
  description?: string;
}) {
  const allAppointments = useDemoStore((s) => s.appointments);
  const [view, setView] = useState<"week" | "month" | "list">("week");
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [monthCursor, setMonthCursor] = useState(startOfMonth(new Date()));

  const appointments = useMemo(
    () =>
      teamMemberId
        ? allAppointments.filter((a) => a.teamMemberId === teamMemberId)
        : allAppointments,
    [allAppointments, teamMemberId]
  );

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(weekStart, { weekStartsOn: 0 }),
  });

  const weekApts = useMemo(
    () =>
      appointments.filter((a) => {
        const d = parseISO(a.date);
        return d >= weekStart && d <= endOfWeek(weekStart, { weekStartsOn: 0 });
      }),
    [appointments, weekStart]
  );

  const sorted = useMemo(
    () =>
      [...appointments].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    [appointments]
  );

  const monthWeeks = useMemo(() => {
    const monthStart = startOfMonth(monthCursor);
    const monthEnd = endOfMonth(monthCursor);
    const weekStarts = eachWeekOfInterval(
      { start: monthStart, end: monthEnd },
      { weekStartsOn: 0 }
    );
    return weekStarts.map((weekStartDate) =>
      eachDayOfInterval({
        start: weekStartDate,
        end: endOfWeek(weekStartDate, { weekStartsOn: 0 }),
      })
    );
  }, [monthCursor]);

  return (
    <>
      <PageHeader
        title="Calendar"
        description={description}
        actions={
          allowBooking ? (
            <Button onClick={() => setBookingOpen(true)}>New booking</Button>
          ) : undefined
        }
      />

      <Tabs
        value={view}
        onValueChange={(v) => setView(v as "week" | "month" | "list")}
      >
        <TabsList>
          <TabsTrigger value="week">Week view</TabsTrigger>
          <TabsTrigger value="month">Month view</TabsTrigger>
          <TabsTrigger value="list">List view</TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="mt-4">
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const dayApts = weekApts.filter((a) =>
                isSameDay(parseISO(a.date), day)
              );
              return (
                <Card key={day.toISOString()} className="min-h-[120px]">
                  <CardContent className="p-2">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">
                      {formatDateShort(day.toISOString())}
                    </p>
                    <div className="space-y-1">
                      {dayApts.map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setSelected(a)}
                          className="w-full rounded bg-primary/10 px-1.5 py-1 text-left text-xs hover:bg-primary/20"
                        >
                          {a.clientName}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="month" className="mt-4">
          <div className="mb-4 flex items-center justify-between">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setMonthCursor(
                  (m) => new Date(m.getFullYear(), m.getMonth() - 1, 1)
                )
              }
            >
              Prev
            </Button>
            <p className="text-sm font-semibold">{format(monthCursor, "MMMM yyyy")}</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setMonthCursor(
                  (m) => new Date(m.getFullYear(), m.getMonth() + 1, 1)
                )
              }
            >
              Next
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="space-y-1">
            {monthWeeks.map((week, idx) => (
              <div key={idx} className="grid grid-cols-7 gap-1">
                {week.map((day) => {
                  const dayApts = appointments.filter((a) =>
                    isSameDay(parseISO(a.date), day)
                  );
                  return (
                    <div
                      key={day.toISOString()}
                      className={`min-h-24 rounded-lg border p-1.5 ${
                        isSameMonth(day, monthCursor)
                          ? "bg-card"
                          : "bg-muted/25 text-muted-foreground"
                      }`}
                    >
                      <p className="mb-1 text-xs font-semibold">{format(day, "d")}</p>
                      <div className="space-y-1">
                        {dayApts.slice(0, 2).map((a) => (
                          <button
                            key={a.id}
                            type="button"
                            onClick={() => setSelected(a)}
                            className="w-full truncate rounded bg-indigo-100 px-1.5 py-0.5 text-left text-[11px] font-medium text-indigo-900 hover:bg-indigo-200"
                          >
                            {a.clientName}
                          </button>
                        ))}
                        {dayApts.length > 2 && (
                          <p className="text-[11px] text-muted-foreground">
                            +{dayApts.length - 2} more
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-4 space-y-2">
          {sorted.length === 0 ? (
            <p className="text-sm text-muted-foreground">No appointments scheduled.</p>
          ) : (
            sorted.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-lg border bg-card p-4"
              >
                <div>
                  <p className="font-medium">{a.clientName}</p>
                  <p className="text-sm text-muted-foreground">
                    {a.service} · {formatDate(a.date)}
                    {!teamMemberId && ` · ${a.teamMemberName}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <AppointmentStatusBadge status={a.status} />
                  <Button size="sm" variant="outline" onClick={() => setSelected(a)}>
                    View
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>

      <AppointmentDetailDialog
        appointment={selected}
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
      />
      {allowBooking && (
        <BookingWizard open={bookingOpen} onOpenChange={setBookingOpen} />
      )}
    </>
  );
}
