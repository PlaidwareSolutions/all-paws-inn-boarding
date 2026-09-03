import Link from "next/link";
import { footerNav } from "@/data/nav";
import { site, NAP } from "@/lib/site";
import { shuttleFares } from "@/data/addons";
import { Container } from "@/components/ui/Container";
import { LogoBadge } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-moss-deep pb-28 pt-20 text-bone lg:pb-16 lg:pt-24">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <LogoBadge className="size-9" />
              <span className="font-display text-[1.5rem] leading-none">All Paws Inn</span>
            </div>
            <address className="mt-6 not-italic leading-relaxed text-bone/70">
              {site.address.street}
              <br />
              {site.address.town}, {site.address.state} {site.address.zip}
            </address>
            <p className="mt-5 flex flex-col gap-1.5">
              <a href={site.phoneHref} className="link-underline w-fit text-bone">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="link-underline w-fit text-bone/70">
                {site.email}
              </a>
            </p>

            <div className="mt-8">
              <p className="eyebrow !text-sage">Lobby hours</p>
              <dl className="mt-3 space-y-1.5 text-[0.875rem] text-bone/70">
                {site.hours.lobby.map((h) => (
                  <div key={h.days} className="flex flex-wrap gap-x-2">
                    <dt className="min-w-[8.5rem]">{h.days}</dt>
                    <dd className="text-bone/85">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 max-w-[42ch] text-[0.8125rem] leading-relaxed text-sage">
                {site.hours.note}
              </p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="eyebrow !text-sage">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="link-underline text-[0.9375rem] text-bone/75 hover:text-bone">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <p className="eyebrow !text-sage">The Airport Run</p>
              <ul className="mt-4 space-y-2.5 text-[0.875rem] text-bone/70">
                {shuttleFares.slice(0, 3).map((f) => (
                  <li key={f.route}>{f.route}</li>
                ))}
              </ul>
              <Link href="/shuttle" className="link-underline mt-3 inline-block text-[0.875rem] text-sage">
                Schedule and fares
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--hairline-invert)] pt-8">
          <div className="flex flex-col gap-6 text-[0.8125rem] text-bone/55 lg:flex-row lg:items-start lg:justify-between">
            <p className="max-w-[52ch]">
              A share of every stay supports {site.rescuePartner}. Six of the animals in these photographs
              came through them.
            </p>
            <p className="max-w-[56ch] lg:text-right">
              <span className="text-bone/75">This is a demonstration website.</span> {site.name} is a
              fictional business and every rate, review and record shown here is invented. Photography by{" "}
              <Link href="/credits" className="link-underline text-bone/75">
                Unsplash contributors
              </Link>
              .
            </p>
          </div>
          <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-bone/65">
            Est. {site.established} · {site.squareFeet.toLocaleString()} sq ft · {NAP}
          </p>
        </div>
      </Container>
    </footer>
  );
}
