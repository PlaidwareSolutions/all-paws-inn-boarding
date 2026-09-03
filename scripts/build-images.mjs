// Downloads the curated selection at art-directed aspect ratios and emits a manifest
// (paths, alt text, credits, blur placeholders).
import fs from "node:fs/promises";
import path from "node:path";

const pool = JSON.parse(await fs.readFile("scripts/.candidates.json", "utf8"));

const R = {
  ultra:  [2400, 1000], // 12:5  full-bleed hero bands
  wide:   [2000, 1125], // 16:9  standard hero / gallery
  three2: [1600, 1067], // 3:2   editorial
  square: [1100, 1100], // 1:1   guest index
  port:   [1200, 1500], // 4:5   portrait panels
  tall:   [1200, 1600], // 3:4   tall editorial
};

// slug, candidate #, ratio key, focal crop hint
const PICKS = [
  // ── property / grounds ────────────────────────────────
  ["grounds-meadow-gold",    5,  "ultra"],
  ["grounds-open-field",     9,  "ultra"],
  ["grounds-oak-backlit",   10,  "three2"],
  ["grounds-hills-mist",    14,  "ultra"],
  ["grounds-stonewall",     16,  "three2"],
  ["grounds-barn-field",    22,  "three2"],
  ["grounds-barn-path",     27,  "wide"],
  ["grounds-dawn-treeline",  8,  "ultra"],
  ["grounds-floor-light",   34,  "port"],
  ["grounds-drive-trees",   47,  "tall"],
  ["grounds-drive-fence",   57,  "three2"],
  // ── dogs outdoors ─────────────────────────────────────
  ["hero-grass-backlit",    83,  "ultra"],
  ["hero-field-wide",       88,  "ultra"],
  ["hero-run-gold",         69,  "port"],
  ["dog-sunset-profile",    77,  "three2"],
  ["dog-run-green",         74,  "three2"],
  ["dog-meadow-stand",      75,  "wide"],
  ["dogs-play",             89,  "three2"],
  ["dog-stick-run",         63,  "port"],
  ["dog-golden-run",        66,  "three2"],
  ["dog-silhouette",        78,  "port"],
  // ── suites (indoor rest) ──────────────────────────────
  ["suite-lab-floor",      139,  "three2"],
  ["suite-curl-warm",      151,  "three2"],
  ["suite-bed-stretch",    166,  "three2"],
  ["suite-beagle-floor",   163,  "ultra"],
  ["suite-light-floor",    150,  "port"],
  ["suite-pup-floor",      149,  "port"],
  ["suite-bed-soft",       153,  "three2"],
  ["suite-shiba",          144,  "port"],
  // ── the quiet wing ────────────────────────────────────
  ["quiet-rest-peaceful",  587,  "ultra"],
  ["quiet-dark-light",     580,  "three2"],
  ["quiet-curl-bed",       592,  "three2"],
  ["quiet-amber",          154,  "port"],
  ["quiet-shaft",          159,  "port"],
  // ── the cattery ───────────────────────────────────────
  ["cat-window-bliss",     355,  "three2"],
  ["cat-sill-plant",       359,  "port"],
  ["cat-sunbeam-floor",    362,  "ultra"],
  ["cat-roll-wood",        369,  "three2"],
  ["cat-sleep-soft",       373,  "three2"],
  ["cat-white-serene",     366,  "square"],
  ["cat-snow-ledge",       158,  "port"],
  ["cat-dog-bed",          165,  "three2"],
  // ── guests of the inn (square index) ──────────────────
  ["guest-biscuit",        230,  "square"],
  ["guest-otis",           245,  "square"],
  ["guest-juniper",        265,  "square"],
  ["guest-marlowe",        272,  "square"],
  ["guest-roux",            77,  "square"],
  ["guest-dilla",           87,  "square"],
  ["guest-pim",            366,  "square"],
  // ── people / care (non-identifying, environmental) ────
  ["care-brush-hands",     456,  "three2"],
  ["care-walk-woods",      465,  "port"],
  ["care-walk-gate",       466,  "three2"],
  ["care-walk-meadow",     472,  "ultra"],
  ["care-hand-brush",      480,  "square"],
  ["care-hold-dog",        452,  "three2"],
  // ── spa ───────────────────────────────────────────────
  ["spa-blowdry",          520,  "ultra"],
  ["spa-wet-golden",       528,  "three2"],
  ["spa-fluffy-white",     531,  "port"],
  ["spa-puppy-close",      525,  "square"],
  ["spa-tub",              512,  "three2"],
  // ── the kitchen (dog-safe ingredients only) ───────────
  ["kitchen-bowls",        536,  "three2"],
  ["kitchen-salmon-flat",  538,  "square"],
  ["kitchen-salmon",       544,  "three2"],
  ["kitchen-carrots",      549,  "square"],
  ["kitchen-carrot-pile",  542,  "port"],
  // ── the shuttle ───────────────────────────────────────
  ["shuttle-road-fall",    601,  "ultra"],
  ["shuttle-car-road",     606,  "three2"],
  ["shuttle-dog-car",      616,  "three2"],
];

await fs.mkdir("public/images", { recursive: true });
const manifest = [];
let n = 0;

for (const [slug, idx, ratioKey] of PICKS) {
  const c = pool[idx];
  if (!c) { console.error(`MISSING candidate #${idx} for ${slug}`); continue; }
  const [w, h] = R[ratioKey];
  const url = `${c.raw}?w=${w}&h=${h}&fit=crop&crop=entropy&q=82&fm=jpg`;
  const file = path.join("public/images", `${slug}.jpg`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await fs.writeFile(file, Buffer.from(await res.arrayBuffer()));

    // tiny base64 placeholder
    const bRes = await fetch(`${c.raw}?w=16&h=${Math.max(1, Math.round((16 * h) / w))}&fit=crop&crop=entropy&q=40&fm=jpg&blur=60`);
    const blur = `data:image/jpeg;base64,${Buffer.from(await bRes.arrayBuffer()).toString("base64")}`;

    manifest.push({
      slug, src: `/images/${slug}.jpg`, width: w, height: h, ratio: ratioKey,
      alt: c.alt, blur,
      credit: { photographer: c.photographer, photographerUrl: c.photographerUrl, source: c.link, id: c.id },
    });
    n++;
    console.error(`${String(n).padStart(2)}/${PICKS.length}  ${slug}`);
  } catch (e) {
    console.error(`FAIL ${slug}: ${e.message}`);
  }
}

await fs.writeFile("scripts/.image-manifest.json", JSON.stringify(manifest, null, 2));
console.error(`\nDONE — ${manifest.length} images`);
