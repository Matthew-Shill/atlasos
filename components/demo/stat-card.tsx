import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  blue: {
    card: "atlas-stat-blue",
    icon: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/40",
    value: "text-indigo-950",
    label: "text-indigo-700/80",
  },
  violet: {
    card: "atlas-stat-violet",
    icon: "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/40",
    value: "text-violet-950",
    label: "text-violet-700/80",
  },
  cyan: {
    card: "atlas-stat-cyan",
    icon: "bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-500/40",
    value: "text-cyan-950",
    label: "text-cyan-800/80",
  },
  amber: {
    card: "atlas-stat-amber",
    icon: "bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/40",
    value: "text-amber-950",
    label: "text-amber-800/80",
  },
  rose: {
    card: "atlas-stat-rose",
    icon: "bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/40",
    value: "text-rose-950",
    label: "text-rose-700/80",
  },
  emerald: {
    card: "atlas-stat-emerald",
    icon: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/40",
    value: "text-emerald-950",
    label: "text-emerald-800/80",
  },
} as const;

export type StatTone = keyof typeof tones;

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  tone = "blue",
  className,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  tone?: StatTone;
  className?: string;
}) {
  const t = tones[tone];
  return (
    <div className={cn("atlas-stat group", t.card, className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={cn("text-xs font-bold uppercase tracking-wider", t.label)}>
            {label}
          </p>
          <p className={cn("mt-2 text-3xl font-extrabold tracking-tight tabular-nums", t.value)}>
            {value}
          </p>
          {trend && (
            <p className="mt-2 inline-flex items-center rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
              {trend}
            </p>
          )}
        </div>
        <div
          className={cn(
            "rounded-2xl p-3.5 transition-transform group-hover:scale-110 group-hover:rotate-3",
            t.icon
          )}
        >
          <Icon className="h-6 w-6" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}
