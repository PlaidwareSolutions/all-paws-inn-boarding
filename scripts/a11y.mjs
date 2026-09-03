import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.env.BASE || "http://localhost:3000";
const ROUTES = (process.env.ROUTES || "/,/suites,/cattery,/daycare,/quiet-wing,/spa,/kitchen,/the-inn,/safety,/rates,/new-guests,/policies,/den-cam,/shuttle,/contact,/credits,/portal,/plan").split(",");

const b = await chromium.launch();
let total = 0;
for (const route of ROUTES) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(BASE + route, { waitUntil: "networkidle" });
  await p.waitForTimeout(500);
  const res = await new AxeBuilder({ page: p })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
    .analyze();
  const v = res.violations.filter((x) => x.impact !== "minor" || true);
  if (v.length) {
    console.error(`\n${route}`);
    for (const x of v) {
      total += x.nodes.length;
      console.error(`  [${x.impact}] ${x.id} — ${x.help} (${x.nodes.length})`);
      console.error(`     e.g. ${x.nodes[0].target.join(" ")}`.slice(0, 170));
    }
  }
  await ctx.close();
}
await b.close();
console.error(total === 0 ? "\nNo axe violations across all routes." : `\nTOTAL violating nodes: ${total}`);
