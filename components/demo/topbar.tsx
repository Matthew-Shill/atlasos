"use client";

import { useRouter } from "next/navigation";
import { Menu, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Breadcrumbs } from "@/components/demo/breadcrumbs";
import { useDemoStore } from "@/lib/store/demo-store";
import type { UserRole } from "@/lib/types";

const roles: { role: UserRole; label: string; href: string }[] = [
  { role: "owner", label: "Business Owner", href: "/demo/owner" },
  { role: "client", label: "Client", href: "/demo/client" },
  { role: "team", label: "Team Member", href: "/demo/team" },
];

export function Topbar({
  onMenuClick,
  variant,
}: {
  onMenuClick?: () => void;
  variant: "owner" | "team" | "client";
}) {
  const router = useRouter();
  const role = useDemoStore((s) => s.role);
  const setRole = useDemoStore((s) => s.setRole);
  const currentLabel = roles.find((r) => r.role === role)?.label ?? "Demo";

  const contextLabel =
    variant === "owner"
      ? "Northline Studio"
      : variant === "team"
        ? "Jordan Lee · Staff"
        : "Client portal";

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b-2 border-indigo-200/80 bg-white/90 px-4 backdrop-blur-xl lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        {onMenuClick && (
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="min-w-0">
          <p className="truncate text-xs font-bold uppercase tracking-wide text-indigo-600 lg:hidden">
            {contextLabel}
          </p>
          <Breadcrumbs />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700 sm:inline">
          {contextLabel}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                size="sm"
                className="gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 font-bold shadow-md hover:from-indigo-500 hover:to-violet-500"
              >
                <span className="hidden sm:inline opacity-90">View as</span>
                {currentLabel}
                <ChevronDown className="h-4 w-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48 font-medium">
            {roles.map((r) => (
              <DropdownMenuItem
                key={r.role}
                onClick={() => {
                  setRole(r.role);
                  router.push(r.href);
                }}
              >
                {r.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <ButtonLink href="/" variant="ghost" size="sm" className="gap-1.5 font-semibold text-indigo-700">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Exit</span>
        </ButtonLink>
      </div>
    </header>
  );
}
