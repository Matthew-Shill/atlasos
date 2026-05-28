import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { ButtonLink } from "@/components/ui/button-link";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-indigo-200/60 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <BrandMark
            iconSize={40}
            wordmarkSize="xl"
            iconClassName="shadow-lg shadow-indigo-500/25"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {[
            { href: "#problem", label: "Problem" },
            { href: "#solution", label: "Solution" },
            { href: "#features", label: "Features" },
            { href: "#case-study", label: "Case study" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 text-sm font-bold text-indigo-700/80 transition-colors hover:bg-indigo-100 hover:text-indigo-900"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/demo" variant="ghost" size="sm" className="font-bold text-indigo-700">
            Launch demo
          </ButtonLink>
          <ButtonLink
            href="/demo?role=owner"
            size="sm"
            className="atlas-btn-glow bg-gradient-to-r from-indigo-600 to-violet-600 font-bold hover:from-indigo-500 hover:to-violet-500"
          >
            Open dashboard
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
