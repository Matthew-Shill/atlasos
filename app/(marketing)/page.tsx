"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  MessageSquare,
  CreditCard,
  Workflow,
  Globe,
  BarChart3,
  Smartphone,
  Layers,
  Clock,
  FileQuestion,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import { HeroMockup } from "@/components/marketing/hero-mockup";

const problems = [
  { icon: Layers, title: "Scattered tools", desc: "Scheduling, CRM, and billing live in different apps." },
  { icon: Clock, title: "Manual scheduling", desc: "Back-and-forth emails to find a time that works." },
  { icon: Inbox, title: "Missed follow-ups", desc: "Leads slip through without a clear pipeline." },
  { icon: FileQuestion, title: "Unorganized notes", desc: "Client context buried in inboxes and docs." },
  { icon: Globe, title: "No portal experience", desc: "Clients can't self-serve or see their status." },
  { icon: Workflow, title: "No automation", desc: "Repeating the same onboarding steps every time." },
];

const modules = [
  { icon: Globe, name: "Website" },
  { icon: Calendar, name: "Booking" },
  { icon: Users, name: "Client Portal" },
  { icon: BarChart3, name: "Admin Dashboard" },
  { icon: MessageSquare, name: "Messaging" },
  { icon: Workflow, name: "Automations" },
  { icon: CreditCard, name: "Payments" },
  { icon: BarChart3, name: "Analytics" },
];

const features = [
  {
    title: "Client management",
    desc: "Profiles, status tracking, notes, documents, and appointment history.",
    preview: ["Sarah M. — Lead", "Status: Active", "Revenue: $2,400"],
  },
  {
    title: "Scheduling",
    desc: "Booking flow, calendar views, reschedule requests, and availability.",
    preview: ["Mon 11:00 — Consultation", "Wed 2:00 — Workshop"],
  },
  {
    title: "Messaging",
    desc: "Client threads, unread indicators, labels, and attachment previews.",
    preview: ["Marcus: Reschedule?", "Harbor Legal: Pricing?"],
  },
  {
    title: "Payments",
    desc: "Plans, invoices, payment history, and subscription status.",
    preview: ["INV-1042 — Paid", "INV-1043 — Open"],
  },
  {
    title: "Automations",
    desc: "Welcome flows, reminders, failed payment handling, and more.",
    preview: ["WHEN intake submitted", "THEN welcome email"],
  },
  {
    title: "Mobile portal",
    desc: "Responsive client dashboard with appointments and documents.",
    preview: ["Next: Tomorrow 11am", "Checklist: 3/5"],
  },
];

export default function MarketingPage() {
  return (
    <main>
      <section className="relative overflow-hidden atlas-hero-glow px-4 pb-24 pt-20">
        <div className="mx-auto max-w-6xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-white shadow-lg"
          >
            Portfolio product demo
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl"
          >
            Run your service business from{" "}
            <span className="atlas-gradient-text">one bold dashboard.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg font-semibold text-indigo-800/70"
          >
            AtlasOS brings scheduling, client management, messaging, payments, and
            automation into one polished client portal experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <ButtonLink href="/demo" size="lg" className="shadow-lg shadow-primary/20">
              Launch interactive demo
            </ButtonLink>
            <a href="#features" className="inline-flex h-10 items-center justify-center rounded-lg border border-border/80 bg-card px-5 text-sm font-medium shadow-sm hover:bg-muted/80">
              View features
            </a>
          </motion.div>
          <HeroMockup />
        </div>
      </section>

      <section id="problem" className="border-t border-border/60 bg-card/50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
            The problem
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold sm:text-4xl">
            Sound familiar?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Service businesses juggle too many disconnected tools.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p) => (
              <Card key={p.title} className="border-border/60 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/10">
                    <p.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="px-4 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-atlas-navy">
            Your website and backend, connected
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            AtlasOS modules work together as one operating system for your business.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {modules.map((m) => (
              <div
                key={m.name}
                className="flex flex-col items-center rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <m.icon className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium">{m.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="border-t bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-atlas-navy">
            Built for real workflows
          </h2>
          <div className="mt-12 space-y-16">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`flex flex-col gap-8 lg:items-center lg:gap-12 ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"}`}
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{f.title}</h3>
                  <p className="mt-2 text-muted-foreground">{f.desc}</p>
                </div>
                <Card className="flex-1 max-w-md">
                  <CardContent className="p-4 space-y-2">
                    {f.preview.map((line) => (
                      <div key={line} className="rounded-lg border bg-background px-3 py-2 text-sm">
                        {line}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-600 p-1 shadow-2xl shadow-indigo-500/30">
          <div className="rounded-[22px] bg-gradient-to-br from-indigo-600/95 via-violet-600/95 to-cyan-600/90 px-8 py-12 text-center text-white">
            <h2 className="text-2xl font-extrabold sm:text-4xl">
              Don&apos;t just view the design. Try the system.
            </h2>
            <p className="mt-4 text-lg font-semibold text-indigo-100">
              Explore the full demo as owner, client, or team member.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/demo?role=owner" size="lg" className="bg-white font-extrabold text-indigo-700 shadow-lg hover:bg-indigo-50">
                View as Business Owner
              </ButtonLink>
              <ButtonLink href="/demo?role=client" size="lg" variant="outline" className="border-2 border-white/50 bg-white/10 font-bold text-white hover:bg-white/20">
                View as Client
              </ButtonLink>
              <ButtonLink href="/demo?role=team" size="lg" variant="outline" className="border-2 border-white/50 bg-white/10 font-bold text-white hover:bg-white/20">
                View as Team Member
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section id="case-study" className="border-t px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-atlas-navy">Built to demonstrate</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            AtlasOS is a <strong>fictional product demo</strong> built to showcase custom web app
            capabilities for modern service businesses. It is not a real company with real customers.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 text-sm">
            {[
              "React product architecture",
              "Responsive UI systems",
              "Portal UX",
              "CRM workflows",
              "Booking logic",
              "Automation design",
              "SaaS-style dashboards",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground border-l-4 border-primary pl-4">
            This portfolio piece shows how a modern service business could combine its website,
            client experience, and internal operations into one polished digital system.
          </p>
          <ButtonLink href="/demo" className="mt-8">
            Open demo dashboard
          </ButtonLink>
        </div>
      </section>

      <footer className="border-t px-4 py-8 text-center text-sm text-muted-foreground">
        AtlasOS — fictional portfolio demo · Next.js, TypeScript, Tailwind, shadcn/ui
      </footer>
    </main>
  );
}
