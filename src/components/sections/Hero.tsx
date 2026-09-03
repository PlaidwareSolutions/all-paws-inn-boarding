import Link from "next/link";
import { images } from "@/lib/images";
import { site, houses } from "@/lib/site";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { StayCheckBar } from "./StayCheckBar";

const facts = [
  `${site.squareFeet.toLocaleString()} sq ft`,
  "Two wings, one suite",
  `${site.address.town}, ${site.address.state}`,
  `Est. ${site.established}`,
  `${site.drive.downtown} from downtown`,
  "Someone here overnight",
];

/** One panel per house. The 50/50 split is the argument: neither species is
    the guest of the other. Panels stack vertically on small screens. */
const panels = [
  {
    house: houses.barn,
    image: images.heroDogYard,
    alt: "A long-haired red dachshund curled into a sleeping ball on a soft blue blanket",
    position: "object-center",
  },
  {
    house: houses.cattery,
    image: images.heroCatWindow,
    alt: "Two cream-coloured cats asleep together on a sunlit windowsill above a garden",
    position: "object-[50%_center]",
  },
];

export function Hero() {
  return (
    <>
      <section className="relative flex min-h-[max(600px,88svh)] flex-col justify-end overflow-hidden">
        {/* Two images, one hairline seam. */}
        <div className="absolute inset-0 grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
          {panels.map((p, i) => (
            <div
              key={p.house.key}
              className={`relative overflow-hidden ${i === 0 ? "border-b sm:border-b-0 sm:border-r" : ""} border-[var(--hairline-invert)]`}
            >
              <Img
                asset={p.image}
                alt={p.alt}
                priority
                fetchPriority={i === 0 ? "high" : "auto"}
                sizes="(max-width: 640px) 100vw, 50vw"
                className={p.position}
              />
              {/* Labels sit on their own top scrim — the shared bottom-up gradient
                  is far too weak up here to carry small type. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 hidden h-56 sm:block"
                style={{
                  background:
                    "linear-gradient(to bottom, rgb(11 42 58 / 0.72) 0%, rgb(11 42 58 / 0.38) 45%, rgb(11 42 58 / 0) 100%)",
                }}
              />
              <Link
                href={p.house.href}
                className="group absolute inset-x-0 top-0 hidden items-start justify-between gap-3 px-(--spacing-gutter) pt-[calc(var(--header-h)+2rem)] sm:flex"
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-bone">
                  {p.house.name}
                  <span className="mt-1.5 block text-[0.625rem] text-bone/75">{p.house.forWhom}</span>
                </span>
                <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-bone/75">
                  {p.house.rooms} rooms
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Scrim spans the whole hero so the lockup reads across both panels. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgb(11 42 58 / 0.9) 0%, rgb(11 42 58 / 0.68) 26%, rgb(11 42 58 / 0.24) 58%, rgb(11 42 58 / 0.30) 100%)",
          }}
        />

        <Container width="wide" className="relative pb-14 pt-(--header-h) lg:pb-20">
          <div className="max-w-[52rem]">
            <p className="eyebrow !text-bone/70">A boutique inn for dogs and cats</p>
            <h1 className="mt-6 text-(length:--text-display-1) text-bone">
              16,000 square feet, and someone awake all night.
            </h1>
            <p className="mt-7 max-w-[48ch] text-(length:--text-lead) leading-[1.55] text-bone/85">
              Two wings of one suite in Clear Lake — one for dogs, one for cats, each behind its
              own locked door and its own air handler. Twenty-five minutes from downtown, and
              we&rsquo;ll come and collect them.
            </p>
          </div>
        </Container>

        {/* Fact strip. Extra bottom padding on large screens is the landing pad for the
            booking bar, which docks over it. */}
        <div className="relative border-t border-[var(--hairline-invert)] bg-ink/25 lg:pb-12">
          <Container width="wide">
            <ul className="flex snap-rail no-scrollbar items-center gap-x-8 gap-y-2 overflow-x-auto py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-bone/80">
              {facts.map((f) => (
                <li key={f} className="shrink-0 whitespace-nowrap">
                  {f}
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* The booking bar docks over the base of the hero. */}
      <Container width="wide" className="relative z-10 lg:-mt-11">
        <StayCheckBar />
      </Container>
    </>
  );
}
