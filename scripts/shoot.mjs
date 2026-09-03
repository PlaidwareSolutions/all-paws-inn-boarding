// Rendered visual QA. Captures pages at real breakpoints and reports console errors.
import fs from "node:fs/promises";
import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3000";
const VIEWPORTS = {
  xl:  { width: 1728, height: 1080 },
  lg:  { width: 1440, height: 900 },
  md:  { width: 1280, height: 860 },
  tab: { width: 834,  height: 1112 },
  sm:  { width: 430,  height: 932 },
  xs:  { width: 375,  height: 812 },
};

const routes = (process.env.ROUTES || "/").split(",");
const sizes = (process.env.SIZES || "lg").split(",");
const full = process.env.FULL !== "0";
const out = process.env.OUT || ".qa";

await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch();
const problems = [];
const problemsPush = (m) => problems.push(m);

for (const size of sizes) {
  const vp = VIEWPORTS[size];
  if (!vp) { console.error(`unknown size ${size}`); continue; }
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, reducedMotion: "reduce" });
  for (const route of routes) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); });
    page.on("pageerror", (e) => errors.push(`PAGEERROR ${e.message.slice(0, 200)}`));
    try {
      const res = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
      if (!res || res.status() >= 400) problems.push(`${route} @${size} → HTTP ${res?.status()}`);
      // settle reveal animations + fonts
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(450);
      // Walk the page in steps so lazy images enter the viewport, then wait for
      // every one of them to actually finish decoding before we shoot.
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 110));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 200));
      });
      await page.waitForFunction(
        // Only images that are actually visible need to have loaded.
        () => Array.from(document.images)
          .filter((i) => i.getBoundingClientRect().width > 0 && i.offsetParent !== null)
          .every((i) => i.complete && i.naturalWidth > 0),
        null,
        { timeout: 30000 },
      ).catch(() => problemsPush(`${route} @${size} → images did not all load`));
      await page.waitForTimeout(400);

      // Horizontal overflow. Measured with the safety-net clipping temporarily
      // disabled, so the clip cannot mask a genuine overflow; body.scrollWidth is
      // used because documentElement.scrollWidth counts ink overflow that is
      // already contained inside a scroll rail.
      const overflow = await page.evaluate(() => {
        const de = document.documentElement;
        const prevHtml = de.style.overflowX;
        const prevBody = document.body.style.overflowX;
        de.style.overflowX = "visible";
        document.body.style.overflowX = "visible";
        void de.offsetWidth;
        const delta = Math.max(0, document.body.scrollWidth - de.clientWidth);
        de.style.overflowX = prevHtml;
        document.body.style.overflowX = prevBody;
        return delta;
      });
      if (overflow > 1) problems.push(`${route} @${size} → horizontal overflow ${overflow}px`);

      const stem = (route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, ""));
      if (process.env.SLICE) {
        // Capture in viewport-height slices so detail stays readable for review.
        const h = await page.evaluate(() => document.body.scrollHeight);
        const vh = vp.height;
        const n = Math.ceil(h / vh);
        for (let i = 0; i < n; i++) {
          await page.evaluate((y) => window.scrollTo(0, y), i * vh);
          await page.waitForTimeout(220);
          await page.screenshot({ path: `${out}/${stem}--${size}-s${String(i).padStart(2, "0")}.png` });
        }
        console.error(`sliced ${stem} @${size} → ${n} frames`);
      } else {
        await page.screenshot({ path: `${out}/${stem}--${size}.png`, fullPage: full });
      }
      if (errors.length) problems.push(`${route} @${size} → console: ${[...new Set(errors)].join(" | ")}`);
      if (overflow > 1) console.error(`  ⚠ ${stem} @${size} overflow ${overflow}px`);
    } catch (e) {
      problems.push(`${route} @${size} → ${e.message.slice(0, 160)}`);
      console.error(`FAIL ${route} @${size}: ${e.message.slice(0, 120)}`);
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close();

if (problems.length) {
  console.error("\n=== PROBLEMS ===");
  for (const p of problems) console.error("• " + p);
} else {
  console.error("\nNo console errors, HTTP errors or overflow detected.");
}
