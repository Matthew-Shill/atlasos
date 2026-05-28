"use client";

import Link from "next/link";
import { X, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoStore } from "@/lib/store/demo-store";
import { cn } from "@/lib/utils";

export function GuidedDemoBanner() {
  const guidedSteps = useDemoStore((s) => s.guidedSteps);
  const dismissed = useDemoStore((s) => s.guidedBannerDismissed);
  const dismiss = useDemoStore((s) => s.dismissGuidedBanner);

  if (dismissed) return null;

  const completed = guidedSteps.filter((s) => s.completed).length;
  const progress = Math.round((completed / guidedSteps.length) * 100);

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border-2 border-violet-300 bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-600 p-[2px] shadow-xl shadow-indigo-500/30">
      <div className="rounded-[14px] bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
              <Sparkles className="h-6 w-6" fill="currentColor" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-extrabold tracking-tight text-indigo-950">
                Guided demo: Sarah Mitchell story
              </h3>
              <p className="mt-1 text-sm font-semibold text-indigo-700/80">
                Walk intake → client → booking → portal → billing → automation.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2.5 flex-1 max-w-[220px] overflow-hidden rounded-full bg-indigo-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-indigo-700">
                  {completed}/{guidedSteps.length} steps
                </span>
              </div>
              <ol className="mt-4 grid gap-2 sm:grid-cols-2">
                {guidedSteps.map((step, index) => (
                  <li key={step.id}>
                    <Link
                      href={step.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl border-2 border-indigo-200/80 bg-white px-3 py-2.5 text-sm font-semibold transition-all hover:border-violet-400 hover:shadow-md",
                        step.completed && "opacity-55"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                          step.completed
                            ? "bg-emerald-500 text-white"
                            : "bg-gradient-to-br from-indigo-500 to-violet-600 text-white"
                        )}
                      >
                        {step.completed ? <Check className="h-4 w-4" /> : index + 1}
                      </span>
                      <span className={cn(step.completed && "line-through")}>
                        {step.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={dismiss} aria-label="Dismiss">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
