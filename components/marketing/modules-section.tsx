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

type ModuleItem = {
  icon: typeof Globe;
  name: string;
  desc: string;
  gradient: string;
  ring: string;
  gridArea: string;
};

const modules: ModuleItem[] = [
  {
    icon: Globe,
    name: "Website",
    desc: "Marketing pages that convert",
    gradient: "from-blue-500 to-indigo-600",
    ring: "ring-blue-200",
    gridArea: "website",
  },
  {
    icon: Calendar,
    name: "Booking",
    desc: "Calendly-style scheduling",
    gradient: "from-cyan-500 to-teal-500",
    ring: "ring-cyan-200",
    gridArea: "booking",
  },
  {
    icon: Users,
    name: "Client Portal",
    desc: "Self-serve client hub",
    gradient: "from-violet-500 to-purple-600",
    ring: "ring-violet-200",
    gridArea: "portal",
  },
  {
    icon: CreditCard,
    name: "Payments",
    desc: "Invoices & subscriptions",
    gradient: "from-emerald-500 to-green-600",
    ring: "ring-emerald-200",
    gridArea: "payments",
  },
  {
    icon: BarChart3,
    name: "Admin Dashboard",
    desc: "Owner command center",
    gradient: "from-indigo-600 to-violet-700",
    ring: "ring-indigo-200",
    gridArea: "admin",
  },
  {
    icon: MessageSquare,
    name: "Messaging",
    desc: "Unified inbox",
    gradient: "from-rose-500 to-pink-500",
    ring: "ring-rose-200",
    gridArea: "messaging",
  },
  {
    icon: Workflow,
    name: "Automations",
    desc: "Workflows on autopilot",
    gradient: "from-amber-500 to-orange-500",
    ring: "ring-amber-200",
    gridArea: "automations",
  },
  {
    icon: LineChart,
    name: "Analytics",
    desc: "Revenue & funnel insights",
    gradient: "from-fuchsia-500 to-violet-600",
    ring: "ring-fuchsia-200",
    gridArea: "analytics",
  },
];

function ModuleCard({
  module,
  compact = false,
  index = 0,
}: {
  module: ModuleItem;
  compact?: boolean;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      style={compact ? undefined : { gridArea: module.gridArea }}
      className={cn(!compact && "min-w-0")}
    >
      <div
        className={cn(
          "group h-full rounded-2xl border-2 border-white bg-white/95 shadow-lg backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-xl",
          compact ? "flex flex-col items-center p-4 text-center" : "p-4 sm:p-5",
          module.ring
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center rounded-xl bg-gradient-to-br shadow-md",
            compact ? "mb-2 h-10 w-10" : "mb-3 h-11 w-11",
            module.gradient
          )}
        >
          <module.icon className="h-5 w-5 text-white" />
        </div>
        <p className={cn("font-bold text-foreground", compact && "text-xs")}>
          {module.name}
        </p>
        {!compact && (
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            {module.desc}
          </p>
        )}
      </div>
    </motion.div>
  );
}

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

        {/* Mobile & tablet: hub + clean grid */}
        <div className="mt-14 lg:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-8 flex w-fit flex-col items-center"
          >
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 shadow-2xl shadow-indigo-500/40 ring-4 ring-white">
              <span className="text-lg font-extrabold text-white">AtlasOS</span>
              <span className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-indigo-100">
                Core
              </span>
            </div>
            <p className="mt-3 text-center text-sm font-semibold text-indigo-800/70">
              All modules sync through one core
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {modules.map((m, i) => (
              <ModuleCard key={m.name} module={m} compact index={i} />
            ))}
          </div>
        </div>

        {/* Desktop: 3×3 grid — hub center, modules on the ring */}
        <div className="relative mx-auto mt-16 hidden max-w-5xl lg:block">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 900 640"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="moduleLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.15" />
                <stop offset="50%" stopColor="rgb(99 102 241)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="rgb(6 182 212)" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            {[
              [450, 320, 150, 80],
              [450, 320, 450, 80],
              [450, 320, 750, 80],
              [450, 320, 150, 320],
              [450, 320, 750, 320],
              [450, 320, 150, 560],
              [450, 320, 450, 560],
              [450, 320, 750, 560],
            ].map(([x1, y1, x2, y2], i) => (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#moduleLineGrad)"
                strokeWidth="2"
                strokeDasharray="6 5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.7 }}
              />
            ))}
          </svg>

          <div
            className="relative grid gap-5"
            style={{
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gridTemplateRows: "repeat(3, minmax(0, 1fr))",
              gridTemplateAreas: `
                "website booking portal"
                "payments core admin"
                "messaging automations analytics"
              `,
            }}
          >
            {modules.map((m, i) => (
              <ModuleCard key={m.name} module={m} index={i} />
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ gridArea: "core" }}
              className="flex min-h-[140px] items-center justify-center"
            >
              <div className="flex h-32 w-full max-w-[200px] flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 shadow-2xl shadow-indigo-500/50 ring-[6px] ring-white">
                <span className="text-xl font-extrabold text-white">AtlasOS</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-indigo-100">
                  Core
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-muted-foreground sm:gap-6"
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
