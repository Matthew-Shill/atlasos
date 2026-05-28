"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePortalClient } from "@/lib/client-portal";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { CompanyLogo } from "@/components/demo/company-logo";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/format";
import { toast } from "sonner";
import { Calendar, CreditCard, FileText, MessageSquare } from "lucide-react";

const quickLinks = [
  { href: "/demo/client/appointments", label: "Appointments", icon: Calendar },
  { href: "/demo/client/messages", label: "Messages", icon: MessageSquare },
  { href: "/demo/client/documents", label: "Documents", icon: FileText },
  { href: "/demo/client/payments", label: "Payments", icon: CreditCard },
];

export default function ClientHomePage() {
  const { clientId, client } = usePortalClient();
  const allOnboardingItems = useDemoStore((s) => s.onboardingItems);
  const allAppointments = useDemoStore((s) => s.appointments);
  const toggleOnboarding = useDemoStore((s) => s.toggleOnboardingItem);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);

  const onboarding = useMemo(
    () => allOnboardingItems.filter((o) => o.clientId === clientId),
    [allOnboardingItems, clientId]
  );

  const nextApt = useMemo(() => {
    return allAppointments
      .filter(
        (a) =>
          a.clientId === clientId &&
          a.status !== "Canceled" &&
          new Date(a.date) > new Date() &&
          a.status !== "Completed"
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  }, [allAppointments, clientId]);

  if (!client) {
    return <p className="p-6">Loading client portal...</p>;
  }

  const completedOnboarding = onboarding.filter((o) => o.completed).length;

  return (
    <>
      <PageHeader
        title={`Welcome, ${client.name.split(" ")[0]}`}
        description="Your client portal at Northline Studio"
      />

      <div className="mb-6 flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm">
        <CompanyLogo clientId={clientId} name={client.name} size={56} />
        <div>
          <p className="font-semibold">{client.name}</p>
          <p className="text-sm text-muted-foreground">{client.plan ?? client.service}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 rounded-xl border bg-card p-4 text-sm font-semibold shadow-sm transition-colors hover:bg-muted/50"
          >
            <link.icon className="h-5 w-5 text-indigo-600" />
            {link.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Next appointment</CardTitle>
          </CardHeader>
          <CardContent>
            {nextApt ? (
              <>
                <p className="font-medium">{nextApt.service}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatDate(nextApt.date)}
                </p>
                <p className="text-sm text-muted-foreground">
                  with {nextApt.teamMemberName}
                </p>
                {nextApt.location && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {nextApt.location}
                  </p>
                )}
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => setRescheduleOpen(true)}>
                    Reschedule
                  </Button>
                  <ButtonLink href="/demo/client/messages" size="sm" variant="outline">
                    Message team
                  </ButtonLink>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming appointments.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Onboarding checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground mb-2">
              {completedOnboarding} of {onboarding.length} complete
            </p>
            {onboarding.map((item) => (
              <label key={item.id} className="flex items-center gap-3 text-sm cursor-pointer">
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={() => toggleOnboarding(item.id)}
                />
                <span
                  className={
                    item.completed ? "line-through text-muted-foreground" : ""
                  }
                >
                  {item.label}
                </span>
              </label>
            ))}
          </CardContent>
        </Card>
      </div>

      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request reschedule</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Your request will be sent to the team. They&apos;ll confirm a new time shortly.
          </p>
          <Button
            className="mt-4"
            onClick={() => {
              setRescheduleOpen(false);
              toast.success("Reschedule request sent");
            }}
          >
            Submit request
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
