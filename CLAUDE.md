# All Paws Inn

Premium frontend for a fictional boutique pet boarding inn near Houston, built from the competitive
research in `Pet Motel UX Analysis.md`. **Two houses, one inn**: The Barn (dogs) and The Cattery
(cats) are co-equal throughout.

**Read `docs/` before changing anything** — `product.md`, `architecture.md`, `design-system.md`
and `decisions.md` cover positioning, structure, tokens and the reasoning behind the judgement
calls.

## Rules worth knowing

- `src/lib/images.ts` is **generated** by `scripts/build-images.mjs`. Do not hand-edit it.
- All copy lives in `src/data/`. Components should not carry prose.
- The design system is `src/styles/globals.css`. Add tokens there rather than one-off values.
- Text colours must clear 4.5:1 on `bone`, `parchment` **and** `linen`. Use `ember-mark` for
  decoration, `ember` for text.
- Cards only where content is genuinely parallel. Hairlines, not shadows — there is exactly one
  shadow token and it is spoken for.
- Never write `kennel`, `cage` or `facility` about the inn itself.
- Food shown or named must be safe for the species being fed.
- **Keep the two houses equal.** Any new shared surface must carry both, and `SpeciesToggle` is the
  one control for it. Run `node scripts/balance.mjs` after content or image changes — dog/cat should
  stay at or under 1.2:1 with structural parity intact.
- Every toggle group needs a **unique** accessible name.
- Climate and place are Gulf Coast: heat and water, never heating and snow. No frost, snow or
  autumn colour in photography.
- Cat daycare does not exist here, on purpose. Do not add it.
- Surcharge figures come from constants in `src/lib/availability.ts`. Never hardcode one in copy.
- Forms must set `noValidate` so the styled inline errors actually render.
- Every image in `public/images/` should be referenced; unused files are dead weight.

## Verify

```
npm run build && npm run typecheck && npm run lint
node scripts/a11y.mjs      # expects zero violations
node scripts/crawl.mjs     # expects all links to resolve
node scripts/balance.mjs   # dog/cat ratio and structural parity
node scripts/audit.mjs           # per-route component + ARIA audit
node scripts/audit-keyboard.mjs  # keyboard-only paths
node scripts/audit-edge.mjs      # edge cases, validation, persistence
ROUTES=/ SIZES=xs,sm,tab,lg,xl node scripts/shoot.mjs
```
