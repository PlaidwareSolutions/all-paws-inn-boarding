import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, reducedMotion: "reduce" });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await p.evaluate(async () => {
  const s = innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += s) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 130)); }
  window.scrollTo(0, 0);
});
await p.waitForTimeout(900);

const groups = await p.getByRole("group").all();
for (const g of groups) console.error("group:", await g.getAttribute("aria-label"));

const go = async (groupLabel, buttonName, file) => {
  const g = p.getByRole("group", { name: groupLabel, exact: true });
  await g.scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  await g.getByRole("button", { name: buttonName, exact: true }).click();
  await p.waitForTimeout(800);
  // frame the section that contains the toggle
  const section = g.locator("xpath=ancestor::section[1]");
  await section.screenshot({ path: `.qa/${file}.png` });
  console.error("shot " + file);
};

const houses = p.getByRole("group", { name: "Choose a house", exact: true });
await houses.scrollIntoViewIfNeeded();
await p.waitForTimeout(400);
await houses.locator("xpath=ancestor::section[1]").screenshot({ path: ".qa/two-houses-dog.png" });
console.error("shot two-houses-dog");

await go("Choose a house", "The Cattery", "two-houses-cat");
await go("Choose a day", "The Cattery", "timeline-cat");
await go("Choose a guest", "Pim", "reportcard-cat");

await b.close();
