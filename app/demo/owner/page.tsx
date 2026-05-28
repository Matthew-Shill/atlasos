"use client";

import { useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  DollarSign,
  Users,
  Calendar,
  CheckSquare,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { GuidedDemoBanner } from "@/components/demo/guided-demo-banner";
import { PageHeader } from "@/components/demo/page-header";
import { PanelCard } from "@/components/demo/panel-card";
import { StatCard } from "@/components/demo/stat-card";
import { AppointmentStatusBadge } from "@/components/demo/status-badge";
import { AppointmentDetailDialog } from "@/components/demo/appointment-detail-dialog";
import { BookingWizard } from "@/components/demo/booking-wizard";
import { useDemoStore } from "@/lib/store/demo-store";
import { revenueChartData } from "@/lib/data/seed";
import { formatCurrency, formatDate, formatRelative } from "@/lib/format";
import type { Appointment } from "@/lib/types";
import { toast } from "sonner";

export default function OwnerDashboardPage() {
  const stats = useDemoStore(useShallow((s) => s.getDashboardStats()));
  const schedule = useDemoStore(useShallow((s) => s.getTodaySchedule()));
  const activityEvents = useDemoStore((s) => s.activityEvents);
  const allTasks = useDemoStore((s) => s.tasks);
  const activity = useMemo(() => activityEvents.slice(0, 6), [activityEvents]);
  const tasks = useMemo(
    () => allTasks.filter((t) => t.status !== "Done").slice(0, 5),
    [allTasks]
  );
  const completeTask = useDemoStore((s) => s.completeTask);
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Your business at a glance — revenue, clients, schedule, and what needs attention today."
        actions={
          <Button
            onClick={() => setBookingOpen(true)}
            className="atlas-btn-glow bg-gradient-to-r from-indigo-600 to-violet-600 font-bold hover:from-indigo-500 hover:to-violet-500"
          >
            New booking
          </Button>
        }
      />
      <GuidedDemoBanner />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Monthly Revenue" value={formatCurrency(stats.monthlyRevenue)} icon={DollarSign} trend="+12% vs last month" tone="blue" />
        <StatCard label="Active Clients" value={stats.activeClients} icon={Users} tone="violet" />
        <StatCard label="Upcoming This Week" value={stats.upcomingThisWeek} icon={Calendar} tone="cyan" />
        <StatCard label="Open Tasks" value={stats.openTasks} icon={CheckSquare} tone="amber" />
        <StatCard label="Lead Conversion" value={`${stats.leadConversion}%`} icon={TrendingUp} tone="emerald" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <PanelCard
          accent="cyan"
          title="Today's schedule"
          description="Appointments happening today"
          action={
            <ButtonLink href="/demo/owner/calendar" variant="ghost" size="sm">
              View calendar
            </ButtonLink>
          }
        >
          {schedule.length === 0 ? (
            <p className="text-sm text-muted-foreground">No appointments today.</p>
          ) : (
            <div className="space-y-2">
              {schedule.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                >
                  <div>
                    <p className="font-medium text-sm">{apt.clientName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {apt.service} · {formatDate(apt.date)}
                    </p>
                    <p className="text-xs text-muted-foreground">{apt.teamMemberName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <AppointmentStatusBadge status={apt.status} />
                    <Button size="sm" variant="outline" onClick={() => setSelectedApt(apt)}>
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </PanelCard>

        <PanelCard accent="violet" title="Recent activity" description="Latest updates across your business">
          <div className="space-y-4">
            {activity.map((a) => (
              <div key={a.id} className="flex gap-3 text-sm">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary ring-4 ring-primary/15" />
                <div>
                  <p className="font-medium leading-snug">{a.description}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatRelative(a.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard
          accent="amber"
          title="Open tasks"
          description="Items that need your attention"
          action={
            <ButtonLink href="/demo/owner/tasks" variant="ghost" size="sm">
              All tasks
            </ButtonLink>
          }
        >
          <div className="space-y-2">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-background p-3 text-sm"
              >
                <div>
                  <p className="font-medium">{t.title}</p>
                  {t.clientName && (
                    <p className="text-xs text-muted-foreground">{t.clientName}</p>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    completeTask(t.id);
                    toast.success("Task completed");
                  }}
                >
                  Done
                </Button>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard accent="emerald" title="Revenue snapshot" description="Monthly performance trend">
          <div className="h-52 min-h-[208px] w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={208}>
              <LineChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                <Line type="monotone" dataKey="revenue" stroke="#0331bd" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="projected" stroke="#94a3b8" strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>
      </div>

      <AppointmentDetailDialog
        appointment={selectedApt}
        open={!!selectedApt}
        onOpenChange={(o) => !o && setSelectedApt(null)}
      />
      <BookingWizard open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
