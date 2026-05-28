"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Calendar,
  Users,
  BarChart3,
  MessageSquare,
  Workflow,
  CreditCard,
  LineChart,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
  {
    icon: Globe,
    name: "Website",
    desc: "Marketing pages that convert",
    gradient: "from-blue-500 to-indigo-600",
    ring: "ring-blue-200",
    pos: "top-[8%] left-[6%]",
  },
  {
    icon: Calendar,
    name: "Booking",
    desc: "Calendly-style scheduling",
    gradient: "from-cyan-500 to-teal-500",
    ring: "ring-cyan-200",
    pos: "top-[4%] right-[8%]",
  },
  {
    icon: Users,
    name: "Client Portal",
    desc: "Self-serve client hub",
    gradient: "from-violet-500 to-purple-600",
    ring: "ring-violet-200",
    pos: "top-[38%] right-[2%]",
  },
  {
    icon: BarChart3,
    name: "Admin Dashboard",
    desc: "Owner command center",
    gradient: "from-indigo-600 to-violet-700",
    ring: "ring-indigo-200",
    pos: "bottom-[10%] right-[10%]",
  },
  {
    icon: MessageSquare,
    name: "Messaging",
    desc: "Unified inbox",
    gradient: "from-rose-500 to-pink-500",
    ring: "ring-rose-200",
    pos: "bottom-[6%] left-[8%]",
  },
  {
    icon: Workflow,
    name: "Automations",
    desc: "Workflows on autopilot",
    gradient: "from-amber-500 to-orange-500",
    ring: "ring-amber-200",
    pos: "bottom-[4%] left-[2%]",
  },
  {
    icon: CreditCard,
    name: "Payments",
    desc: "Invoices & subscriptions",
    gradient: "from-emerald-500 to-green-600",
    ring: "ring-emerald-200",
    pos: "top-[42%] left-[4%]",
  },
  {
    icon: LineChart,
    name: "Analytics",
    desc: "Revenue & funnel insights",
    gradient: "from-fuchsia-500 to-violet-600",
    ring: "ring-fuchsia-200",
    pos: "top-[18%] left-[18%]",
  },
];

export function ModulesSection() {
  return (
    <section id="solution" className="relative overflow-hidden px-4 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-indigo-50/40 to-violet-50/30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/20 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-700">
            <Sparkles className="h-3.5 w-3.5" />
            One connected system
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Your website and backend,{" "}
            <span className="atlas-gradient-text">connected</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            AtlasOS modules share one data layer — so booking, CRM, messaging, and
            billing stay in sync without tab-hopping.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="relative aspect-square max-h-[520px] w-full sm:max-h-[560px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute left-1/2 top-1/2 z-20 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 shadow-2xl shadow-indigo-500/50 ring-[6px] ring-white sm:h-32 sm:w-32"
            >
              <span className="text-lg font-extrabold text-white sm:text-xl">AtlasOS</span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-indigo-100">
                Core
              </span>
            </motion.div>

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 400 400"
              aria-hidden
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="rgb(99 102 241)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="rgb(6 182 212)" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {[
                [200, 200, 80, 60],
                [200, 200, 320, 80],
                [200, 200, 320, 320],
                [200, 200, 80, 320],
                [200, 200, 200, 280],
                [200, 200, 120, 200],
                [200, 200, 280, 200],
                [200, 200, 120, 120],
              ].map(([x1, y1, x2, y2], i) => (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.8 }}
                />
              ))}
            </svg>

            {modules.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                className={cn("absolute w-[42%] max-w-[160px] sm:w-[38%]", m.pos)}
              >
                <div
                  className={cn(
                    "group rounded-2xl border-2 border-white bg-white/95 p-4 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl",
                    m.ring
                  )}
                >
                  <div
                    className={cn(
                      "mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-md",
                      m.gradient
                    )}
                  >
                    <m.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="font-bold text-foreground">{m.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden"
        >
          {modules.map((m) => (
            <div
              key={m.name}
              className={cn(
                "flex flex-col items-center rounded-xl border-2 bg-white p-4 shadow-sm",
                m.ring
              )}
            >
              <div
                className={cn(
                  "mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br",
                  m.gradient
                )}
              >
                <m.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-center text-xs font-bold">{m.name}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Live sync across modules
          </span>
          <span className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-indigo-400" />
            No duplicate data entry
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-500" />
            Role-based views
          </span>
        </motion.div>
      </div>
    </section>
  );
}
