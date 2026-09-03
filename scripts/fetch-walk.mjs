import fs from "node:fs/promises";
const QUERIES = [
  ["walk2", "woman walking dog green field summer"],
  ["walk2", "person walking two dogs sunny meadow"],
  ["walk2", "dog on leash green grass sunny handler"],
  ["walk2", "person crouching with dog in grass"],
  ["walk2", "dog trainer working with dog outdoors green"],
  ["walk2", "hands holding dog leash outdoors summer"],
  ["groom2", "cat being brushed warm light home"],
  ["groom2", "hands combing cat fur"],
];
const pool = JSON.parse(await fs.readFile("scripts/.candidates.json", "utf8"));
const seen = new Set(pool.map((p) => p.id));
const before = pool.length;
for (const [bucket, q] of QUERIES) {
  try {
    const res = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=24`, { headers: { Accept: "application/json" } });
    if (!res.ok) continue;
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
  } catch {}
  await new Promise((r) => setTimeout(r, 180));
}
await fs.writeFile("scripts/.candidates.json", JSON.stringify(pool, null, 2));
console.error(`pool ${before} → ${pool.length}`);
