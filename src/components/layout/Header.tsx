"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { navigation } from "@/data/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { useScrolled } from "@/lib/useScrolled";
import { Logo } from "./Logo";
import { MobileDrawer } from "./MobileDrawer";

export function Header() {
  const pathname = usePathname();
  /* Menu state is tied to the route it was opened on, so navigating closes it
     by derivation rather than by an effect that mirrors the pathname. */
  const [openOn, setOpenOn] = useState<{ label: string; path: string } | null>(null);
  const [drawerOn, setDrawerOn] = useState<string | null>(null);
  const open = openOn && openOn.path === pathname ? openOn.label : null;
  const drawer = drawerOn === pathname;
  const setOpen = (label: string | null) =>
    setOpenOn(label ? { label, path: pathname } : null);
  const setDrawer = (v: boolean) => setDrawerOn(v ? pathname : null);
  const scrolled = useScrolled(24);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* The homepage hero is dark enough to carry an inverted header until you scroll. */
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          overHero && !open
            ? "bg-transparent"
            : "border-b border-[var(--hairline)] bg-bone/95 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-(--header-h) max-w-[1460px] items-center justify-between gap-6 px-(--spacing-gutter)">
          <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
            <Logo invert={overHero && !open} />
          </Link>

          <nav ref={navRef} aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((group) => {
                const isOpen = open === group.label;
                const groupLinks = group.columns
                  ? group.columns.flatMap((c) => c.links)
                  : (group.links ?? []);
                const hasPanel = groupLinks.length > 0;
                const groupActive = hasPanel
                  ? groupLinks.some((l) => l.href.split("#")[0] === pathname)
                  : group.href === pathname;
                if (!hasPanel) {
                  return (
                    <li key={group.label}>
                      <Link
                        href={group.href ?? "#"}
                        aria-current={groupActive ? "page" : undefined}
                        className={cn(
                          "relative inline-flex h-11 items-center rounded-sm px-3.5 text-[0.9375rem] transition-colors",
                          overHero && !open ? "text-bone/85 hover:text-bone" : "text-slate hover:text-ink",
                          groupActive && (overHero && !open ? "text-bone" : "text-ink"),
                          groupActive &&
                            "after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-px after:bg-current",
                        )}
                      >
                        {group.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li
                    key={group.label}
                    onMouseEnter={() => hoverOpen(group.label)}
                    onMouseLeave={hoverClose}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`menu-${group.label}`}
                      onClick={() => setOpen(isOpen ? null : group.label)}
                      className={cn(
                        "relative inline-flex h-11 items-center gap-1.5 rounded-sm px-3.5 text-[0.9375rem] transition-colors",
                        overHero && !open ? "text-bone/85 hover:text-bone" : "text-slate hover:text-ink",
                        (isOpen || groupActive) && (overHero && !open ? "text-bone" : "text-ink"),
                        groupActive &&
                          "after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-px after:bg-current",
                      )}
                    >
                      {group.label}
                      <ChevronDown
                        size={14}
                        className={cn("transition-transform duration-200", isOpen && "rotate-180")}
                        aria-hidden
                      />
                    </button>

                    {isOpen ? (
                      <div
                        id={`menu-${group.label}`}
                        className="absolute inset-x-0 top-(--header-h) border-y border-[var(--hairline)] bg-bone"
                      >
                        <div className="mx-auto grid max-w-[1460px] grid-cols-[1fr_1fr_0.9fr] gap-x-12 px-(--spacing-gutter) py-10">
                          {/* Stays uses titled columns so each house gets its own
                              heading; other groups split their links evenly. */}
                          {(group.columns ??
                            [0, 1].map((col) => ({
                              title: "",
                              links: (group.links ?? []).filter((_, i) => i % 2 === col),
                            }))
                          ).map((column, ci) => (
                            <div key={column.title || ci}>
                              {column.title ? (
                                <p className="eyebrow mb-3 border-b border-[var(--hairline)] px-3 pb-3">
                                  {column.title}
                                </p>
                              ) : null}
                              <ul className="space-y-1">
                                {column.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      aria-current={link.href === pathname ? "page" : undefined}
                                      className={cn(
                                        "group block rounded-sm px-3 py-3 transition-colors hover:bg-parchment",
                                        link.href === pathname && "bg-parchment",
                                      )}
                                    >
                                      <span className="font-display text-[1.125rem] text-ink transition-colors group-hover:text-ember">
                                        {link.label}
                                      </span>
                                      {link.note ? (
                                        <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">
                                          {link.note}
                                        </span>
                                      ) : null}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          {group.featured ? (
                            <Link
                              href={group.featured.href}
                              className="group flex flex-col justify-between rounded-sm bg-moss p-6 text-bone transition-colors hover:bg-moss-soft"
                            >
                              <span className="eyebrow !text-sage">Worth knowing</span>
                              <span className="mt-6 font-display text-[1.375rem] leading-tight">
                                {group.featured.label}
                              </span>
                              <span className="mt-2 text-[0.875rem] leading-snug text-bone/70">
                                {group.featured.note}
                              </span>
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/portal"
              className={cn(
                "hidden h-11 items-center rounded-sm px-3.5 text-[0.9375rem] transition-colors xl:inline-flex",
                overHero && !open ? "text-bone/85 hover:text-bone" : "text-slate hover:text-ink",
              )}
            >
              Guest Portal
            </Link>
            <Link
              href="/plan"
              className={cn(
                "hidden h-11 items-center rounded-sm px-5 text-[0.9375rem] font-medium transition-colors sm:inline-flex",
                overHero && !open
                  ? "bg-bone text-ink hover:bg-linen"
                  : "bg-moss text-bone hover:bg-moss-soft",
              )}
            >
              Plan a Stay
            </Link>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              className={cn(
                "-mr-2 inline-flex size-11 items-center justify-center rounded-sm lg:hidden",
                overHero ? "text-bone" : "text-ink",
              )}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}
