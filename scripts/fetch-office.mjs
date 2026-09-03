import fs from "node:fs/promises";
const QUERIES = [
  ["office", "modern low rise office building exterior glass"],
  ["office", "medical office building exterior parking lot"],
  ["office", "commercial office building entrance landscaping"],
  ["office", "professional office park building exterior sunny"],
  ["office", "office building tinted glass windows exterior"],
  ["yard", "dog in fenced turf yard outdoor"],
  ["yard", "fenced dog play yard artificial turf"],
  ["yard", "dog daycare outdoor turf yard fence"],
  ["yard", "dog running fenced yard commercial"],
  ["courtyard", "office building entrance courtyard landscaping"],
  ["courtyard", "landscaped courtyard planting entrance walkway"],
];
const pool = JSON.parse(await fs.readFile("scripts/.candidates.json", "utf8"));
const seen = new Set(pool.map((p) => p.id));
const before = pool.length;
for (const [bucket, q] of QUERIES) {
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
  console.error(`ok ${String(kept).padStart(2)}  ${q}`);
  await new Promise((r) => setTimeout(r, 200));
}
await fs.writeFile("scripts/.candidates.json", JSON.stringify(pool, null, 2));
console.error(`pool ${before} → ${pool.length}`);
