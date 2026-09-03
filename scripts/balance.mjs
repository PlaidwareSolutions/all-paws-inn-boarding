// Measures dog/cat representation so "equal emphasis" is a number, not a claim.
import fs from "node:fs/promises";
import path from "node:path";

const walk = async (dir) => {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(tsx?|ts)$/.test(e.name) && !e.name.endsWith("images.ts")) out.push(p);
  }
  return out;
};

const CAT_IMG = /^(cat-|guest-(pim|saffron|bruno|clementine)|panel-cattery|panel-quiet-cat|hero-cat)/;
const DOG_IMG = /^(guest-|suite-|dog-|hero-|quiet-|spa-|panel-daycare)/;

const files = (await fs.readdir("public/images")).filter((f) => f.endsWith(".jpg")).map((f) => f.replace(".jpg", ""));
let imgDog = 0, imgCat = 0, imgNeutral = 0;
for (const f of files) {
  if (CAT_IMG.test(f)) imgCat++;
  else if (DOG_IMG.test(f)) imgDog++;
  else imgNeutral++;
}

const surfaces = {
  "data/": "src/data",
  "components/": "src/components",
  "app/": "src/app",
};
const rows = [];
let totalDog = 0, totalCat = 0;
for (const [label, dir] of Object.entries(surfaces)) {
  let dog = 0, cat = 0;
  for (const f of await walk(dir)) {
    const t = await fs.readFile(f, "utf8");
    dog += (t.match(/\bdogs?\b/gi) ?? []).length;
    cat += (t.match(/\bcats?\b/gi) ?? []).length;
  }
  rows.push([label, dog, cat]);
  totalDog += dog;
  totalCat += cat;
}

const ratio = (a, b) => (b === 0 ? "∞" : (a / b).toFixed(2) + ":1");
const pad = (s, n) => String(s).padEnd(n);

console.log("\nDOG / CAT BALANCE\n" + "─".repeat(46));
console.log(pad("surface", 16) + pad("dog", 8) + pad("cat", 8) + "ratio");
console.log("─".repeat(46));
console.log(pad("images", 16) + pad(imgDog, 8) + pad(imgCat, 8) + ratio(imgDog, imgCat));
for (const [l, d, c] of rows) console.log(pad(l, 16) + pad(d, 8) + pad(c, 8) + ratio(d, c));
console.log("─".repeat(46));
console.log(pad("copy total", 16) + pad(totalDog, 8) + pad(totalCat, 8) + ratio(totalDog, totalCat));
console.log(`\n(${imgNeutral} images serve both houses)`);

// Structural checks that a word count cannot see. Type declarations like
// `species: "dog" | "cat"` are excluded — they are not content.
const countSpecies = (text, species) =>
  text
    .split("\n")
    .filter((l) => !l.includes("|"))
    .join("\n")
    .match(new RegExp(`species: "${species}"`, "g"))?.length ?? 0;

const checks = [];
const suites = await fs.readFile("src/data/suites.ts", "utf8");
checks.push(["rooms per house", countSpecies(suites, "dog"), countSpecies(suites, "cat")]);
const guests = await fs.readFile("src/data/guests.ts", "utf8");
checks.push(["guests + quotes", countSpecies(guests, "dog"), countSpecies(guests, "cat")]);
const addons = await fs.readFile("src/data/addons.ts", "utf8");
const both = countSpecies(addons, "both");
checks.push(["enrichment", countSpecies(addons, "dog") + both, countSpecies(addons, "cat") + both]);
const cams = await fs.readFile("src/data/cameras.ts", "utf8");
const camLines = cams.split("\n").filter((l) => !l.includes("|")).join("\n");
checks.push(["cameras", (camLines.match(/house: "The Lodge"/g) ?? []).length, (camLines.match(/house: "The Cattery"/g) ?? []).length]);
const tl = await fs.readFile("src/data/timeline.ts", "utf8");
checks.push([
  "timeline stops",
  (tl.split("export const catDay")[0].match(/time: "/g) ?? []).length,
  (tl.split("export const catDay")[1].match(/time: "/g) ?? []).length,
]);
const cards = await fs.readFile("src/data/reportCards.ts", "utf8");
checks.push(["report cards", countSpecies(cards, "dog"), countSpecies(cards, "cat")]);

console.log("\nSTRUCTURAL PARITY\n" + "─".repeat(46));
console.log(pad("surface", 16) + pad("dog", 8) + pad("cat", 8));
console.log("─".repeat(46));
for (const [l, d, c] of checks) console.log(pad(l, 16) + pad(d, 8) + pad(c, 8) + (d === c ? "✓" : ""));

// Skew is measured in whichever direction it leans — being 1.4:1 toward cats is
// no more balanced than 1.4:1 toward dogs.
const skew = (a, b) => (Math.max(a, b) / Math.min(a, b));
const verdict = (a, b, label) => {
  const s = skew(a, b);
  const lead = a === b ? "even" : a > b ? "dog-leaning" : "cat-leaning";
  console.log(`${label} skew ${s.toFixed(2)}:1 (${lead}) — target ≤ 1.25:1  ${s <= 1.25 ? "PASS" : "OVER"}`);
};
console.log("");
verdict(totalDog, totalCat, "Copy ");
verdict(imgDog, imgCat, "Image");
console.log("");
