// Deep component audit: exercises every interactive control on every page and
// reports runtime errors, broken ARIA state, focus loss and layout breakage.
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const ROUTES = [
  "/", "/suites", "/cattery", "/daycare", "/quiet-wing", "/spa", "/kitchen",
  "/the-inn", "/safety", "/rates", "/new-guests", "/policies", "/den-cam",
  "/shuttle", "/contact", "/credits", "/portal", "/plan",
];

const findings = [];
const add = (route, sev, msg) => findings.push({ route, sev, msg });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });

for (const route of ROUTES) {
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 140)));
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text().slice(0, 140)); });

  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const s = innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += s) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);

  // ---- Heading structure -------------------------------------------------
  const headings = await page.evaluate(() =>
    [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => ({ lvl: +h.tagName[1], text: h.textContent.trim().slice(0, 50) })));
  const h1s = headings.filter((h) => h.lvl === 1).length;
  if (h1s !== 1) add(route, "HIGH", `${h1s} <h1> elements (expected exactly 1)`);
  let prev = 0;
  for (const h of headings) {
    if (prev && h.lvl > prev + 1) add(route, "MED", `heading jump h${prev} → h${h.lvl} at "${h.text}"`);
    prev = h.lvl;
  }

  // ---- Duplicate accessible names on grouped controls --------------------
  const groupNames = await page.evaluate(() =>
    [...document.querySelectorAll('[role="group"],[role="tablist"]')].map((e) => e.getAttribute("aria-label")));
  const dupes = groupNames.filter((n, i) => n && groupNames.indexOf(n) !== i);
  if (dupes.length) add(route, "MED", `duplicate group/tablist aria-label: ${[...new Set(dupes)].join(", ")}`);

  // ---- Images: alt text + real loading -----------------------------------
  const imgIssues = await page.evaluate(() => {
    const out = [];
    for (const i of document.images) {
      const visible = i.getBoundingClientRect().width > 0 && i.offsetParent !== null;
      if (!visible) continue;
      if (i.alt === null) out.push("missing alt attr: " + i.currentSrc.slice(-40));
      if (!i.complete || i.naturalWidth === 0) out.push("did not load: " + i.currentSrc.slice(-40));
    }
    return out;
  });
  for (const m of imgIssues) add(route, "HIGH", m);

  // ---- Buttons without an accessible name --------------------------------
  const namelessBtns = await page.evaluate(() =>
    [...document.querySelectorAll("button")].filter((b) => {
      const vis = b.getBoundingClientRect().width > 0;
      const name = (b.getAttribute("aria-label") || b.textContent || "").trim();
      return vis && !name;
    }).length);
  if (namelessBtns) add(route, "HIGH", `${namelessBtns} visible button(s) with no accessible name`);

  // ---- Exercise every aria-pressed / aria-selected control ---------------
  const toggles = await page.locator('[aria-pressed], [role="tab"]').all();
  let toggleFails = 0;
  for (const t of toggles.slice(0, 40)) {
    try {
      if (!(await t.isVisible()) || (await t.isDisabled())) continue;
      const attr = (await t.getAttribute("aria-pressed")) !== null ? "aria-pressed" : "aria-selected";
      await t.click({ timeout: 3000 });
      await page.waitForTimeout(140);
      const after = await t.getAttribute(attr);
      if (after !== "true") toggleFails++;
    } catch { toggleFails++; }
  }
  if (toggleFails) add(route, "MED", `${toggleFails} toggle(s) did not report selected state after click`);

  // ---- Accordions --------------------------------------------------------
  const accs = await page.locator("button[aria-expanded]").all();
  for (const a of accs.slice(0, 12)) {
    try {
      if (!(await a.isVisible())) continue;
      const before = await a.getAttribute("aria-expanded");
      await a.click({ timeout: 3000 });
      await page.waitForTimeout(160);
      const after = await a.getAttribute("aria-expanded");
      if (before === after) add(route, "MED", `aria-expanded did not change on "${(await a.textContent()).trim().slice(0, 34)}"`);
      const controls = await a.getAttribute("aria-controls");
      if (controls) {
        const panel = page.locator(`#${CSS.escape(controls)}`);
        if ((await panel.count()) === 0) add(route, "HIGH", `aria-controls points at missing #${controls}`);
      }
    } catch { /* ignore */ }
  }

  // ---- Keyboard: skip link must be the first Tab stop ---------------------
  // Reload first: the toggle/accordion passes above leave focus inside the page,
  // and Tab continues from wherever focus already is.
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(350);
  await page.keyboard.press("Tab");
  const firstFocus = await page.evaluate(() => {
    const a = document.activeElement;
    return a ? `${a.tagName}:${(a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 30)}` : "none";
  });
  if (!/skip/i.test(firstFocus)) add(route, "LOW", `first Tab stop is "${firstFocus}" (expected skip link)`);

  if (errors.length) add(route, "HIGH", [...new Set(errors)].join(" | "));
  await page.close();
}

await browser.close();

const order = { HIGH: 0, MED: 1, LOW: 2 };
findings.sort((a, b) => order[a.sev] - order[b.sev]);
if (!findings.length) console.log("No issues found across " + ROUTES.length + " routes.");
else {
  console.log(`${findings.length} finding(s):\n`);
  for (const f of findings) console.log(`[${f.sev}] ${f.route}\n        ${f.msg}`);
}
