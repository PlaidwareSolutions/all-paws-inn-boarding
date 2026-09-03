import type { Metadata } from "next";
import Link from "next/link";
import { policies } from "@/data/faq";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCta } from "@/components/sections/ClosingCta";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Cancellation, deposits, arrival and departure, medication and behaviour policies at All Paws Inn — written plainly.",
};

export default function PoliciesPage() {
  return (
    <>
      <Section tone="parchment" rhythm="none" className="pb-14 pt-[calc(var(--header-h)+3.5rem)] lg:pb-20 lg:pt-[calc(var(--header-h)+6rem)]">
        <Container width="wide">
          <p className="eyebrow">Policies</p>
          <h1 className="mt-5 max-w-[18ch] text-(length:--text-display-2)">
            The rules, in the fewest words we could manage.
          </h1>
          <p className="mt-7 max-w-[54ch] text-(length:--text-lead) leading-[1.55] text-slate">
            Nothing here is buried in a PDF or written to protect us from you. If any of it seems
            unreasonable, say so — several of these changed because a customer argued.
          </p>
        </Container>
      </Section>

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
            {policies.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i, 2) * 70}>
                <h2 className="font-display text-(length:--text-title-1)">{p.title}</h2>
                <ul className="mt-5 space-y-3 border-t border-[var(--hairline)] pt-5">
                  {p.items.map((item) => (
                    <li key={item} className="max-w-[54ch] leading-[1.65] text-slate">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="mt-16 max-w-[60ch] border-l-2 border-ember pl-6">
              <p className="leading-[1.7] text-ink">
                If something goes wrong and the policy says one thing but fairness says another, we
                will do the fair thing. Ring {site.phone} and speak to whoever answers.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-12 text-[0.9375rem] text-muted">
              Health requirements are on the{" "}
              <Link href="/safety" className="link-underline text-slate">Care &amp; Safety</Link>{" "}
              page, and everything a new guest needs is on{" "}
              <Link href="/new-guests" className="link-underline text-slate">Before Your First Stay</Link>.
            </p>
          </Reveal>
        </Container>
      </Section>

      <ClosingCta
        title="Any of this need explaining?"
        body="Ring the front desk. It is quicker than email and you will get a person who knows the answer."
        primary={{ href: "/contact", label: "Contact the inn" }}
      />
    </>
  );
}
