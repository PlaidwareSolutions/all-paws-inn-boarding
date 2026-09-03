import type { ImageAsset } from "@/lib/images";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type Common = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  image: ImageAsset;
  alt: string;
  /** Small mono facts under the lead — dimensions, rates, hours. */
  facts?: Array<{ label: string; value: string }>;
  children?: React.ReactNode;
};

/** Split: text on paper beside a tall image. The default for internal pages. */
export function PageHeroSplit({ eyebrow, title, lead, image, alt, facts, children }: Common) {
  return (
    <section className="bg-parchment pt-(--header-h)">
      <Container width="wide">
        <div className="grid gap-10 py-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-20 lg:py-24">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-5 max-w-[16ch] text-(length:--text-display-2)">{title}</h1>
            {lead ? (
              <p className="mt-7 max-w-[52ch] text-(length:--text-lead) leading-[1.55] text-slate">
                {lead}
              </p>
            ) : null}
            {facts ? (
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-[var(--hairline)] pt-7">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="eyebrow">{f.label}</dt>
                    <dd className="mt-2 font-display text-[1.375rem] leading-none tabular">{f.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {children ? <div className="mt-9">{children}</div> : null}
          </div>
          <div className="frame aspect-4/5 w-full lg:aspect-3/4">
            <Img asset={image} alt={alt} priority sizes="(max-width: 1024px) 92vw, 42vw" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Bleed: full-width image with the lockup over it. Reserved for pages that
    need the extra weight — the property, the Quiet Wing. */
export function PageHeroBleed({
  eyebrow,
  title,
  lead,
  image,
  alt,
  facts,
  children,
  tone = "dark",
}: Common & { tone?: "dark" | "darker" }) {
  return (
    <section className="relative flex min-h-[max(440px,62svh)] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Img asset={image} alt={alt} priority sizes="100vw" />
        <div
          className="absolute inset-0"
          style={{
            background:
              tone === "darker"
                ? "linear-gradient(to top, rgb(11 42 58 / 0.88) 0%, rgb(11 42 58 / 0.6) 42%, rgb(11 42 58 / 0.34) 100%)"
                : "linear-gradient(to top, rgb(11 42 58 / 0.86) 0%, rgb(11 42 58 / 0.55) 42%, rgb(11 42 58 / 0.3) 100%)",
          }}
        />
      </div>
      <Container width="wide" className="relative pb-14 pt-(--header-h) lg:pb-20">
        <p className="eyebrow !text-bone/70">{eyebrow}</p>
        <h1 className={cn("mt-5 max-w-[17ch] text-(length:--text-display-2) text-bone")}>{title}</h1>
        {lead ? (
          <p className="mt-7 max-w-[52ch] text-(length:--text-lead) leading-[1.55] text-bone/82">
            {lead}
          </p>
        ) : null}
        {facts ? (
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-[var(--hairline-invert)] pt-7">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="eyebrow !text-sage">{f.label}</dt>
                <dd className="mt-2 font-display text-[1.375rem] leading-none text-bone tabular">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </Container>
    </section>
  );
}
