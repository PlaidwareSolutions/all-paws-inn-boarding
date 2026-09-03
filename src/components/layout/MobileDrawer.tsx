"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Phone, X } from "lucide-react";
import { navigation } from "@/data/nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panel.current) return;
      // Trap focus inside the drawer.
      const focusables = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div ref={panel} className="flex h-full flex-col overflow-y-auto bg-bone">
        <div className="flex h-(--header-h) shrink-0 items-center justify-between px-(--spacing-gutter)">
          <Logo />
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-sm text-ink"
          >
            <X size={22} />
          </button>
        </div>

        <nav aria-label="Primary" className="flex-1 px-(--spacing-gutter) pb-8 pt-2">
          {/* Groups are expanded — no nested accordions to fight on a small screen. */}
          {navigation.map((group) => (
            <div key={group.label} className="border-t border-[var(--hairline)] py-6">
              {group.columns || group.links ? (
                <>
                  <p className="eyebrow mb-4">{group.label}</p>
                  {(group.columns ?? [{ title: "", links: group.links ?? [] }]).map((column, ci) => (
                    <div key={column.title || ci} className={ci > 0 ? "mt-5" : undefined}>
                      {column.title ? (
                        <p className="mb-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ember">
                          {column.title}
                        </p>
                      ) : null}
                      <ul className="space-y-0.5">
                        {column.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={onClose}
                              aria-current={link.href === pathname ? "page" : undefined}
                              className={cn(
                                "block py-2.5 font-display text-[1.5rem] leading-tight",
                                link.href === pathname ? "text-ember" : "text-ink",
                              )}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </>
              ) : (
                <Link
                  href={group.href ?? "#"}
                  onClick={onClose}
                  aria-current={group.href === pathname ? "page" : undefined}
                  className={cn(
                    "block py-1 font-display text-[1.5rem] leading-tight",
                    group.href === pathname ? "text-ember" : "text-ink",
                  )}
                >
                  {group.label}
                </Link>
              )}
            </div>
          ))}

          <div className="border-t border-[var(--hairline)] py-6">
            <ul className="space-y-3">
              <li>
                <Link href="/portal" onClick={onClose} className="text-[0.9375rem] text-slate">
                  Guest Portal
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={onClose} className="text-[0.9375rem] text-slate">
                  Visit &amp; Contact
                </Link>
              </li>
              <li>
                <Link href="/policies" onClick={onClose} className="text-[0.9375rem] text-slate">
                  Policies
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="sticky bottom-0 grid shrink-0 grid-cols-2 gap-2 border-t border-[var(--hairline)] bg-bone p-(--spacing-gutter)">
          <a
            href={site.phoneHref}
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-sm border border-[var(--hairline-strong)] text-[0.9375rem] font-medium text-ink"
          >
            <Phone size={16} aria-hidden /> Call
          </a>
          <Link
            href="/plan"
            onClick={onClose}
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-sm bg-moss text-[0.9375rem] font-medium text-bone"
          >
            Plan a Stay
          </Link>
        </div>
      </div>
    </div>
  );
}
