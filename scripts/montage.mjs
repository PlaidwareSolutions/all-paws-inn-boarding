import fs from "node:fs/promises";
import { chromium } from "playwright";
const files = (await fs.readdir(".qa")).filter(f=>f.endsWith(".png")).sort();
const cells = files.map(f=>`<figure><img src="../../.qa/${f}"><figcaption>${f}</figcaption></figure>`).join("");
const html=`<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#111;font:11px ui-monospace,monospace;color:#eee}
.g{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:6px}figure{margin:0;position:relative}
img{width:100%;display:block;border:1px solid #333}figcaption{position:absolute;left:0;top:0;background:#000c;padding:2px 5px}</style><div class="g">${cells}</div>`;
await fs.writeFile("scripts/.sheets/_m.html", html);
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1500,height:600}});
await p.goto(`file://${process.cwd()}/scripts/.sheets/_m.html`,{waitUntil:"networkidle"});
await p.locator(".g").screenshot({path:"scripts/.sheets/montage.png"});
await b.close(); console.error("montage of "+files.length);
