import { chromium } from "playwright";
const B = "http://localhost:3000";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, reducedMotion: "reduce" });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 160)));
p.on("console", (m) => { if (m.type() === "error") errs.push("console " + m.text().slice(0, 160)); });

await p.goto(B + "/plan", { waitUntil: "networkidle" });
await p.waitForTimeout(600);

// Step 1 → dates
await p.getByRole("button", { name: /Continue/ }).first().click();
await p.waitForTimeout(500);
await p.screenshot({ path: ".qa/flow-2-dates.png", fullPage: true });

// Pick a Thanksgiving-week range to exercise peak pricing + minimum stay
const cells = await p.locator('[role="gridcell"]:not([disabled])').all();
console.error("selectable days visible:", cells.length);
// advance to November to hit the peak window
for (let i = 0; i < 2; i++) { await p.getByLabel("Next month").click(); await p.waitForTimeout(250); }
await p.screenshot({ path: ".qa/flow-2b-nov.png", fullPage: true });

const nov = await p.locator('[data-iso^="2026-11-2"]:not([disabled])').all();
if (nov.length >= 2) {
  await nov[0].click(); await p.waitForTimeout(200);
  const later = await p.locator('[data-iso^="2026-11-2"]:not([disabled])').all();
  await later[later.length - 1].click();
  await p.waitForTimeout(300);
}
await p.screenshot({ path: ".qa/flow-2c-range.png", fullPage: true });

// → rooms
await p.getByRole("button", { name: /Continue/ }).first().click();
await p.waitForTimeout(600);
await p.screenshot({ path: ".qa/flow-3-rooms.png", fullPage: true });

// choose the first available room
const rooms = await p.locator('button[aria-pressed]:has-text("per night"), button:has-text("total ·")').all();
console.error("room buttons:", rooms.length);
if (rooms.length) { await rooms[0].click(); await p.waitForTimeout(600); }
await p.screenshot({ path: ".qa/flow-4-extras.png", fullPage: true });

// pick a couple of extras
const extras = await p.locator('button[aria-pressed="false"]').all();
for (const e of extras.slice(0, 3)) { try { await e.click(); await p.waitForTimeout(120); } catch {} }
await p.waitForTimeout(300);
await p.screenshot({ path: ".qa/flow-4b-extras.png", fullPage: true });

// → details
await p.getByRole("button", { name: /^Continue/ }).first().click();
await p.waitForTimeout(500);
await p.screenshot({ path: ".qa/flow-5-details.png", fullPage: true });

// submit empty to check validation
const submit = p.getByRole("button", { name: /Request this stay/ });
await submit.click();
await p.waitForTimeout(400);
await p.screenshot({ path: ".qa/flow-5b-errors.png", fullPage: true });

// fill and submit
await p.getByLabel(/Your name/).fill("Dana Reyes");
await p.getByLabel(/^Email/).fill("dana@example.com");
await p.getByLabel(/^Phone/).fill("917 555 0134");
await p.getByLabel(/Vaccinations are current/).check();
await submit.click();
await p.waitForTimeout(1600);
await p.screenshot({ path: ".qa/flow-6-confirmed.png", fullPage: true });

console.error(errs.length ? "ERRORS:\n" + errs.join("\n") : "no console/page errors");
await b.close();
