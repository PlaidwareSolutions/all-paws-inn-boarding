# ALL PAWS INN

**Where pets come for the staycation.**

A marketing site for a fictional premium pet resort — boarding and daycare.
Built to the brief in [`requirements.md`](./requirements.md), then rebuilt as an
editorial experience: full-bleed photography, oversized display type that breaks
the grid, hairline rules instead of boxes, and three set-piece moments.

## The three moments

1. **Hero** — one full-bleed photograph; `HOLIDAY.` set at ~18vw crossing from the
   paper "page" onto the image; marginalia up the edge; booking reduced to a
   single hairline.
2. **"A day"** — a horizontally-pinned filmstrip. You scroll and the day moves
   sideways, 07:00 → lights-out, the light warming then going blue then dark.
3. **The close** — a full-bleed pack portrait and one line, *"They won't even
   miss you."*, with a single underlined link. No buttons.

Supporting: accommodations as stacked editorial bands (bleeding images, no card
chrome) · services as a stripped type list with a hover image behind · pricing as
a printed rate card with dotted leaders · one magazine pull-quote for social proof
· booking as a fill-in-the-blank note ("I'd like a room for _dogs_ — _2_ of
them — arriving ___ …").

## Stack

- **Vite · React 18 · TypeScript**
- **Tailwind CSS 3** — tokens in [`tailwind.config.js`](./tailwind.config.js)
- **Framer Motion** — the pinned filmstrip, clip-path image wipes, staggered
  headline rises, the booking sheet
- **Type:** DM Serif Display (statement) + DM Sans (labels/body), Google Fonts
- **Photography:** Unsplash, hot-linked with `?auto=format` sizing
- No other runtime dependencies.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + production build → dist/
npm run preview
```

## Structure

```
src/
  App.tsx                 section order
  index.css               type scale (d-mega…d-3), clip-reveal, grain, rules
  context/BookingContext  drawer open-state + shared booking draft
  data/index.ts           all copy, suites, the day, services, gallery, rates
  components/
    Navbar            wordmark + text links; full-screen mobile menu
    Hero              full-bleed photo · HOLIDAY. breaks the grid · marginalia
    QuickBooking      a reservation line printed on the page (no card)
    Marquee           charcoal band, the supporting line
    Experience        statement + numbered hairline list + one bleeding image
    Accommodations    three stacked editorial bands, images off the edge
    DayTimeline       horizontally-pinned filmstrip (vertical stack on mobile)
    Services          type list, number slides, hover image behind
    Gallery           5 frames placed across a 12-col field, not a grid
    Testimonials      one giant pull-quote, faint pet name behind
    Pricing           printed rate card, dotted leaders
    FinalCTA          full-bleed portrait + one line + underline link
    Footer            oversized wordmark, minimal columns
    BookingDrawer     a fill-in-the-blank "note" — 2 steps, validation, confirm
    StickyBookingCTA  mobile hairline bar (not a pill)
    ScrollProgress / primitives (Reveal, Words, ClipImage)
```

## Notes

- Every nav link and CTA works; the booking flow validates and confirms (no payment —
  nothing is charged or sent).
- `prefers-reduced-motion` respected (MotionConfig + CSS; clip-reveals resolve
  open).
- Semantic landmarks, heading order, labelled controls, visible focus, alt text.
- All content is fictional.
