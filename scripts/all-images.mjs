import fs from "node:fs/promises";
import { chromium } from "playwright";
const man = JSON.parse(await fs.readFile("scripts/.image-manifest.json", "utf8"));
const part = +(process.argv[2] || 0), per = 35;
const items = man.slice(part * per, (part + 1) * per);
const cells = items.map((m) => `<figure><img src="../../public${m.src}"><figcaption>${m.slug}</figcaption></figure>`).join("");
const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;background:#111;font:10px ui-monospace,monospace;color:#eee}
.g{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;padding:4px}
figure{margin:0;position:relative;background:#000}
img{width:100%;aspect-ratio:1;object-fit:cover;display:block}
figcaption{position:absolute;left:0;bottom:0;right:0;background:#000d;padding:2px 3px;font-size:9px;overflow:hidden;white-space:nowrap}
</style><div class="g">${cells}</div>`;
await fs.writeFile("scripts/.sheets/_all.html", html);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 600 } });
await p.goto(`file://${process.cwd()}/scripts/.sheets/_all.html`, { waitUntil: "networkidle" });
await p.locator(".g").screenshot({ path: `scripts/.sheets/all-${part}.png` });
await b.close();
console.error(`sheet all-${part}: ${items.length}`);
