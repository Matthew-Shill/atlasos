import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const accents = {
  indigo: "from-indigo-500 via-violet-500 to-indigo-500",
  violet: "from-violet-500 via-purple-500 to-violet-500",
  cyan: "from-cyan-500 via-sky-500 to-cyan-500",
  amber: "from-amber-500 via-orange-500 to-amber-500",
  rose: "from-rose-500 via-pink-500 to-rose-500",
  emerald: "from-emerald-500 via-teal-500 to-emerald-500",
} as const;

export type PanelAccent = keyof typeof accents;

export function PanelCard({
  title,
  description,
  action,
  children,
  className,
  accent = "indigo",
  noPadding,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  accent?: PanelAccent;
  noPadding?: boolean;
}) {
  return (
    <section className={cn("atlas-panel", className)}>
      <div className={cn("h-1 w-full bg-gradient-to-r", accents[accent])} />
      <div className="flex items-start justify-between gap-4 border-b border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-violet-50/50 px-5 py-4">
        <div>
          <h2 className="text-base font-bold tracking-tight text-indigo-950">{title}</h2>
          {description && (
            <p className="mt-0.5 text-sm font-medium text-indigo-700/70">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className={cn(!noPadding && "p-5")}>{children}</div>
    </section>
  );
}
