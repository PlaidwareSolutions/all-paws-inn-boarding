// Crawls every internal link from the sitemap of pages and reports broken targets.
import { chromium } from "playwright";
const BASE = process.env.BASE || "http://localhost:3000";
const START = ["/","/suites","/cattery","/daycare","/quiet-wing","/spa","/kitchen","/the-inn","/safety",
  "/rates","/new-guests","/policies","/den-cam","/shuttle","/contact","/credits","/portal","/plan"];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const found = new Map(); // href -> Set(pages linking to it)

for (const route of START) {
  await p.goto(BASE + route, { waitUntil: "domcontentloaded" });
  const hrefs = await p.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  for (const h of hrefs) {
    if (!h || h.startsWith("http") || h.startsWith("tel:") || h.startsWith("mailto:") || h.startsWith("#")) continue;
    const clean = h.split("#")[0].split("?")[0] || "/";
    if (!found.has(clean)) found.set(clean, new Set());
    found.get(clean).add(route);
  }
}

const bad = [];
for (const [href, from] of found) {
  const res = await p.goto(BASE + href, { waitUntil: "domcontentloaded" }).catch(() => null);
  const status = res ? res.status() : 0;
  const is404 = await p.locator("h1", { hasText: "There is nothing at this address" }).count().catch(() => 0);
  if (status >= 400 || is404 > 0) bad.push(`${href}  (status ${status}${is404 ? ", 404 page" : ""})  ← linked from ${[...from].join(", ")}`);
}
console.error(`checked ${found.size} unique internal links`);
console.error(bad.length ? "BROKEN:\n" + bad.join("\n") : "all internal links resolve");
await b.close();
