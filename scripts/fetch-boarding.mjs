// Pet-BOARDING context, not generic pets at home: group play, kennels/suites,
// grooming salons, handlers with leads, cattery condos, feeding.
import fs from "node:fs/promises";
const QUERIES = [
  // group play / daycare
  ["board-play", "dog daycare group of dogs playing"],
  ["board-play", "many dogs playing together park"],
  ["board-play", "group of dogs running together"],
  ["board-play", "two dogs playing tug rope"],
  ["board-play", "dogs wrestling play fighting grass"],
  // handlers and leads
  ["board-staff", "dog walker walking several dogs leads"],
  ["board-staff", "woman holding dog leash outdoors"],
  ["board-staff", "trainer with dog on lead field"],
  ["board-staff", "person feeding dog bowl"],
  ["board-staff", "vet nurse holding cat clinic"],
  // suites / kennels / boarding rooms
  ["board-room", "dog boarding kennel modern clean"],
  ["board-room", "dog lying on raised elevated bed"],
  ["board-room", "dog in crate kennel indoor"],
  ["board-room", "dog looking through gate enclosure"],
  ["board-room", "dog resting in kennel run"],
  // cattery
  ["board-cat", "cat in cattery enclosure"],
  ["board-cat", "cat climbing tower condo indoor"],
  ["board-cat", "cat in carrier travel"],
  ["board-cat", "cat sitting on shelf indoors high"],
  ["board-cat", "cat behind glass window indoor"],
  // grooming salon
  ["board-groom", "dog grooming salon table"],
  ["board-groom", "dog being washed in bath grooming"],
  ["board-groom", "groomer trimming dog fur scissors"],
  ["board-groom", "cat being groomed brushed indoor"],
  // feeding
  ["board-feed", "dog eating from bowl indoor"],
  ["board-feed", "cat eating from bowl indoor"],
  ["board-feed", "pet food bowls stainless"],
];
const pool = JSON.parse(await fs.readFile("scripts/.candidates.json", "utf8"));
const seen = new Set(pool.map((p) => p.id));
const before = pool.length;
for (const [bucket, q] of QUERIES) {
  try {
    const res = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=24`, { headers: { Accept: "application/json" } });
    if (!res.ok) { console.error("FAIL " + q); continue; }
    const data = await res.json();
    let kept = 0;
    for (const r of data.results ?? []) {
      const raw = r.urls?.raw ?? "";
      if (!raw.startsWith("https://images.unsplash.com/") || seen.has(r.id)) continue;
      seen.add(r.id);
      pool.push({ id: r.id, bucket, query: q, alt: r.alt_description ?? "", color: r.color, w: r.width, h: r.height,
        ratio: +(r.width / r.height).toFixed(3), photographer: r.user?.name ?? "Unknown",
        photographerUrl: r.user?.links?.html ?? "", link: r.links?.html ?? "", raw: raw.split("?")[0] });
      kept++;
    }
    console.error(`ok ${String(kept).padStart(2)}  ${bucket.padEnd(12)} ${q}`);
  } catch (e) { console.error("ERR " + q); }
  await new Promise((r) => setTimeout(r, 180));
}
await fs.writeFile("scripts/.candidates.json", JSON.stringify(pool, null, 2));
const by = {}; for (const p of pool) by[p.bucket] = (by[p.bucket] ?? 0) + 1;
console.error(`\npool ${before} → ${pool.length}`);
console.error(JSON.stringify(Object.fromEntries(Object.entries(by).filter(([k]) => k.startsWith("board"))), null, 1));
