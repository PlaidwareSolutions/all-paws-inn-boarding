import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StayCheckBar } from "./StayCheckBar";

export function Invitation() {
  return (
    <section className="relative overflow-hidden bg-moss-deep py-[clamp(5rem,3rem+8vw,9rem)] text-bone">
      <div className="absolute inset-0">
        <Img
          asset={images.yardTurfDog}
          alt="A dog playing with a ball in the fenced turf yard in the late afternoon"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-moss-deep/78" />
      </div>

      <Container width="wide" className="relative">
        <Reveal className="max-w-[44rem]">
          <h2 className="text-(length:--text-display-2) text-bone">
            The rooms that are still free, and what they cost.
          </h2>
          <p className="mt-6 max-w-[46ch] text-(length:--text-lead) leading-[1.55] text-bone/78">
            No account and nothing to fill in — pick two dates and you will see real availability
            and a real price.
          </p>
        </Reveal>

        <Reveal delay={110} className="mt-10">
          <StayCheckBar tone="dark" />
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 text-[0.9375rem] text-bone/60">
            Or ring the front desk —{" "}
            <a href={site.phoneHref} className="link-underline text-bone">
              {site.phone}
            </a>
            . Somebody who works with the animals answers it.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
