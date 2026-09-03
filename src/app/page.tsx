import { Hero } from "@/components/sections/Hero";
import { Promise as PromiseSection } from "@/components/sections/Promise";
import { TwoHouses } from "@/components/sections/TwoHouses";
import { DayAtTheInn } from "@/components/sections/DayAtTheInn";
import { WaysToStay } from "@/components/sections/WaysToStay";
import { StayingInTouch } from "@/components/sections/StayingInTouch";
import { QuietWingBreak } from "@/components/sections/QuietWingBreak";
import { GuestsOfTheInn } from "@/components/sections/GuestsOfTheInn";
import { Testimonials } from "@/components/sections/Testimonials";
import { RatesPlainly } from "@/components/sections/RatesPlainly";
import { BeforeFirstStay } from "@/components/sections/BeforeFirstStay";
import { Invitation } from "@/components/sections/Invitation";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromiseSection />
      <TwoHouses />
      <DayAtTheInn />
      <WaysToStay />
      <StayingInTouch />
      <QuietWingBreak />
      <GuestsOfTheInn />
      <Testimonials />
      <RatesPlainly />
      <BeforeFirstStay />
      <Invitation />
    </>
  );
}
