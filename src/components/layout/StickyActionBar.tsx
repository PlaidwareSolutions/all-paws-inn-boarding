"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { useScrolled } from "@/lib/useScrolled";

/**
 * Mobile-only. Appears once the hero is behind you, so it never competes with
 * the hero's own call to action. Hidden on the planner, where it would duplicate
 * the summary sheet.
 */
export function StickyActionBar() {
  const pathname = usePathname();
  const shown = useScrolled(520);

  if (pathname.startsWith("/plan") || pathname.startsWith("/portal")) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-[var(--hairline)] bg-bone/97 p-3 shadow-lift backdrop-blur-sm transition-transform duration-300 lg:hidden",
        shown ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!shown}
    >
      <a
        href={site.phoneHref}
        tabIndex={shown ? 0 : -1}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-[var(--hairline-strong)] text-[0.9375rem] font-medium text-ink"
      >
        <Phone size={16} aria-hidden /> Call the inn
      </a>
      <Link
        href="/plan"
        tabIndex={shown ? 0 : -1}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-moss text-[0.9375rem] font-medium text-bone"
      >
        <CalendarDays size={16} aria-hidden /> Plan a Stay
      </Link>
    </div>
  );
}
