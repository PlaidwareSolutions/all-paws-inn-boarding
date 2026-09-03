// Keyboard-only audit: skip link, mega-menu, drawer focus trap, roving tabindex
// on the timeline, and arrow-key navigation in the availability calendar.
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const findings = [];
const add = (area, sev, msg) => findings.push({ area, sev, msg });
const active = (p) => p.evaluate(() => {
  const a = document.activeElement;
  if (!a) return "none";
  return `${a.tagName}[${a.getAttribute("aria-label") || (a.textContent || "").trim().slice(0, 28)}]`;
});

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });

// ---- 1. Skip link (fresh load, first Tab) --------------------------------
{
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(300);
  await p.keyboard.press("Tab");
  const first = await active(p);
  if (!/skip/i.test(first)) add("skip link", "HIGH", `first Tab stop is ${first}`);
  const visible = await p.evaluate(() => {
    const a = document.activeElement;
    const r = a.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.top >= 0;
  });
  if (!visible) add("skip link", "HIGH", "skip link not visible when focused");
  await p.keyboard.press("Enter");
  await p.waitForTimeout(300);
  const hash = await p.evaluate(() => location.hash);
  if (hash !== "#main") add("skip link", "MED", `Enter on skip link gave hash "${hash}"`);
  await p.close();
}

// ---- 2. Mega-menu keyboard -----------------------------------------------
{
  const p = await ctx.newPage();
  await p.goto(BASE + "/suites", { waitUntil: "networkidle" });
  await p.waitForTimeout(300);
  const stays = p.getByRole("button", { name: "Stays" });
  await stays.focus();
  await p.keyboard.press("Enter");
  await p.waitForTimeout(300);
  if ((await stays.getAttribute("aria-expanded")) !== "true") add("mega-menu", "HIGH", "Enter did not open the Stays panel");
  const panelVisible = await p.locator("#menu-Stays").isVisible().catch(() => false);
  if (!panelVisible) add("mega-menu", "HIGH", "panel not visible after Enter");
  // Tab should walk into the panel links
  await p.keyboard.press("Tab");
  const inPanel = await p.evaluate(() => {
    const a = document.activeElement;
    return !!a.closest("#menu-Stays");
  });
  if (!inPanel) add("mega-menu", "MED", `Tab after opening did not land inside the panel (${await active(p)})`);
  await p.keyboard.press("Escape");
  await p.waitForTimeout(250);
  if ((await stays.getAttribute("aria-expanded")) === "true") add("mega-menu", "HIGH", "Escape did not close the panel");
  await p.close();
}

// ---- 3. Mobile drawer focus trap -----------------------------------------
{
  const mob = await browser.newContext({ viewport: { width: 430, height: 932 }, reducedMotion: "reduce" });
  const p = await mob.newPage();
  await p.goto(BASE + "/suites", { waitUntil: "networkidle" });
  await p.waitForTimeout(300);
  await p.getByLabel("Open menu").click();
  await p.waitForTimeout(350);
  const focused = await active(p);
  if (!/close/i.test(focused)) add("drawer", "MED", `focus after open is ${focused} (expected close button)`);
  // Tab 40 times; focus must never escape the dialog
  let escaped = false;
  for (let i = 0; i < 40; i++) {
    await p.keyboard.press("Tab");
    const inside = await p.evaluate(() => !!document.activeElement.closest('[role="dialog"]'));
    if (!inside) { escaped = true; break; }
  }
  if (escaped) add("drawer", "HIGH", "focus escaped the drawer while tabbing (focus trap broken)");
  await p.keyboard.press("Escape");
  await p.waitForTimeout(300);
  const stillOpen = await p.locator('[role="dialog"]').count();
  if (stillOpen) add("drawer", "HIGH", "Escape did not close the drawer");
  await p.close();
  await mob.close();
}

// ---- 4. Timeline roving tabindex + arrow keys ----------------------------
{
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(400);
  const tablist = p.locator('[role="tablist"]').first();
  await tablist.scrollIntoViewIfNeeded();
  const tabs = await tablist.locator('[role="tab"]').all();
  const tabindexes = await Promise.all(tabs.map((t) => t.getAttribute("tabindex")));
  const zeros = tabindexes.filter((t) => t === "0").length;
  if (zeros !== 1) add("timeline", "MED", `roving tabindex broken: ${zeros} tabs have tabindex=0 (expected 1)`);
  await tabs[0].focus();
  await p.keyboard.press("ArrowRight");
  await p.waitForTimeout(200);
  const sel = await tabs[1].getAttribute("aria-selected");
  if (sel !== "true") add("timeline", "HIGH", "ArrowRight did not move selection");
  const moved = await p.evaluate(() => document.activeElement.getAttribute("aria-selected"));
  if (moved !== "true") add("timeline", "MED", "ArrowRight moved selection but not focus");
  await p.keyboard.press("End");
  await p.waitForTimeout(200);
  const lastSel = await tabs[tabs.length - 1].getAttribute("aria-selected");
  if (lastSel !== "true") add("timeline", "MED", "End key did not jump to last stop");
  await p.close();
}

// ---- 5. Calendar arrow keys ----------------------------------------------
{
  const p = await ctx.newPage();
  await p.goto(BASE + "/plan", { waitUntil: "networkidle" });
  await p.waitForTimeout(600);
  await p.getByRole("button", { name: /^Continue/ }).first().click();
  await p.waitForTimeout(500);
  const cells = p.locator('[role="gridcell"]:not([disabled])');
  const n = await cells.count();
  if (!n) add("calendar", "HIGH", "no selectable day cells rendered");
  else {
    const zeros = await p.evaluate(() =>
      [...document.querySelectorAll('[role="gridcell"]')].filter((c) => c.getAttribute("tabindex") === "0").length);
    if (zeros !== 1) add("calendar", "MED", `${zeros} cells have tabindex=0 (expected 1)`);
    const focusable = p.locator('[role="gridcell"][tabindex="0"]');
    await focusable.focus();
    const before = await p.evaluate(() => document.activeElement.getAttribute("data-iso"));
    await p.keyboard.press("ArrowRight");
    await p.waitForTimeout(250);
    const after = await p.evaluate(() => document.activeElement.getAttribute("data-iso"));
    if (before === after) add("calendar", "HIGH", `ArrowRight did not move focus (stayed on ${before})`);
    await p.keyboard.press("ArrowDown");
    await p.waitForTimeout(250);
    const afterDown = await p.evaluate(() => document.activeElement.getAttribute("data-iso"));
    if (afterDown === after) add("calendar", "HIGH", "ArrowDown did not move focus a week");
  }
  await p.close();
}

await browser.close();

const order = { HIGH: 0, MED: 1, LOW: 2 };
findings.sort((a, b) => order[a.sev] - order[b.sev]);
if (!findings.length) console.log("Keyboard audit: no issues.");
else {
  console.log(`Keyboard audit — ${findings.length} finding(s):\n`);
  for (const f of findings) console.log(`[${f.sev}] ${f.area}\n        ${f.msg}`);
}
