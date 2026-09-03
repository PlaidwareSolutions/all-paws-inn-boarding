// Adds Gulf-Coast/Texas landscape and deeper cat coverage to the existing
// candidate pool, without discarding the 630 already gathered.
// Free-licence only: images.unsplash.com (excludes paid Unsplash+).
import fs from "node:fs/promises";

const QUERIES = [
  // ── Texas / Gulf Coast landscape ──────────────────────────
  ["tx-land", "live oak tree spreading canopy"],
  ["tx-land", "texas bluebonnet field spring"],
  ["tx-land", "texas prairie golden hour grass"],
  ["tx-land", "pecan grove trees"],
  ["tx-land", "spanish moss oak southern"],
  ["tx-land", "cattle pasture texas ranch"],
  ["tx-land", "green pasture summer heat haze"],
  ["tx-land", "wildflower meadow warm south"],
  // ── Texas / southern architecture ─────────────────────────
  ["tx-arch", "barn metal roof rural farm"],
  ["tx-arch", "white timber barn green field"],
  ["tx-arch", "southern farmhouse porch"],
  ["tx-arch", "ranch gate dirt road trees"],
  ["tx-arch", "corrugated metal roof building rural"],
  // ── warm-climate water ────────────────────────────────────
  ["tx-water", "shallow creek trees summer"],
  ["tx-water", "dog swimming pool splash summer"],
  ["tx-water", "sprinkler water dog playing summer"],
  // ── dogs in warm green settings (no autumn) ───────────────
  ["tx-dog", "dog running green grass summer sun"],
  ["tx-dog", "dog in wildflowers spring field"],
  ["tx-dog", "dog under large tree shade"],
  ["tx-dog", "labrador swimming lake summer"],
  // ── CATS: environment & behaviour ─────────────────────────
  ["cat2", "cat on screened porch catio"],
  ["cat2", "cat climbing cat tree shelf"],
  ["cat2", "cat being brushed grooming hands"],
  ["cat2", "cat playing feather wand toy"],
  ["cat2", "senior old cat portrait"],
  ["cat2", "two cats sleeping together"],
  ["cat2", "cat eating from bowl"],
  ["cat2", "cat stretching yawning"],
  ["cat2", "cat in sunroom glass conservatory"],
  ["cat2", "cat looking out large window garden"],
  ["cat2", "cat curled up in basket bed"],
  ["cat2", "cat hiding in box cosy"],
  // ── CATS: breeds for the guest index ──────────────────────
  ["cat-breed", "british shorthair cat portrait"],
  ["cat-breed", "tortoiseshell cat portrait"],
  ["cat-breed", "ginger orange tabby cat portrait"],
  ["cat-breed", "black and white tuxedo cat portrait"],
  ["cat-breed", "grey cat green eyes portrait"],
  ["cat-breed", "siamese cat portrait"],
];

const pool = JSON.parse(await fs.readFile("scripts/.candidates.json", "utf8"));
const seen = new Set(pool.map((p) => p.id));
const before = pool.length;

for (const [bucket, q] of QUERIES) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=24`;
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) { console.error(`FAIL ${res.status} :: ${q}`); continue; }
    const data = await res.json();
    let kept = 0;
    for (const r of data.results ?? []) {
      const raw = r.urls?.raw ?? "";
      if (!raw.startsWith("https://images.unsplash.com/")) continue;
      if (seen.has(r.id)) continue;
      seen.add(r.id);
      pool.push({
        id: r.id,
        bucket,
        query: q,
        alt: r.alt_description ?? r.description ?? "",
        color: r.color,
        w: r.width,
        h: r.height,
        ratio: +(r.width / r.height).toFixed(3),
        photographer: r.user?.name ?? "Unknown",
        photographerUrl: r.user?.links?.html ?? "",
        link: r.links?.html ?? "",
        raw: raw.split("?")[0],
      });
      kept++;
    }
    console.error(`ok ${String(kept).padStart(2)}  ${bucket.padEnd(10)} ${q}`);
  } catch (e) {
    console.error(`ERR ${q}: ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 200));
}

await fs.writeFile("scripts/.candidates.json", JSON.stringify(pool, null, 2));
const byBucket = {};
for (const p of pool) byBucket[p.bucket] = (byBucket[p.bucket] ?? 0) + 1;
console.error(`\npool ${before} → ${pool.length}  (+${pool.length - before})`);
console.error(JSON.stringify(byBucket, null, 2));
