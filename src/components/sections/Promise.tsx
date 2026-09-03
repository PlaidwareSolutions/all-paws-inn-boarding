import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const proof = [
  { label: "The Lodge", value: "22 rooms, 1:4 in the yard" },
  { label: "The Cattery", value: "15 rooms, its own wing and air" },
  { label: "Overnight", value: "Staffed, every night" },
  { label: "Storms", value: "Generator, 72-hour reserve, written plan" },
];

export function Promise() {
  return (
    <Section tone="bone" rhythm="default">
      <Container width="wide">
        <Reveal>
          {/* Typographic, not a card grid. Restraint is the argument here. */}
          <p className="max-w-[26ch] font-display text-(length:--text-display-2) leading-[1.1] text-ink lg:max-w-[34ch]">
            Boarding is mostly a question of who is in the building at three in the morning.
          </p>
          <p className="mt-8 max-w-[62ch] text-(length:--text-lead) leading-[1.6] text-slate">
            Everything else — the square footage, the solarium, the salmon — matters less than that.
            We built the rest of it anyway, but that is the part we would ask about.{" "}
            <Link href="/safety" className="link-underline text-ink">
              Here is how we staff the place
            </Link>
            .
          </p>
        </Reveal>

        <Reveal delay={120}>
          <dl className="mt-16 grid gap-x-10 gap-y-8 border-t border-[var(--hairline)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {proof.map((p) => (
              <div key={p.label}>
                <dt className="eyebrow">{p.label}</dt>
                <dd className="mt-2.5 text-[0.9375rem] leading-snug text-slate">{p.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
