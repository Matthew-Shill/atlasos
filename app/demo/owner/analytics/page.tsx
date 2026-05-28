"use client";

import { useShallow } from "zustand/react/shallow";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PageHeader } from "@/components/demo/page-header";
import { StatCard } from "@/components/demo/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyticsData } from "@/lib/data/seed";
import { useDemoStore } from "@/lib/store/demo-store";
import { formatCurrency } from "@/lib/format";
import { DollarSign, Calendar, TrendingUp, Users, Clock } from "lucide-react";

export default function AnalyticsPage() {
  const stats = useDemoStore(useShallow((s) => s.getDashboardStats()));

  return (
    <>
      <PageHeader title="Analytics" description="Business performance insights" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <StatCard label="Revenue (MTD)" value={formatCurrency(stats.monthlyRevenue)} icon={DollarSign} />
        <StatCard label="Bookings (week)" value={stats.upcomingThisWeek} icon={Calendar} />
        <StatCard label="Conversion rate" value={`${stats.leadConversion}%`} icon={TrendingUp} />
        <StatCard label="Avg client value" value={formatCurrency(392)} icon={DollarSign} />
        <StatCard label="Active clients" value={stats.activeClients} icon={Users} />
        <StatCard label="Avg response time" value="2.4h" icon={Clock} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.monthlyBookings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="bookings" stroke="#0331bd" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bookings by service</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.bookingsByService}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="service" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0331bd" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Lead conversion funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.funnel.map((stage, i) => {
                const max = analyticsData.funnel[0].count;
                const pct = Math.round((stage.count / max) * 100);
                return (
                  <div key={stage.stage}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{stage.stage}</span>
                      <span className="font-medium">{stage.count.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
