// Adds/replaces individual crops without re-downloading the whole set.
import fs from "node:fs/promises";
const pool = JSON.parse(await fs.readFile("scripts/.candidates.json", "utf8"));
const manifest = JSON.parse(await fs.readFile("scripts/.image-manifest.json", "utf8"));
const R = { ultra:[2400,1000], wide:[2000,1125], three2:[1600,1067], square:[1100,1100], port:[1200,1500], tall:[1200,1600] };

// slug, candidate#, ratio, optional crop mode (entropy | top | center | "fp:X,Y")
const ADD = JSON.parse(process.env.ADD);

for (const [slug, idx, ratioKey, mode = "entropy"] of ADD) {
  const c = pool[idx];
  const [w, h] = R[ratioKey];
  let cropParam = `fit=crop&crop=${mode}`;
  if (mode.startsWith("fp:")) {
    const [x, y] = mode.slice(3).split(",");
    cropParam = `fit=crop&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=1`;
  }
  const url = `${c.raw}?w=${w}&h=${h}&${cropParam}&q=82&fm=jpg`;
  const res = await fetch(url);
  if (!res.ok) { console.error(`FAIL ${slug} ${res.status}`); continue; }
  await fs.writeFile(`public/images/${slug}.jpg`, Buffer.from(await res.arrayBuffer()));
  const bRes = await fetch(`${c.raw}?w=16&h=${Math.round(16*h/w)}&${cropParam}&q=40&fm=jpg&blur=60`);
  const blur = `data:image/jpeg;base64,${Buffer.from(await bRes.arrayBuffer()).toString("base64")}`;
  const entry = { slug, src:`/images/${slug}.jpg`, width:w, height:h, ratio:ratioKey, alt:c.alt, blur,
    credit:{ photographer:c.photographer, photographerUrl:c.photographerUrl, source:c.link, id:c.id } };
  const at = manifest.findIndex((m) => m.slug === slug);
  if (at >= 0) manifest[at] = entry; else manifest.push(entry);
  console.error(`ok ${slug}  (#${idx} ${ratioKey} ${mode})`);
}
await fs.writeFile("scripts/.image-manifest.json", JSON.stringify(manifest, null, 2));
