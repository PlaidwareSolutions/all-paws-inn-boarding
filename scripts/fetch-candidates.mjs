// Queries Unsplash's public search endpoint and builds a curated candidate pool.
// Free-license only: images.unsplash.com (excludes plus.unsplash.com = paid Unsplash+).
import fs from "node:fs/promises";

const QUERIES = [
  // property / landscape / architecture
  ["property", "golden hour meadow oak tree farm"],
  ["property", "stone barn countryside autumn"],
  ["property", "country estate lawn morning light"],
  ["property", "wooden barn interior warm light"],
  ["property", "farm gravel path fence"],
  ["property", "hudson valley countryside"],
  // dogs on grass / outdoors
  ["dog-outdoor", "golden retriever running grass field"],
  ["dog-outdoor", "dog golden hour field backlit"],
  ["dog-outdoor", "dogs playing together grass"],
  ["dog-outdoor", "dog running meadow sunset"],
  ["dog-outdoor", "dog in autumn leaves"],
  ["dog-outdoor", "dog creek water stream"],
  // dogs indoors / suites
  ["dog-indoor", "dog lying wooden floor sunlight"],
  ["dog-indoor", "dog sleeping bed window light"],
  ["dog-indoor", "dog resting linen bedroom"],
  ["dog-indoor", "dog by large window natural light"],
  ["dog-indoor", "dog curled up blanket cozy"],
  ["dog-indoor", "dog looking out window"],
  // portraits (guest index)
  ["dog-portrait", "bernese mountain dog portrait"],
  ["dog-portrait", "french bulldog portrait"],
  ["dog-portrait", "border collie portrait outdoors"],
  ["dog-portrait", "greyhound whippet portrait"],
  ["dog-portrait", "labrador portrait outdoors"],
  ["dog-portrait", "terrier scruffy dog portrait"],
  ["dog-portrait", "senior old dog grey muzzle"],
  ["dog-portrait", "dachshund portrait"],
  // cats
  ["cat", "cat sunbeam window sill"],
  ["cat", "cat lounging sunlight warm"],
  ["cat", "cat looking out window calm"],
  ["cat", "cat on wooden shelf perch"],
  ["cat", "tabby cat portrait soft light"],
  // people with animals (environmental, non-identifying preferred)
  ["people", "person hugging dog outdoors"],
  ["people", "hands petting dog"],
  ["people", "groomer brushing dog"],
  ["people", "person walking dog countryside"],
  ["people", "hands holding puppy"],
  ["people", "veterinarian examining dog gentle"],
  // spa / grooming
  ["spa", "dog bath grooming suds"],
  ["spa", "dog being brushed grooming"],
  ["spa", "clean fluffy dog after bath"],
  // food
  ["food", "dog food bowl kitchen wooden"],
  ["food", "raw salmon sweet potato ingredients"],
  ["food", "bone broth pouring bowl"],
  // calm / quiet wing
  ["quiet", "dog resting calm dim room"],
  ["quiet", "anxious shy dog soft light"],
  ["quiet", "dog sleeping peaceful"],
  // transport
  ["transport", "van country road autumn"],
  ["transport", "dog in car window road trip"],
];

const seen = new Set();
const pool = [];

for (const [bucket, q] of QUERIES) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=24`;
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) { console.error(`FAIL ${res.status} :: ${q}`); continue; }
    const data = await res.json();
    let kept = 0;
    for (const r of data.results ?? []) {
      const raw = r.urls?.raw ?? "";
      if (!raw.startsWith("https://images.unsplash.com/")) continue; // free license only
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
    console.error(`ok  ${String(kept).padStart(2)}  ${bucket.padEnd(12)} ${q}`);
  } catch (e) {
    console.error(`ERR ${q}: ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 220));
}

await fs.writeFile("scripts/.candidates.json", JSON.stringify(pool, null, 2));
console.error(`\nTOTAL CANDIDATES: ${pool.length}`);
const byBucket = {};
for (const p of pool) byBucket[p.bucket] = (byBucket[p.bucket] ?? 0) + 1;
console.error(JSON.stringify(byBucket, null, 2));
