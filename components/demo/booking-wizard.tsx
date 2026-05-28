"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useDemoStore, services, teamMembers } from "@/lib/store/demo-store";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";

const TIME_OPTIONS = [
  { label: "9:00 AM", hour: 9, minute: 0 },
  { label: "10:30 AM", hour: 10, minute: 30 },
  { label: "1:00 PM", hour: 13, minute: 0 },
  { label: "2:30 PM", hour: 14, minute: 30 },
  { label: "4:00 PM", hour: 16, minute: 0 },
];

export function BookingWizard({
  open,
  onOpenChange,
  defaultClientId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultClientId?: string;
}) {
  const clients = useDemoStore((s) => s.clients);
  const allAppointments = useDemoStore((s) => s.appointments);
  const book = useDemoStore((s) => s.bookAppointment);
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(services[0].id);
  const [teamId, setTeamId] = useState(teamMembers[1].id);
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [selectedTime, setSelectedTime] = useState(TIME_OPTIONS[1]);
  const [clientId, setClientId] = useState(defaultClientId ?? clients[0]?.id ?? "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [bookedDate, setBookedDate] = useState("");
  const [monthCursor, setMonthCursor] = useState(() => startOfMonth(new Date()));

  const service = services.find((s) => s.id === serviceId)!;
  const member = teamMembers.find((t) => t.id === teamId)!;
  const client = clients.find((c) => c.id === clientId);

  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(monthCursor), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(monthCursor), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [monthCursor]);

  const selectedDateIso = useMemo(() => {
    const d = new Date(selectedDate);
    d.setHours(selectedTime.hour, selectedTime.minute, 0, 0);
    return d.toISOString();
  }, [selectedDate, selectedTime]);

  const dayCountByDate = useMemo(() => {
    const map = new Map<string, number>();
    for (const apt of allAppointments) {
      if (teamId && apt.teamMemberId !== teamId) continue;
      const key = format(parseISO(apt.date), "yyyy-MM-dd");
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
  }, [allAppointments, teamId]);

  useEffect(() => {
    const current = clients.find((c) => c.id === clientId);
    if (current) {
      setName(current.name);
      setEmail(current.email);
    }
  }, [clientId, clients]);

  const reset = () => {
    setStep(0);
    setDone(false);
    setMonthCursor(startOfMonth(new Date()));
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    setSelectedDate(d);
    setSelectedTime(TIME_OPTIONS[1]);
    if (client) {
      setName(client.name);
      setEmail(client.email);
    } else {
      setName("");
      setEmail("");
    }
  };

  const handleClose = (o: boolean) => {
    if (!o) reset();
    onOpenChange(o);
  };

  const confirm = () => {
    const cName = client?.name ?? name;
    const cId = client?.id ?? clientId;
    const apt = book({
      clientId: cId,
      clientName: cName,
      service: service.name,
      date: selectedDateIso,
      teamMemberId: member.id,
      teamMemberName: member.name,
      duration: service.duration,
    });
    setBookedDate(apt.date);
    setDone(true);
    toast.success("Appointment booked!");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[min(96vw,1100px)] max-h-[90vh] overflow-hidden border-2 border-indigo-200/80 p-0 sm:max-w-[1100px]">
        <DialogHeader>
          <DialogTitle className="border-b border-indigo-100 bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 text-white">
            {done ? "Booking confirmed" : `Book appointment · Step ${step + 1} of 4`}
          </DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-atlas-success" />
            </div>
            <p className="font-medium">{service.name}</p>
            <p className="text-sm text-muted-foreground">{formatDate(bookedDate)}</p>
            <p className="text-sm text-muted-foreground">with {member.name}</p>
            <Button className="mt-4" onClick={() => handleClose(false)}>
              Done
            </Button>
          </div>
        ) : (
          <div className="max-h-[calc(90vh-4rem)] overflow-y-auto p-5">
            {step === 0 && (
              <div className="space-y-3">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Select service
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceId(s.id)}
                      className={cn(
                        "rounded-xl border p-4 text-left transition-all",
                        s.id === serviceId
                          ? "border-indigo-500 bg-indigo-50 shadow-sm"
                          : "hover:bg-muted/40"
                      )}
                    >
                      <p className="font-semibold">{s.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {s.duration} min · ${s.price}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-3">
                <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">
                  Choose team member
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {teamMembers.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTeamId(t.id)}
                      className={cn(
                        "rounded-xl border p-4 text-left transition-all",
                        t.id === teamId
                          ? "border-indigo-500 bg-indigo-50 shadow-sm"
                          : "hover:bg-muted/40"
                      )}
                    >
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">
                  Pick date & time
                </div>
                <div className="rounded-xl border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => setMonthCursor((m) => addMonths(m, -1))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <p className="text-base font-bold">{format(monthCursor, "MMMM yyyy")}</p>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => setMonthCursor((m) => addMonths(m, 1))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold text-muted-foreground">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                      <span key={d} className="py-1">
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {monthDays.map((day) => {
                      const inMonth = isSameMonth(day, monthCursor);
                      const selected = isSameDay(day, selectedDate);
                      const dayKey = format(day, "yyyy-MM-dd");
                      const dayCount = dayCountByDate.get(dayKey) ?? 0;
                      return (
                        <button
                          key={day.toISOString()}
                          type="button"
                          onClick={() => setSelectedDate(day)}
                          className={cn(
                            "relative min-h-12 rounded-lg border text-sm transition-colors",
                            !inMonth && "opacity-40",
                            selected
                              ? "border-indigo-400 bg-indigo-100 font-bold text-indigo-900"
                              : "hover:bg-muted/60"
                          )}
                        >
                          {format(day, "d")}
                          {dayCount > 0 && (
                            <span className="absolute bottom-1 right-1 rounded-full bg-indigo-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                              {dayCount}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Available times · {format(selectedDate, "EEEE, MMM d")}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {TIME_OPTIONS.map((t) => (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={cn(
                          "rounded-lg border px-3 py-2 text-sm font-semibold transition-colors",
                          selectedTime.label === t.label
                            ? "border-indigo-500 bg-indigo-600 text-white"
                            : "hover:bg-muted/60"
                        )}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                <div>
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                    Client
                  </Label>
                  <ScrollArea className="mt-2 h-36 rounded-xl border bg-white p-2">
                    <div className="space-y-1.5">
                      {clients.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setClientId(c.id)}
                          className={cn(
                            "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                            c.id === clientId
                              ? "bg-indigo-100 font-semibold text-indigo-900"
                              : "hover:bg-muted"
                          )}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="mt-3 space-y-2">
                    <Input
                      placeholder="Client name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                      placeholder="Client email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <Card className="border-indigo-200 bg-white">
                  <CardContent className="space-y-2 p-4 text-sm">
                    <p className="font-bold text-indigo-900">Booking summary</p>
                    <p>
                      <span className="text-muted-foreground">Service:</span> {service.name}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Team member:</span> {member.name}
                    </p>
                    <p>
                      <span className="text-muted-foreground">When:</span>{" "}
                      {formatDate(selectedDateIso)}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Client:</span>{" "}
                      {name || client?.name || "Select client"}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="mt-5 flex items-center justify-between border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                Back
              </Button>
              {step < 3 ? (
                <Button type="button" onClick={() => setStep((s) => Math.min(3, s + 1))}>
                  Next
                </Button>
              ) : (
                <Button
                  className="min-w-40"
                  onClick={confirm}
                  disabled={!name.trim() || !email.trim()}
                >
                  Confirm booking
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
