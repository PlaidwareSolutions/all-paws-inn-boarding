# Decisions

The judgement calls, and why.

### The hero is a booking surface, not a poster
The research's loudest finding is that "call for a quote" is the category's worst habit. So the
hero carries an inline date bar that seeds the planner. A visitor reaches a real, itemised price
without meeting a form. The headline — *"Forty-one acres, and someone awake all night."* — leads
with the answer to the actual anxiety rather than with luxury adjectives.

### One planner instead of five widgets
The research lists tiered pricing (P0), a suite configurator (P3), modular add-ons (P1) and an
à la carte menu (P2) as separate features. Building four separate widgets would have produced
feature bloat. They are fused into one five-step planner, which is the difference between a
coherent product and a checklist.

### The Quiet Wing is promoted from P2 to a headline feature
The research buries "Confidence Stays" as a P2 differentiator. It is the highest-lifetime-value,
most-underserved segment in the category — owners of reactive, fearful, senior and medically
fragile animals. It gets its own page, the homepage's one dark section, a planner checkbox and a
longer meet & greet. It is also priced at cost and *says so*, which is more persuasive than
presenting it as a luxury tier.

### The report card is rendered, not mocked
Wag Hotels' pattern is a phone mockup showing a report card. Showing the actual artifact — with a
real written note, in the site's own type — is more convincing than a picture of one, and it
reuses the same component in the portal.

### Two houses, not one inn that also takes cats
The first build was measurably a dog motel: 39 images to 12, the homepage room index hardcoded to
`dogSuites`, a timeline with no cat equivalent, and a Quiet Wing that said "dog" twenty-one times
and "cat" twice. Adding cat photographs would have papered over that. Making The Barn and The
Cattery co-equal *structures* — same four-room ladder, same index, same timeline, same report card,
same cameras — is the only version that survives a sceptical cat owner. `scripts/balance.mjs`
measures it so it cannot quietly drift back.

### A cat's day is not a dog's day with the words swapped
The cat timeline has its own seven stops: the Cattery waking slower, the solarium from nine, four
hours where deliberately nothing happens, ten minutes of hunting. Writing "sixteen hours of sleep,
and we plan around it" says more to a cat owner than any amount of luxury copy.

### No cat daycare, and we say why
We are asked for it constantly in this category. For nearly every cat the carrier journey costs
more than the day is worth. `/daycare` states that plainly and points to a sitter instead. Refusing
business for a stated reason buys more trust than offering the service would.

### The shuttle adapts Bark&Zoom rather than copying it
Their airport-valet integration is brilliant *for a business next to an airport*. The first build
adapted it as a Hudson Valley shuttle sold on "New Yorkers have no car" — and that rationale
collapsed on relocation, because everyone in Houston drives. The Houston friction is better and
closer to the original insight: you are flying at six and do not want a ninety-minute round trip in
the wrong direction. Hence **The Airport Run**, timed to your flight, IAH and Hobby.

### The relocation is a climate rewrite, not a find-and-replace
"Radiant floor heating, October through April", heated floor pads, leaf piles, sprinklers in July
and winter road salt all read as *wrong* on the Gulf Coast — worse than generic. They became
climate control at 74°F, misting fans, pecans dropping in November and hot-pavement paw care. The
two things the move actually buys are a **storm and flood protocol** and a **heat protocol**; after
Harvey, the first is the first thing a Houston pet owner thinks about, and nobody in the researched
50 addresses it.

### Staff photography is environmental and non-identifying
Hands grooming, figures walking away, people at a distance. No stock portrait of a real person
carries an invented name and an invented CPR certification. This is why there is no headshot
grid — and the research prefers "staff interacting with pets in the physical space" anyway, so
the ethical constraint and the art direction agree.

### Availability is deterministic, not random
A hash of `suite:date` rather than `Math.random()`. Random availability would contradict itself
between the hero, the calendar and the room list within a single session, which is exactly the
kind of detail that makes a demo feel fake.

### Peak windows are computed, not hardcoded
`nthWeekday(year, 10, 4, 4)` for Thanksgiving, `lastWeekday(year, 4, 1)` for Memorial Day. A
hardcoded list would silently rot. Verified against known dates for 2026 and 2027.

### `overflow-x: clip` is a safety net, never load-bearing
The QA overflow check disables it before measuring, so it cannot mask a real problem. This
mattered: five reported overflows turned out to be `documentElement.scrollWidth` counting ink
overflow already contained inside a scroll rail, while real wheel input could not scroll at all.

### Contrast was fixed at the token level
An axe pass found 168 failures, almost all the `muted` micro-label. Rather than patch call sites,
`muted`, `ember`, `brass` and `warning` were re-derived against measured ratios on all three light
grounds, and a separate `ember-mark` was introduced for decorative use. Result: zero violations
across all 19 routes.

### Three effects keep a documented lint exception
`react-hooks/set-state-in-effect` has no good alternative for initialising from browser storage or
today's date, both of which must happen after mount to keep server and client markup identical.
Scroll state, which *did* have a better answer, was moved to `useSyncExternalStore` instead.

### Deliberate omissions
No animated impact counter (the research warns against gratuitous stats — the rescue partnership
is stated plainly and explicitly refuses to publish a number). No multi-location switcher. No
blog. No pop-ups. No paw-print cursors.
