import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** Shared page close. One primary action, one quiet alternative, and a phone number. */
export function ClosingCta({
  title,
  body,
  primary = { href: "/plan", label: "Plan a stay" },
  secondary,
}: {
  title: string;
  body: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <Section tone="moss" rhythm="tight">
      <Container width="wide">
        <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[36rem]">
            <h2 className="text-(length:--text-display-3) text-bone">{title}</h2>
            <p className="mt-5 max-w-[48ch] leading-[1.65] text-bone/72">{body}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center">
            {secondary ? (
              <Link
                href={secondary.href}
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-sm border border-[var(--hairline-invert)] px-6 text-[0.9375rem] font-medium text-bone transition-colors hover:border-bone"
              >
                {secondary.label}
              </Link>
            ) : null}
            <Link
              href={primary.href}
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-sm bg-bone px-7 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-linen"
            >
              {primary.label}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-10 border-t border-[var(--hairline-invert)] pt-6 text-[0.875rem] text-bone/55">
            Or call the front desk on{" "}
            <a href={site.phoneHref} className="link-underline text-bone/85">
              {site.phone}
            </a>{" "}
            — somebody who works with the animals answers it.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
