"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "./PlanProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const links = [
    { href: "/#library", label: "Workout" },
    { href: "/my-plan", label: "My Plan" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold uppercase tracking-wide">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-black">
            <Dumbbell size={18} strokeWidth={2.5} />
          </span>
          FitLog
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/my-plan"
                ? pathname === "/my-plan"
                : pathname === "/";
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wide transition ${
                  isActive
                    ? "text-accent"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/my-plan" className="badge-filled">
            Plan {plan.length}
          </Link>
          <Link href="/my-plan" className="badge-outline">
            Saved {saved.length}
          </Link>
        </div>
      </div>

      {/* simple mobile nav row under the main bar */}
      <nav className="flex items-center justify-center gap-6 border-t border-line py-2 md:hidden">
        {links.map((link) => {
          const isActive =
            link.href === "/my-plan" ? pathname === "/my-plan" : pathname === "/";
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`text-xs font-semibold uppercase tracking-wide ${
                isActive ? "text-accent" : "text-white/70"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
