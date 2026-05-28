"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { BrandMark } from "@/components/brand-mark";
import { BrandWordmark } from "@/components/brand-wordmark";
import { BrandLogo } from "@/components/brand-logo";
import { SidebarNav } from "@/components/demo/sidebar-nav";
import { Topbar } from "@/components/demo/topbar";
import { Zap } from "lucide-react";

export function AppShell({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "owner" | "team" | "client";
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const roleLabel =
    variant === "owner" ? "Business" : variant === "team" ? "Team" : "Client portal";

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="atlas-sidebar hidden w-64 shrink-0 flex-col shadow-2xl shadow-indigo-900/30 lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-white/15 px-5">
          <Link href="/" className="flex items-center gap-3">
            <BrandMark
              iconSize={40}
              wordmarkSize="md"
              subtitle={roleLabel}
              iconClassName="ring-2 ring-white/30"
              onDark
              priority
            />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarNav variant={variant} />
        </div>
        <div className="border-t border-white/15 p-4">
          <div className="flex items-start gap-2 rounded-xl bg-white/15 p-3 ring-1 ring-white/20 backdrop-blur-sm">
            <Zap className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" fill="currentColor" />
            <p className="text-xs font-semibold leading-relaxed text-indigo-100">
              Live demo — your changes reset on refresh.
            </p>
          </div>
        </div>
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 border-0 atlas-sidebar p-0 text-white">
          <div className="flex h-16 items-center gap-3 border-b border-white/15 px-5">
            <BrandLogo size={32} className="rounded-lg" />
            <BrandWordmark size="md" onDark />
          </div>
          <SidebarNav variant={variant} />
        </SheetContent>
      </Sheet>

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar onMenuClick={() => setMobileOpen(true)} variant={variant} />
        <main className="atlas-main-surface flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-7xl p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
