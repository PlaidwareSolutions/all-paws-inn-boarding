import Link from "next/link";
import { images } from "@/lib/images";
import { QUIET_WING_SURCHARGE } from "@/lib/availability";
import { money } from "@/lib/pricing";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/* Four parallel choices — the one place on this page where cards are
   genuinely the right model. Hairline-separated panels, no shadows. */
const ways = [
  {
    href: "/suites",
    label: "The Suites",
    for: "Dogs, overnight",
    body: "Four rooms in the Lodge, from a glass-fronted loft to a Family Suite with its own fenced yard.",
    price: "from $58 a night",
    image: images.suitePupFloor,
    alt: "A golden retriever puppy asleep on a warm wooden floor",
  },
  {
    href: "/cattery",
    label: "The Cattery",
    for: "Cats, overnight",
    body: "Its own wing with a glazed solarium and private screened catios. No dog has ever been inside it.",
    price: "from $38 a night",
    image: images.panelCattery,
    alt: "A tabby cat sitting in a sunlit window with its eyes closed",
  },
  {
    href: "/daycare",
    label: "Day Guests",
    for: "Dogs, daytime",
    body: "Half and full days with curated playgroups, or solo time for dogs who prefer it.",
    price: "from $28 a day",
    image: images.panelDaycareAlt,
    alt: "Two dogs running side by side across grass, mid-play",
  },
  {
    href: "/quiet-wing",
    label: "The Quiet Wing",
    for: "Dogs and cats",
    body: "Six rooms, one assigned caregiver each, nothing asked of anybody. For animals who find the rest of it too much.",
    price: `room rate + ${money(QUIET_WING_SURCHARGE)}`,
    image: images.panelQuietCat,
    alt: "An older ginger cat resting quietly in warm, low light",
  },
];

export function WaysToStay() {
  return (
    <Section tone="bone" rhythm="default">
      <Container width="wide">
        <Reveal className="max-w-[44rem]">
          <p className="eyebrow">Four ways to stay</p>
          <h2 className="mt-5 text-(length:--text-display-3)">Find the one that fits them.</h2>
        </Reveal>

        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8">
          {ways.map((w, i) => (
            <Reveal as="li" key={w.href} delay={Math.min(i, 2) * 80}>
              <Link href={w.href} className="group block">
                <div className="frame frame-hover aspect-4/5 w-full">
                  <Img
                    asset={w.image}
                    alt={w.alt}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                  />
                </div>
                <p className="eyebrow mt-6">{w.for}</p>
                <h3 className="mt-3 font-display text-(length:--text-title-1) leading-tight transition-colors group-hover:text-ember">
                  {w.label}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-snug text-slate">{w.body}</p>
                <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                  {w.price}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
