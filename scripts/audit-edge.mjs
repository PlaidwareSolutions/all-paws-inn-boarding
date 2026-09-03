// Edge-case audit: sold-out ranges, minimum-stay rules, validation on every
// form, localStorage persistence, and the portal session.
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const findings = [];
const add = (area, sev, msg) => findings.push({ area, sev, msg });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 }, reducedMotion: "reduce" });

// ---- 1. Planner: peak minimum-stay warning -------------------------------
{
  const p = await ctx.newPage();
  // Thanksgiving 2026 is 26 Nov; the window has a 5-night minimum. Book 2 nights.
  await p.goto(`${BASE}/plan?from=2026-11-25&to=2026-11-27&species=dog`, { waitUntil: "networkidle" });
  await p.waitForTimeout(900);
  const body = await p.evaluate(() => document.body.innerText);
  if (!/minimum/i.test(body)) add("planner", "MED", "2-night booking inside Thanksgiving showed no minimum-stay warning");
  else if (!/Thanksgiving/i.test(body)) add("planner", "LOW", "minimum-stay warning does not name the window");
  await p.close();
}

// ---- 2. Planner: peak surcharge actually applied -------------------------
{
  const p = await ctx.newPage();
  await p.goto(`${BASE}/plan?from=2026-11-24&to=2026-11-30&species=dog`, { waitUntil: "networkidle" });
  await p.waitForTimeout(900);
  const rooms = await p.locator('button:has-text("total ·")').all();
  if (!rooms.length) add("planner", "HIGH", "no room options rendered for a peak range");
  else {
    await rooms[0].click();
    await p.waitForTimeout(700);
    const txt = await p.evaluate(() => document.body.innerText);
    if (!/Peak season/i.test(txt)) add("planner", "HIGH", "peak nights did not appear as a line in the quote");
    const amount = await p.evaluate(() => {
      const row = [...document.querySelectorAll("aside dl > div")].find((d) => /Peak season/.test(d.innerText));
      return row ? row.querySelector("dd")?.textContent?.trim() : null;
    });
    // 6 nights, all inside the window → 6 × $14 = $84
    if (amount !== "$84") add("planner", "MED", `peak line amount is ${amount}, expected $84`);
  }
  await p.close();
}

// ---- 3. Planner: sold-out range offers an alternative --------------------
{
  const p = await ctx.newPage();
  // Search for a range where every cat room is gone.
  let found = null;
  for (let d = 1; d < 200 && !found; d += 1) {
    const from = new Date(Date.now() + d * 864e5).toISOString().slice(0, 10);
    const to = new Date(Date.now() + (d + 2) * 864e5).toISOString().slice(0, 10);
    await p.goto(`${BASE}/plan?from=${from}&to=${to}&species=cat`, { waitUntil: "domcontentloaded" });
    await p.waitForTimeout(420);
    const t = await p.evaluate(() => document.body.innerText);
    if (/Everything is taken/i.test(t)) found = { from, to, t };
  }
  if (!found) add("planner", "LOW", "could not find a fully sold-out cat range in 200 days (model may be too generous)");
  else {
    if (!/Try /i.test(found.t)) add("planner", "MED", "sold-out state offered no alternative dates");
    if (!/waiting list/i.test(found.t)) add("planner", "LOW", "sold-out state does not mention the waiting list");
  }
  await p.close();
}

// ---- 4. Every form rejects empty input -----------------------------------
const forms = [
  { url: "/contact", submit: /^Send$/, expect: /Please add your name|need somewhere to reply/i },
  { url: "/new-guests", submit: /Request a meet/, expect: /something to call them|Please add your name/i },
];
for (const f of forms) {
  const p = await ctx.newPage();
  await p.goto(BASE + f.url, { waitUntil: "networkidle" });
  await p.waitForTimeout(500);
  try {
    const btn = p.getByRole("button", { name: f.submit });
    if (await btn.count()) {
      await btn.first().click();
      await p.waitForTimeout(450);
      const t = await p.evaluate(() => document.body.innerText);
      if (!f.expect.test(t)) add("forms", "MED", `${f.url}: empty submit produced no visible validation message`);
    } else {
      // Multi-step: step 1 validates on Continue instead.
      await p.getByRole("button", { name: /Continue/ }).first().click();
      await p.waitForTimeout(450);
      const t = await p.evaluate(() => document.body.innerText);
      if (!f.expect.test(t)) add("forms", "MED", `${f.url}: empty Continue produced no visible validation message`);
    }
  } catch (e) { add("forms", "MED", `${f.url}: ${e.message.slice(0, 90)}`); }
  await p.close();
}

// ---- 5. Planner draft persists across reload -----------------------------
{
  const p = await ctx.newPage();
  await p.goto(`${BASE}/plan?from=2027-02-10&to=2027-02-14&species=cat`, { waitUntil: "networkidle" });
  await p.waitForTimeout(900);
  const rooms = await p.locator('button:has-text("total ·")').all();
  if (rooms.length) { await rooms[0].click(); await p.waitForTimeout(600); }
  const before = await p.evaluate(() => localStorage.getItem("api:planner"));
  if (!before) add("persistence", "MED", "planner draft was not written to localStorage");
  await p.goto(`${BASE}/plan`, { waitUntil: "networkidle" });
  await p.waitForTimeout(900);
  const t = await p.evaluate(() => document.body.innerText);
  if (!/Cattery|Perch|Solarium|Garden Room|Conservatory/i.test(t)) {
    add("persistence", "MED", "reopening /plan did not restore the saved cat draft");
  }
  await p.close();
}

// ---- 6. Packing checklist persists ---------------------------------------
{
  const p = await ctx.newPage();
  await p.goto(BASE + "/new-guests", { waitUntil: "networkidle" });
  await p.waitForTimeout(600);
  const ITEM = "Medication in the original packaging";
  const label = p.locator("label", { hasText: ITEM }).first();
  if (!(await label.count())) add("persistence", "MED", "packing checklist item not found");
  else {
    await label.scrollIntoViewIfNeeded();
    await label.click();
    await p.waitForTimeout(400);
    const stored = await p.evaluate(() => localStorage.getItem("api:packing"));
    if (!stored || stored === "[]") add("persistence", "MED", "checklist tick not persisted");
    await p.reload({ waitUntil: "networkidle" });
    await p.waitForTimeout(800);
    const again = await p.evaluate((t) => {
      const l = [...document.querySelectorAll("label")].find((x) => x.textContent.includes(t));
      return l ? l.querySelector("input").checked : false;
    }, ITEM);
    if (!again) add("persistence", "MED", "checklist tick did not survive reload");
  }
  await p.close();
}

// ---- 7. Portal session ----------------------------------------------------
{
  const p = await ctx.newPage();
  await p.goto(BASE + "/portal", { waitUntil: "networkidle" });
  await p.waitForTimeout(500);
  await p.getByRole("button", { name: /Sign in/ }).click();
  await p.waitForTimeout(1200);
  let t = await p.evaluate(() => document.body.innerText);
  if (!/Good (morning|afternoon|evening)/i.test(t)) add("portal", "HIGH", "sign-in did not reach the dashboard");
  // Pet switch must swap the daily notes
  const pim = p.getByRole("tab", { name: /Pim/ });
  if (await pim.count()) {
    await pim.click();
    await p.waitForTimeout(600);
    t = await p.evaluate(() => document.body.innerText);
    if (!/Daily notes — Pim/i.test(t)) add("portal", "MED", "selecting Pim did not retitle the notes");
    if (!/Cattery/i.test(t)) add("portal", "MED", "Pim's card does not reference the Cattery");
  } else add("portal", "MED", "no Pim tab in the portal");
  await p.reload({ waitUntil: "networkidle" });
  await p.waitForTimeout(800);
  t = await p.evaluate(() => document.body.innerText);
  if (!/Good (morning|afternoon|evening)/i.test(t)) add("portal", "MED", "session did not survive reload");
  await p.getByRole("button", { name: /Sign out/ }).click();
  await p.waitForTimeout(600);
  t = await p.evaluate(() => document.body.innerText);
  if (!/Welcome back/i.test(t)) add("portal", "MED", "sign-out did not return to the sign-in screen");
  await p.close();
}

await browser.close();
const order = { HIGH: 0, MED: 1, LOW: 2 };
findings.sort((a, b) => order[a.sev] - order[b.sev]);
if (!findings.length) console.log("Edge-case audit: no issues.");
else {
  console.log(`Edge-case audit — ${findings.length} finding(s):\n`);
  for (const f of findings) console.log(`[${f.sev}] ${f.area}\n        ${f.msg}`);
}
