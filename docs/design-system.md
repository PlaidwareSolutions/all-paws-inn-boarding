# Design system

Defined once in `src/styles/globals.css`. Concept: **the country inn** — warm paper, deep moss,
oak, brass. Editorial rather than app-like; architectural rather than bubbly.

## Colour

**Current palette (logo-derived, experimental).** Sourced directly from the four dominant hues in
`public/brand/logo-full.png` — deep blue, bright cyan, golden yellow, orange — in place of the
original warm-neutral palette. The prior palette is preserved in full at
`docs/globals.css.pre-logo-palette.bak` for an easy revert if it doesn't hold up: copy its
`@theme` color block back over the one in `src/styles/globals.css`, and revert the five hardcoded
`rgb(11 42 58 …)` hero-scrim values back to `rgb(24 22 19 …)` in `Hero.tsx`, `PageHero.tsx` and
`not-found.tsx`.

| Token | Value | Use |
|---|---|---|
| `bone` | `#f6fafb` | page ground |
| `parchment` | `#eef5f7` | alternating sections |
| `linen` | `#e3edf0` | insets, table banding |
| `ink` | `#0b2a3a` | primary text |
| `slate` | `#3c5a68` | secondary text |
| `muted` | `#526c78` | tertiary, captions |
| `moss` / `moss-deep` | `#123244` / `#0a222e` | dark grounds, primary button |
| `sage` | `#a9c7d2` | eyebrows on dark |
| `ember` | `#93400d` | **the** accent — one moment per page |
| `ember-mark` | `#f09030` | decorative dots and rules only, never text — the logo's actual sampled orange |

Every text token clears **4.5:1 on all three light grounds** — verified by direct WCAG relative-
luminance computation against `bone`/`parchment`/`linen`, the same discipline used for the original
palette (which was itself corrected after an axe pass found 168 contrast failures). `ember-mark`
exists so calendar dots keep the brighter, more saturated orange without being used for text.

## Type

- **Fraunces** — display (variable; `SOFT 24`, `WONK 1`)
- **Instrument Sans** — UI and body
- **JetBrains Mono** — eyebrows, dimensions, rates, dates, times

Fluid `clamp()` scale from `--text-display-1` down to `--text-lead`. Measure capped at 68ch.
`font-variant-numeric: tabular-nums` on tables and anything money- or date-shaped.

## Shape — the main anti-template lever

- Radius `2px` on controls, `0` on image frames.
- **The arch** — `border-radius: 9999px 9999px 3px 3px`, referencing barn doors and inn windows.
  Used on hero-weight images only, four times site-wide. Flattens below 640px where a full arch
  would crop the subject.
- **Hairlines instead of shadows.** 1px warm ink at 12%. Exactly one shadow token exists
  (`--shadow-lift`) and it is reserved for the sticky mobile bar and the planner sheet.

## Motion

180ms micro / 320ms standard / 600ms entrance, easing `cubic-bezier(0.22, 1, 0.36, 1)`.
Scroll reveal is opacity + 12px rise, once, stagger capped at three. Hover is image scale 1.03
inside an `overflow-hidden` frame — never a lift, never a growing shadow. Everything is disabled
under `prefers-reduced-motion`.

## Component rules

- Cards only where the content is genuinely parallel — the four ways to stay, the enrichment
  picker. Ranges and sequences get indexes and rails instead.
- Tables become swipeable cards below `lg`, never horizontally-scrolling tables.
- One primary action per screen. `Pill` is for real status only (availability, vaccine state),
  never decoration.
- Every interactive element has a visible `:focus-visible` ring in `ember`.

## Layout

4px spacing base. Section rhythm `tight` / `default` / `loose`, varied deliberately so pages do
not read as evenly-spaced stacks. 12-column thinking with asymmetric 7/5 and 5/7 splits.
Content max 1280px, wide 1460px.
