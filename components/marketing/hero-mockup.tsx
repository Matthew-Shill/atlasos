"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="relative mx-auto mt-14 max-w-4xl"
    >
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-cyan-500/30 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-200 bg-white shadow-2xl shadow-indigo-500/25 ring-4 ring-indigo-100/50">
        <div className="flex items-center gap-2 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-rose-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-2 text-xs font-bold text-indigo-600">app.atlasos.demo</span>
        </div>
        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-3 space-y-1 border-r border-indigo-100 bg-gradient-to-b from-indigo-700 to-violet-800 p-3">
            {["Dashboard", "Clients", "Calendar", "Messages"].map((l, i) => (
              <div
                key={l}
                className={`rounded-lg px-2.5 py-2 text-xs font-bold ${
                  i === 0 ? "bg-white text-indigo-700 shadow-md" : "text-indigo-200"
                }`}
              >
                {l}
              </div>
            ))}
          </div>
          <div className="col-span-9 space-y-3 bg-gradient-to-br from-indigo-50/50 to-cyan-50/30 p-4">
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Revenue", value: "$18.4k", color: "from-blue-500 to-indigo-600" },
                { label: "Clients", value: "47", color: "from-violet-500 to-purple-600" },
                { label: "Msgs", value: "8", color: "from-rose-500 to-pink-600" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="overflow-hidden rounded-xl border-2 border-white bg-white shadow-md"
                >
                  <div className={cn("h-1 bg-gradient-to-r", s.color)} />
                  <div className="p-2.5">
                    <p className="text-[9px] font-bold uppercase text-indigo-600">{s.label}</p>
                    <p className="text-sm font-extrabold text-indigo-950">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border-2 border-indigo-100 bg-white p-3 shadow-md">
              <p className="text-xs font-extrabold text-indigo-800">Today&apos;s schedule</p>
              <div className="mt-2 space-y-1.5">
                <div className="flex justify-between rounded-lg bg-cyan-50 px-2 py-1.5 text-[11px] font-semibold">
                  <span>Marcus Webb</span>
                  <span className="text-cyan-700">11:00 AM</span>
                </div>
                <div className="flex justify-between rounded-lg bg-violet-50 px-2 py-1.5 text-[11px] font-semibold">
                  <span>Greenline Co.</span>
                  <span className="text-violet-700">2:00 PM</span>
                </div>
              </div>
            </div>
            <div className="h-12 rounded-xl bg-gradient-to-r from-indigo-400/40 via-violet-400/30 to-cyan-400/40" />
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute -right-2 top-1/4 w-36 rounded-2xl border-2 border-cyan-200 bg-white p-3 shadow-xl shadow-cyan-500/20 sm:-right-6 sm:w-44"
      >
        <p className="text-xs font-extrabold text-cyan-800">Mobile portal</p>
        <div className="mt-2 space-y-1.5">
          <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
          <div className="h-2 rounded-full bg-indigo-100 w-3/4" />
          <div className="mt-2 h-10 rounded-lg bg-gradient-to-br from-cyan-100 to-indigo-100" />
        </div>
      </motion.div>
    </motion.div>
  );
}
