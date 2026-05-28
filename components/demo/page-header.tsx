import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
  className,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mb-8 overflow-hidden rounded-2xl border-2 border-indigo-200/90 bg-gradient-to-br from-white via-indigo-50/50 to-violet-50/40 p-6 shadow-lg shadow-indigo-500/10 sm:p-8",
        className
      )}
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/30 to-violet-400/20 blur-2xl" />
      <div className="absolute -bottom-4 left-1/3 h-24 w-24 rounded-full bg-gradient-to-br from-rose-400/20 to-amber-400/20 blur-2xl" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          {eyebrow && (
            <p className="inline-flex rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-md">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
          {description && (
            <p className="max-w-2xl text-base font-medium leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="relative flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
        )}
      </div>
    </div>
  );
}
