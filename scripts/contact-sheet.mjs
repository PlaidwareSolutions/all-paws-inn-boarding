// Renders numbered contact sheets of candidates so they can be reviewed visually.
import fs from "node:fs/promises";
import { chromium } from "playwright";

const pool = JSON.parse(await fs.readFile("scripts/.candidates.json", "utf8"));
const bucketArg = process.argv[2];
const buckets = bucketArg ? [bucketArg] : [...new Set(pool.map((p) => p.bucket))];
await fs.mkdir("scripts/.sheets", { recursive: true });

const browser = await chromium.launch();
for (const bucket of buckets) {
  const items = pool.filter((p) => p.bucket === bucket);
  const PER = 30;
  for (let page = 0; page * PER < items.length; page++) {
    const slice = items.slice(page * PER, (page + 1) * PER);
    const cells = slice
      .map((p) => {
        const i = pool.indexOf(p);
        const thumb = `${p.raw}?w=420&h=420&fit=crop&crop=entropy&q=70`;
        return `<figure><img src="${thumb}" loading="eager"/><figcaption>#${i} · ${p.ratio >= 1 ? "L" : "P"} ${p.color}</figcaption></figure>`;
      })
      .join("");
    const html = `<!doctype html><meta charset="utf-8"><style>
      body{margin:0;background:#111;font:12px ui-monospace,monospace;color:#eee}
      .g{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;padding:6px}
      figure{margin:0;position:relative;background:#000}
      img{width:100%;aspect-ratio:1;object-fit:cover;display:block}
      figcaption{position:absolute;left:0;bottom:0;background:#000c;padding:2px 5px;font-size:11px}
    </style><div class="g">${cells}</div>`;
    const pg = await browser.newPage({ viewport: { width: 1560, height: 400 } });
    await pg.setContent(html, { waitUntil: "networkidle", timeout: 60000 });
    const out = `scripts/.sheets/${bucket}-${page}.png`;
    await pg.locator(".g").screenshot({ path: out });
    await pg.close();
    console.error(`sheet ${out}  (#${pool.indexOf(slice[0])}–#${pool.indexOf(slice[slice.length-1])})`);
  }
}
await browser.close();
