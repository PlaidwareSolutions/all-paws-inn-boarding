import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";
import { QUIET_WING_SURCHARGE } from "@/lib/availability";
import { money } from "@/lib/pricing";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const changes = [
  "Its own door, and no through-traffic",
  "One caregiver assigned for the whole stay",
  "Nothing asked of anybody — no group play, no visitors",
  "Sound-dampened rooms, away from the yard and the Lodge",
  "Scent work and foraging for dogs; hides and height for cats",
  "Pheromone diffusers, and your own litter for cats",
];

/**
 * A deliberate break in the page's light rhythm. This is the emotional high
 * point and the segment nobody else in the category serves properly.
 */
export function QuietWingBreak() {
  return (
    <section className="relative overflow-hidden bg-moss-deep py-[clamp(5rem,3rem+8vw,10rem)] text-bone">
      <div className="absolute inset-0 opacity-30">
        <Img
          asset={images.quietDarkLight}
          alt=""
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-moss-deep via-moss-deep/85 to-moss-deep/40" />
      </div>

      <Container width="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <Reveal>
            <p className="eyebrow !text-sage">The Quiet Wing</p>
            <h2 className="mt-5 max-w-[19ch] text-(length:--text-display-2) text-bone">
              Some animals should not be asked to join in.
            </h2>
            <p className="mt-7 max-w-[52ch] text-(length:--text-lead) leading-[1.6] text-bone/78">
              Reactive dogs and fearful dogs. Cats who do not travel, and cats who have never
              boarded well anywhere. Anybody recovering from surgery, and the old ones who stopped
              finding company interesting some years ago. Most places take them and hope. We built
              six rooms in a soundproofed corridor at the back of the suite and staff them
              differently.
            </p>
            <p className="mt-5 max-w-[52ch] leading-[1.65] text-bone/62">
              It is not a premium tier and it is not upselling — it is {money(QUIET_WING_SURCHARGE)} a night over
              the room rate, dog or cat, which is what the extra staffing costs.
            </p>

            <Link
              href="/quiet-wing"
              className="mt-10 inline-flex min-h-[3.25rem] items-center gap-2 rounded-sm bg-bone px-7 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-linen"
            >
              How the Quiet Wing works
              <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <ul className="border-t border-[var(--hairline-invert)]">
              {changes.map((c) => (
                <li
                  key={c}
                  className="border-b border-[var(--hairline-invert)] py-4 text-[0.9375rem] leading-snug text-bone/80"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
