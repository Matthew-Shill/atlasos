"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Building2, User, Users, ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { ButtonLink } from "@/components/ui/button-link";
import { useDemoStore } from "@/lib/store/demo-store";
import { cn } from "@/lib/utils";

const roles = [
  {
    role: "owner" as const,
    title: "Business Owner",
    description: "Full operational dashboard — clients, calendar, billing, automations.",
    href: "/demo/owner",
    icon: Building2,
    gradient: "from-indigo-500 via-violet-600 to-indigo-700",
    glow: "shadow-indigo-500/40",
    border: "border-indigo-300",
  },
  {
    role: "client" as const,
    title: "Client",
    description: "Portal experience — appointments, messages, documents, onboarding.",
    href: "/demo/client",
    icon: User,
    gradient: "from-cyan-500 via-sky-500 to-blue-600",
    glow: "shadow-cyan-500/40",
    border: "border-cyan-300",
  },
  {
    role: "team" as const,
    title: "Team Member",
    description: "Staff view — assigned clients, schedule, tasks, messaging.",
    href: "/demo/team",
    icon: Users,
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    glow: "shadow-emerald-500/40",
    border: "border-emerald-300",
  },
];

function DemoRoleSelector() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setRole = useDemoStore((s) => s.setRole);

  useEffect(() => {
    const role = searchParams.get("role");
    if (role === "owner") router.replace("/demo/owner");
    if (role === "client") router.replace("/demo/client");
    if (role === "team") router.replace("/demo/team");
  }, [searchParams, router]);

  return (
    <div className="min-h-screen atlas-hero-glow">
      <header className="border-b-2 border-indigo-200/60 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <BrandMark iconSize={36} wordmarkSize="lg" />
          </Link>
          <ButtonLink href="/" variant="ghost" size="sm" className="font-bold text-indigo-700">
            Back to site
          </ButtonLink>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="inline-flex rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-white shadow-lg">
            Pick your role
          </p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="atlas-gradient-text">Explore the system</span>
            <br />
            <span className="text-foreground">your way</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg font-semibold text-indigo-800/70 leading-relaxed">
            No login. Realistic data. Three perspectives on one connected business platform.
          </p>
        </motion.div>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {roles.map((r, i) => (
            <motion.button
              key={r.role}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                setRole(r.role);
                router.push(r.href);
              }}
              className={cn(
                "group flex h-full flex-col rounded-2xl border-2 bg-white p-6 text-left shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl",
                r.border,
                r.glow
              )}
            >
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform group-hover:scale-110 group-hover:-rotate-3",
                  r.gradient
                )}
              >
                <r.icon className="h-7 w-7" strokeWidth={2.5} />
              </div>
              <h2 className="mt-6 text-xl font-extrabold">{r.title}</h2>
              <p className="mt-2 flex-1 text-sm font-semibold text-muted-foreground leading-relaxed">
                {r.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-indigo-600">
                Enter demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function DemoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center font-bold text-indigo-600">
          Loading demo...
        </div>
      }
    >
      <DemoRoleSelector />
    </Suspense>
  );
}
