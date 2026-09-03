import fs from "node:fs/promises";
import { chromium } from "playwright";
const man = JSON.parse(await fs.readFile("scripts/.image-manifest.json", "utf8"));
const group = process.argv[2];
const items = group ? man.filter((m) => m.slug.startsWith(group)) : man;
const cols = +(process.argv[3] || 3);
const cells = items.map((m) => `<figure><img src="../../public${m.src}"><figcaption>${m.slug} · ${m.ratio}</figcaption></figure>`).join("");
const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;background:#111;font:12px ui-monospace,monospace;color:#eee}
.g{display:grid;grid-template-columns:repeat(${cols},1fr);gap:8px;padding:8px}
figure{margin:0;position:relative;background:#000}
img{width:100%;height:auto;display:block}
figcaption{position:absolute;left:0;bottom:0;background:#000d;padding:3px 6px}
</style><div class="g">${cells}</div>`;
await fs.mkdir("scripts/.sheets", { recursive: true });
await fs.writeFile("scripts/.sheets/_review.html", html);
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1400, height: 600 } });
await pg.goto(`file://${process.cwd()}/scripts/.sheets/_review.html`, { waitUntil: "networkidle" });
await pg.locator(".g").screenshot({ path: `scripts/.sheets/crops-${group || "all"}.png` });
await b.close();
console.error("ok " + items.length);
