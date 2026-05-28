"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Clock,
  Inbox,
  FileQuestion,
  Globe,
  Workflow,
  Calendar,
  CreditCard,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const problems = [
  {
    icon: Layers,
    title: "Scattered tools",
    desc: "Scheduling, CRM, and billing live in different apps.",
    accent: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/25",
    border: "border-violet-200",
    bg: "from-violet-50 to-purple-50/80",
  },
  {
    icon: Clock,
    title: "Manual scheduling",
    desc: "Back-and-forth emails to find a time that works.",
    accent: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/25",
    border: "border-amber-200",
    bg: "from-amber-50 to-orange-50/80",
  },
  {
    icon: Inbox,
    title: "Missed follow-ups",
    desc: "Leads slip through without a clear pipeline.",
    accent: "from-rose-500 to-pink-500",
    glow: "shadow-rose-500/25",
    border: "border-rose-200",
    bg: "from-rose-50 to-pink-50/80",
  },
  {
    icon: FileQuestion,
    title: "Unorganized notes",
    desc: "Client context buried in inboxes and docs.",
    accent: "from-cyan-500 to-sky-500",
    glow: "shadow-cyan-500/25",
    border: "border-cyan-200",
    bg: "from-cyan-50 to-sky-50/80",
  },
  {
    icon: Globe,
    title: "No portal experience",
    desc: "Clients can't self-serve or see their status.",
    accent: "from-blue-500 to-indigo-500",
    glow: "shadow-blue-500/25",
    border: "border-blue-200",
    bg: "from-blue-50 to-indigo-50/80",
  },
  {
    icon: Workflow,
    title: "No automation",
    desc: "Repeating the same onboarding steps every time.",
    accent: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/25",
    border: "border-emerald-200",
    bg: "from-emerald-50 to-teal-50/80",
  },
];

const floatingApps = [
  { icon: Calendar, label: "Cal", x: "8%", y: "18%", delay: 0 },
  { icon: MessageSquare, label: "Chat", x: "78%", y: "12%", delay: 0.15 },
  { icon: CreditCard, label: "Pay", x: "88%", y: "38%", delay: 0.3 },
  { icon: Inbox, label: "Mail", x: "12%", y: "62%", delay: 0.45 },
  { icon: FileQuestion, label: "Docs", x: "72%", y: "72%", delay: 0.6 },
];

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden border-t border-indigo-100/80 px-4 py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgb(244_63_94/0.08),transparent_55%),radial-gradient(ellipse_60%_40%_at_0%_100%,rgb(99_102_241/0.12),transparent_50%),radial-gradient(ellipse_50%_40%_at_100%_0%,rgb(6_182_212/0.1),transparent_50%)]" />
      <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-rose-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-rose-700">
            <AlertCircle className="h-3.5 w-3.5" />
            The problem
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Sound familiar?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-muted-foreground">
            Service businesses juggle too many disconnected tools — and the cracks
            show up in missed leads, slow scheduling, and scattered client context.
          </p>
        </motion.div>

        <div className="relative mt-14 lg:mt-16">
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            {floatingApps.map((app) => (
              <motion.div
                key={app.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.7, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: app.delay, duration: 0.4 }}
                className="absolute flex flex-col items-center gap-1"
                style={{ left: app.x, top: app.y }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg">
                  <app.icon className="h-5 w-5 text-slate-400" />
                </div>
                <span className="text-[10px] font-bold text-slate-400">{app.label}</span>
              </motion.div>
            ))}
            <svg
              className="absolute inset-0 h-full w-full text-slate-300/40"
              aria-hidden
            >
              <line x1="15%" y1="25%" x2="50%" y2="45%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="85%" y1="20%" x2="50%" y2="45%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="20%" y1="70%" x2="50%" y2="45%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="75%" y1="78%" x2="50%" y2="45%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 mx-auto mb-10 flex max-w-md flex-col items-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-xl shadow-indigo-500/40 ring-4 ring-white">
              <Layers className="h-8 w-8 text-white" />
            </div>
            <p className="mt-3 text-center text-sm font-bold text-indigo-900">
              Too many tools. One platform fixes the chaos.
            </p>
          </motion.div>

          <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <div
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                    p.border,
                    p.bg,
                    p.glow
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-80",
                      p.accent
                    )}
                  />
                  <div
                    className={cn(
                      "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-md ring-2 ring-white/60",
                      p.accent
                    )}
                  >
                    <p.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
