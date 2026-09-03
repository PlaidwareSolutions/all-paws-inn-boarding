import { images } from "@/lib/images";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[max(560px,78svh)] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Img
          asset={images.groundsDawnTreeline}
          alt=""
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgb(11 42 58 / 0.9) 0%, rgb(11 42 58 / 0.6) 45%, rgb(11 42 58 / 0.35) 100%)",
          }}
        />
      </div>
      <Container width="wide" className="relative pb-16 pt-(--header-h) lg:pb-24">
        <p className="eyebrow !text-bone/70">404</p>
        <h1 className="mt-5 max-w-[16ch] text-(length:--text-display-2) text-bone">
          There is nothing at this address.
        </h1>
        <p className="mt-6 max-w-[46ch] text-(length:--text-lead) leading-[1.55] text-bone/80">
          The page has moved or never existed. The front desk can point you at whatever you were
          looking for.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/" variant="onDark" size="lg">Back to the inn</Button>
          <Button href="/plan" variant="onDarkGhost" size="lg">Plan a stay</Button>
        </div>
        <p className="mt-8 text-[0.875rem] text-bone/55">
          Or ring{" "}
          <a href={site.phoneHref} className="link-underline text-bone/85">{site.phone}</a>.
        </p>
      </Container>
    </section>
  );
}
