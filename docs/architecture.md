# Architecture

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 (CSS-first `@theme`).
All 19 routes prerender static. No backend.

```
src/
  app/            one folder per route
  components/
    ui/           Button, Field, Accordion, Img, Pill, Reveal, Section, Container,
                  ReportCardView, InnIcons, SpeciesToggle
    layout/       Header + mega-menu, MobileDrawer, Footer, StickyActionBar, PageHero, Logo
    sections/     homepage sections + shared page sections
    planner/      Planner, Calendar, SummaryRail
    portal/       SignIn, Dashboard
  data/           typed content modules — the only place copy lives
  lib/            pricing, availability, dates, images (generated), site, cn, useScrolled
  styles/         globals.css — the whole design system
```

## Sitemap

```
/                Home                    /rates          Rates & packages
/plan            Stay Planner            /new-guests     Before your first stay
/suites          Dog suites              /policies       Policies
/cattery         Cat suites              /den-cam        Cameras
/daycare         Day guests              /shuttle        The Airport Run
/quiet-wing      The Quiet Wing          /contact        Visit & contact
/spa             Grooming — #dogs, #cats /portal         Guest portal (simulated)
/kitchen         Dining menu             /credits        Photo credits + demo disclosure
/the-inn         Property, story, team   /safety         Care & safety
```

Navigation is four groups — Stays, The Inn, Rates, New Guests. **Stays uses titled columns**
(`NavGroup.columns`): Dogs | Cats, with The Quiet Wing as the featured block spanning both. Other
groups fall back to splitting their links evenly. Full-screen drawer on mobile, which renders the
same columns.

## Simulated systems

Everything below is frontend-only and deliberately visible as such (each ends in a plain
demonstration notice).

**Two houses** (`lib/site.ts`) — `houses.barn` and `houses.cattery` carry their own rooms, ratio
headline and facts. Cats deliberately do not get a caregiver-to-cat ratio; it is the wrong measure,
and "no dog has ever been inside" is the right one. `houseFor(species)` and `suitesFor(species)`
are the accessors everything else uses.

**One toggle, three sections** — `ui/SpeciesToggle` drives `TwoHouses`, `DayAtTheInn` and
`StayingInTouch`. It matches the segmented control already in `sections/DaycarePricing.tsx` rather
than introducing a second style for the same job. Every toggle group needs a **unique** accessible
name; two controls once both read "Choose a day", which is an a11y defect as well as a test failure.

**Availability** (`lib/availability.ts`) — deterministic FNV-1a hash of `suite:date`, weighted by
peak window and weekday. The same date always yields the same number, so "1 room left over
Thanksgiving" never contradicts itself between the hero, the calendar and the planner. Peak
windows are *computed* (4th Thursday of November, last Monday of May, 2nd Monday of March for Texas
spring break…) rather than hardcoded, so published dates stay correct year to year.

**Pricing** (`lib/pricing.ts`) — room rate × nights, plus $18/night on peak nights, plus $28/night
per additional animal, plus enrichment and menu lines. Drives the planner, the room list and the
rates page from one function.

**Stay Planner** (`components/planner/`) — five steps, live summary rail (desktop) / bottom sheet
(mobile), `localStorage` draft, seeded from the hero date bar via query params. Ends in a
confirmation with a reference number. Includes a sold-out empty state that searches outward for the
nearest available window rather than dead-ending.

**Guest Portal** — any credentials sign in; session in `localStorage`. Upcoming stay, two animals
with vaccine expiry warnings, report card history, past stays, documents.

**Den Cam** — real player UI with camera switching and schedule logic. Frames are labelled
"sample frame" rather than presented as live.

## Photography

100 curated images in `public/images/`, sourced through the pipeline in `scripts/`, cropped
server-side at art-directed aspect ratios. `lib/images.ts` is **generated** — do not hand-edit;
re-run the pipeline. Every entry carries dimensions, a blur placeholder and photographer credit,
which renders `/credits`.

Free Unsplash licence only — `plus.unsplash.com` results (paid Unsplash+) are filtered out at
search time.

**Geography and species are art-direction constraints.** No frost, snow or autumn colour: the
imagery is warm, humid and green, with live oaks, bluebonnets and white timber barns with
standing-seam metal roofs. Seventeen New-England-coded images were retired during the relocation.
Run `node scripts/balance.mjs` after any image change — it prints the dog/cat ratio and structural
parity per surface, and both should stay at or under 1.2:1.
