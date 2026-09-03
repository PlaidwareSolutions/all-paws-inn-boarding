import type { Metadata } from "next";
import { Suspense } from "react";
import { Planner } from "@/components/planner/Planner";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Plan a Stay",
  description:
    "Pick dates and a room and see the whole price — room, peak nights, extras — before giving us a name. No account, no deposit taken up front.",
};

export default function PlanPage() {
  return (
    <>
      <section className="border-b border-[var(--hairline)] bg-parchment pt-(--header-h)">
        <Container width="wide" className="py-10 lg:py-14">
          <p className="eyebrow">Plan a stay</p>
          <h1 className="mt-4 max-w-[20ch] text-(length:--text-display-3)">
            See the whole price before you tell us your name.
          </h1>
        </Container>
      </section>
      <Suspense
        fallback={
          <Container width="wide" className="py-24">
            <p className="text-muted">Loading the planner…</p>
          </Container>
        }
      >
        <Planner />
      </Suspense>
    </>
  );
}
