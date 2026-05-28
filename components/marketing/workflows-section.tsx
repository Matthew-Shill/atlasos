"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  MessageSquare,
  CreditCard,
  Workflow,
  Smartphone,
  CheckCircle2,
  Circle,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FeaturePreview = {
  title: string;
  desc: string;
  icon: typeof Users;
  accent: string;
  border: string;
  bg: string;
  preview: ReactNode;
};

function ClientPreview() {
  return (
    <div className="space-y-3 p-1">
      <div className="flex items-center gap-3 rounded-xl border-2 border-violet-100 bg-white p-3 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white">
          SM
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold">Sarah M.</p>
          <span className="inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
            Lead
          </span>
        </div>
        <span className="text-xs font-bold text-emerald-600">$2,400</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-violet-50 px-3 py-2">
          <p className="text-[10px] font-bold uppercase text-violet-600">Status</p>
          <p className="text-sm font-bold text-violet-900">Active</p>
        </div>
        <div className="rounded-lg bg-indigo-50 px-3 py-2">
          <p className="text-[10px] font-bold uppercase text-indigo-600">Appts</p>
          <p className="text-sm font-bold text-indigo-900">3 upcoming</p>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-violet-100">
        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
      </div>
    </div>
  );
}

function SchedulePreview() {
  return (
    <div className="space-y-2 p-1">
      <div className="flex gap-1">
        {["M", "T", "W", "T", "F"].map((d, i) => (
          <div
            key={`${d}-${i}`}
            className={cn(
              "flex h-8 flex-1 items-center justify-center rounded-lg text-xs font-bold",
              i === 0 ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600"
            )}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="rounded-xl border-2 border-cyan-100 bg-gradient-to-r from-cyan-50 to-sky-50 px-3 py-2.5">
        <p className="text-xs font-bold text-cyan-900">Mon 11:00 — Consultation</p>
        <p className="text-[10px] text-cyan-700">Marcus Webb · 45 min</p>
      </div>
      <div className="rounded-xl border-2 border-violet-100 bg-gradient-to-r from-violet-50 to-purple-50 px-3 py-2.5">
        <p className="text-xs font-bold text-violet-900">Wed 2:00 — Workshop</p>
        <p className="text-[10px] text-violet-700">Greenline Co. · 90 min</p>
      </div>
    </div>
  );
}

function MessagingPreview() {
  return (
    <div className="space-y-2.5 p-1">
      <div className="flex items-start gap-2">
        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
        <div className="flex-1 rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm ring-1 ring-rose-100">
          <p className="text-xs font-bold">Marcus</p>
          <p className="text-sm text-muted-foreground">Can we reschedule to Thursday?</p>
        </div>
      </div>
      <div className="flex items-start gap-2 opacity-80">
        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-400" />
        <div className="flex-1 rounded-2xl rounded-tl-sm bg-indigo-50 px-3 py-2 ring-1 ring-indigo-100">
          <p className="text-xs font-bold text-indigo-900">Harbor Legal</p>
          <p className="text-sm text-indigo-700/80">Pricing for the retainer package?</p>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="rounded-2xl rounded-tr-sm bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2 text-sm font-medium text-white shadow-md">
          I&apos;ll send options today.
        </div>
      </div>
    </div>
  );
}

function PaymentsPreview() {
  return (
    <div className="space-y-2 p-1">
      <div className="flex items-center justify-between rounded-xl border-2 border-emerald-100 bg-emerald-50/80 px-3 py-2.5">
        <div>
          <p className="text-xs font-bold">INV-1042</p>
          <p className="text-[10px] text-emerald-700">Consultation package</p>
        </div>
        <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
          Paid
        </span>
      </div>
      <div className="flex items-center justify-between rounded-xl border-2 border-amber-100 bg-amber-50/80 px-3 py-2.5">
        <div>
          <p className="text-xs font-bold">INV-1043</p>
          <p className="text-[10px] text-amber-700">Monthly retainer</p>
        </div>
        <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
          Open
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-muted-foreground ring-1 ring-border">
        <CreditCard className="h-4 w-4 text-emerald-600" />
        $4,200 collected this month
      </div>
    </div>
  );
}

function AutomationsPreview() {
  return (
    <div className="space-y-3 p-1">
      <div className="rounded-xl border-2 border-amber-200 bg-amber-50 px-3 py-2.5">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">When</p>
        <p className="text-sm font-bold text-amber-900">Intake form submitted</p>
      </div>
      <div className="flex justify-center">
        <Zap className="h-5 w-5 text-violet-500" />
      </div>
      <div className="rounded-xl border-2 border-violet-200 bg-violet-50 px-3 py-2.5">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-violet-700">Then</p>
        <p className="text-sm font-bold text-violet-900">Send welcome email + assign owner</p>
      </div>
      <div className="flex gap-2">
        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold ring-1 ring-amber-200">Reminder</span>
        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold ring-1 ring-rose-200">Failed pay</span>
      </div>
    </div>
  );
}

function MobilePreview() {
  return (
    <div className="mx-auto max-w-[200px] rounded-[1.75rem] border-[3px] border-slate-800 bg-slate-900 p-2 shadow-2xl">
      <div className="rounded-[1.25rem] bg-gradient-to-b from-cyan-50 to-white p-3">
        <div className="mx-auto mb-2 h-1 w-12 rounded-full bg-slate-300" />
        <p className="text-xs font-extrabold text-cyan-900">Your portal</p>
        <div className="mt-2 rounded-lg bg-cyan-100 px-2 py-1.5 text-[10px] font-bold text-cyan-800">
          Next: Tomorrow 11am
        </div>
        <ul className="mt-2 space-y-1.5">
          {[
            { done: true, label: "Sign agreement" },
            { done: true, label: "Upload ID" },
            { done: true, label: "Pay deposit" },
            { done: false, label: "Complete intake" },
            { done: false, label: "Book kickoff" },
          ].map((item) => (
            <li key={item.label} className="flex items-center gap-1.5 text-[10px] font-semibold">
              {item.done ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Circle className="h-3.5 w-3.5 text-slate-300" />
              )}
              <span className={item.done ? "text-slate-500 line-through" : "text-slate-700"}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const features: FeaturePreview[] = [
  {
    title: "Client management",
    desc: "Profiles, status tracking, notes, documents, and appointment history.",
    icon: Users,
    accent: "from-violet-500 to-purple-600",
    border: "border-violet-200",
    bg: "from-violet-50/80 via-white to-indigo-50/50",
    preview: <ClientPreview />,
  },
  {
    title: "Scheduling",
    desc: "Booking flow, calendar views, reschedule requests, and availability.",
    icon: Calendar,
    accent: "from-cyan-500 to-sky-500",
    border: "border-cyan-200",
    bg: "from-cyan-50/80 via-white to-sky-50/50",
    preview: <SchedulePreview />,
  },
  {
    title: "Messaging",
    desc: "Client threads, unread indicators, labels, and attachment previews.",
    icon: MessageSquare,
    accent: "from-rose-500 to-pink-500",
    border: "border-rose-200",
    bg: "from-rose-50/60 via-white to-pink-50/40",
    preview: <MessagingPreview />,
  },
  {
    title: "Payments",
    desc: "Plans, invoices, payment history, and subscription status.",
    icon: CreditCard,
    accent: "from-emerald-500 to-teal-500",
    border: "border-emerald-200",
    bg: "from-emerald-50/80 via-white to-teal-50/50",
    preview: <PaymentsPreview />,
  },
  {
    title: "Automations",
    desc: "Welcome flows, reminders, failed payment handling, and more.",
    icon: Workflow,
    accent: "from-amber-500 to-orange-500",
    border: "border-amber-200",
    bg: "from-amber-50/80 via-white to-orange-50/40",
    preview: <AutomationsPreview />,
  },
  {
    title: "Mobile portal",
    desc: "Responsive client dashboard with appointments and documents.",
    icon: Smartphone,
    accent: "from-blue-500 to-indigo-500",
    border: "border-blue-200",
    bg: "from-blue-50/80 via-white to-indigo-50/50",
    preview: <MobilePreview />,
  },
];

export function WorkflowsSection() {
  return (
    <section id="features" className="relative overflow-hidden border-t border-indigo-100/80 px-4 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgb(99_102_241/0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-700 shadow-sm">
            <Zap className="h-3.5 w-3.5" />
            Product depth
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Built for real workflows
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every screen in the demo maps to how service businesses actually work —
            not generic placeholder UI.
          </p>
        </motion.div>

        <div className="mt-16 space-y-20 sm:space-y-24">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className={cn(
                "flex flex-col gap-8 lg:items-center lg:gap-14",
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              )}
            >
              <div className="flex-1 lg:max-w-md">
                <div
                  className={cn(
                    "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
                    f.accent
                  )}
                >
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {f.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>

              <div className="relative flex-1 lg:max-w-lg">
                <div
                  className={cn(
                    "absolute -inset-4 rounded-3xl bg-gradient-to-br opacity-60 blur-2xl",
                    f.accent
                  )}
                />
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-5 shadow-xl sm:p-6",
                    f.border,
                    f.bg
                  )}
                >
                  <div className={cn("mb-4 h-1 w-16 rounded-full bg-gradient-to-r", f.accent)} />
                  <div className="rounded-xl border border-white/80 bg-white/90 p-4 shadow-inner backdrop-blur-sm">
                    {f.preview}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
