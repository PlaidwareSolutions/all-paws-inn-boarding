import { chromium } from "playwright";
const B = "http://localhost:3000";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, reducedMotion: "reduce" });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 160)));
p.on("console", (m) => { if (m.type() === "error") errs.push("console " + m.text().slice(0, 160)); });

await p.goto(B + "/plan", { waitUntil: "networkidle" });
await p.waitForTimeout(700);

// Step 1 — choose a cat, and the Quiet Wing (previously dog-only)
await p.getByRole("button", { name: /A cat/ }).click();
await p.waitForTimeout(300);
const qw = p.getByLabel(/Quiet Wing/);
console.error("Quiet Wing offered to cats:", (await qw.count()) > 0);
if (await qw.count()) await qw.check();
await p.screenshot({ path: ".qa/cat-1-guest.png", fullPage: true });

await p.getByRole("button", { name: /^Continue/ }).first().click();
await p.waitForTimeout(500);
await p.getByRole("button", { name: /^Continue/ }).first().click();
await p.waitForTimeout(600);
await p.screenshot({ path: ".qa/cat-3-rooms.png", fullPage: true });

const rooms = await p.locator('button:has-text("total ·")').all();
console.error("cat rooms offered:", rooms.length);
if (rooms.length) { await rooms[0].click(); await p.waitForTimeout(700); }
await p.screenshot({ path: ".qa/cat-4-extras.png", fullPage: true });

const extras = await p.locator('button[aria-pressed="false"]').all();
console.error("cat extras offered:", extras.length);
for (const e of extras.slice(0, 3)) { try { await e.click(); await p.waitForTimeout(110); } catch {} }
await p.waitForTimeout(300);
await p.screenshot({ path: ".qa/cat-4b-extras.png", fullPage: true });

await p.getByRole("button", { name: /^Continue/ }).first().click();
await p.waitForTimeout(500);
await p.getByLabel(/Your name/).fill("Wes Alvarez");
await p.getByLabel(/^Email/).fill("wes@example.com");
await p.getByLabel(/^Phone/).fill("281 555 0134");
await p.getByLabel(/Vaccinations are current/).check();
await p.getByRole("button", { name: /Request this stay/ }).click();
await p.waitForTimeout(1600);
await p.screenshot({ path: ".qa/cat-6-confirmed.png", fullPage: true });

console.error(errs.length ? "ERRORS:\n" + errs.join("\n") : "no console/page errors");
await b.close();
