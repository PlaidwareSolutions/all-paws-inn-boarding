# All Paws Inn — working notes

Internal documentation for the build. Four files:

- `product.md` — positioning, segments, conversions, feature scope (and what was cut)
- `architecture.md` — sitemap, routing, data layer, simulated systems
- `design-system.md` — tokens, type, shape language, motion, component rules
- `decisions.md` — the judgement calls, with reasons

The competitive research this was built from is `../Pet Motel UX Analysis.md`.

## Running it

```
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## QA tooling (`../scripts`)

| Script | What it does |
|---|---|
| `shoot.mjs` | Screenshots routes at real breakpoints; reports console errors, HTTP errors and genuine horizontal overflow. `ROUTES=/,/suites SIZES=xs,sm,tab,lg,xl SLICE=1 node scripts/shoot.mjs` |
| `a11y.mjs` | axe-core pass over every route (WCAG 2.1 AA + best practice) |
| `audit.mjs` | Per-route component audit: heading structure, duplicate accessible names, image alt/loading, nameless buttons, every `aria-pressed`/`role=tab` toggle, accordion `aria-expanded` + `aria-controls`, skip link |
| `audit-keyboard.mjs` | Keyboard only: skip link, mega-menu Enter/Escape, drawer focus trap, timeline roving tabindex, calendar arrow keys |
| `audit-edge.mjs` | Sold-out ranges, peak minimum-stay, peak arithmetic, empty-form validation, localStorage persistence, portal session |
| `crawl.mjs` | Follows every internal link and checks it resolves |
| `flow-planner.mjs` | Drives the Stay Planner end to end (dog path) and screenshots each step |
| `flow-planner-cat.mjs` | The same for the cat path — checks 4 rooms, 5 extras and the Quiet Wing option |
| `balance.mjs` | Dog/cat ratio and structural parity per surface. Target ≤ 1.2:1 |
| `toggles.mjs` | Screenshots the three SpeciesToggle sections in both states |
| `fetch-more.mjs` | Adds Texas landscape and deeper cat queries to the existing candidate pool |
| `fetch-candidates.mjs` → `contact-sheet.mjs` → `build-images.mjs` | The photography pipeline: search, review as contact sheets, download at art-directed crops |
| `add-images.mjs` | Replace or add individual crops without re-running the whole set |
| `review-crops.mjs` | Renders processed images as a sheet for visual checking |

**Note on forms.** All three forms set `noValidate`. Without it the browser's native
validation blocks `onSubmit`, so the styled `aria-live` inline error messages never render and
users get native tooltip bubbles instead. If you add a form, set `noValidate` and validate in JS.

**Note on prices.** `PEAK_SURCHARGE`, `EXTRA_ANIMAL` and `QUIET_WING_SURCHARGE` live in
`src/lib/availability.ts`. Never hardcode a surcharge figure in copy — import the constant. Copy
once said "$14 per night" while the planner charged $18.

**Note on the balance check.** `balance.mjs` excludes type-declaration lines (anything containing
`|`) when counting `species: "dog"` — otherwise a union type like `species: "dog" | "cat"` inflates
the dog column and reports false imbalance.

**Note on the overflow check.** It measures `body.scrollWidth` with the safety-net
clipping temporarily disabled. `documentElement.scrollWidth` over-reports, because it
counts ink overflow already contained inside a scroll rail — which produced five
false positives before the check was corrected.
