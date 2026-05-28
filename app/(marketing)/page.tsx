"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button-link";
import { HeroMockup } from "@/components/marketing/hero-mockup";
import { ProblemSection } from "@/components/marketing/problem-section";
import { ModulesSection } from "@/components/marketing/modules-section";
import { WorkflowsSection } from "@/components/marketing/workflows-section";

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

      <ProblemSection />
      <ModulesSection />
      <WorkflowsSection />

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
