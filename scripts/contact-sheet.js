#!/usr/bin/env node
// Contact sheet of an illustration folder at on-screen size, on the app's real
// card colours, light and dark, with no plates. Use it to check centring,
// visual weight and dark-mode legibility across a set.
//
// usage: node contact-sheet.js <dir> <outDir> [lightCard=#ffffff] [darkCard=#1f2329]
// needs:  npm i puppeteer-core (or puppeteer); env CHROME_PATH as in fit-svg.js
const fs = require("fs");
const path = require("path");
const [, , DIR, OUT, lightBg = "#ffffff", darkBg = "#1f2329"] = process.argv;
if (!DIR || !OUT) {
  console.error("usage: node contact-sheet.js <dir> <outDir> [lightCard] [darkCard]");
  process.exit(1);
}
const CHROME =
  process.env.CHROME_PATH ||
  { win32: "C:/Program Files/Google/Chrome/Application/chrome.exe", darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" }[process.platform] ||
  "/usr/bin/google-chrome";
let puppeteer;
try { puppeteer = require("puppeteer"); } catch { puppeteer = require("puppeteer-core"); }

const abs = path.resolve(DIR);
const fileUrl = (f) => "file:///" + path.join(abs, f).replace(/\\/g, "/");
const names = fs.readdirSync(abs).filter((f) => /\.(svg|png|webp)$/.test(f) && !/-dark\.(svg|png|webp)$/.test(f)).sort();

function sheet(theme, list, wide) {
  const bg = theme === "dark" ? darkBg : lightBg;
  const fg = theme === "dark" ? "#c9ccd2" : "#4b5563";
  const cells = list
    .map((f) => {
      const src = theme === "dark" ? f.replace(/\.(svg|png|webp)$/, "-dark.$1") : f;
      const size = wide ? "width:320px;height:160px" : "width:150px;height:150px";
      return `<figure><img src="${fileUrl(src)}" style="${size}"><figcaption>${f}${fs.existsSync(path.join(abs, src)) ? "" : " (missing!)"}</figcaption></figure>`;
    })
    .join("");
  return `<html><body style="margin:0;background:${bg};font:11px system-ui;color:${fg}"><div style="display:flex;flex-wrap:wrap;gap:14px;padding:16px">${cells}</div>
<style>figure{margin:0;width:${wide ? 330 : 160}px;text-align:center}img{object-fit:contain;display:block;margin:0 auto}figcaption{margin-top:4px;word-break:break-all}</style></body></html>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: true, executablePath: fs.existsSync(CHROME) ? CHROME : undefined, args: ["--allow-file-access-from-files"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  const square = names.filter((n) => !n.startsWith("banner-"));
  const banners = names.filter((n) => n.startsWith("banner-"));
  const tmp = path.join(path.resolve(OUT), "_sheet.html");
  for (const theme of ["light", "dark"]) {
    for (let i = 0; i * 32 < square.length; i++) {
      fs.writeFileSync(tmp, sheet(theme, square.slice(i * 32, i * 32 + 32), false));
      await page.goto("file:///" + tmp.replace(/\\/g, "/"), { waitUntil: "load" });
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({ path: path.join(OUT, `sheet-${theme}-${i + 1}.png`), fullPage: true });
    }
    if (banners.length) {
      fs.writeFileSync(tmp, sheet(theme, banners, true));
      await page.goto("file:///" + tmp.replace(/\\/g, "/"), { waitUntil: "load" });
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({ path: path.join(OUT, `sheet-${theme}-banners.png`), fullPage: true });
    }
  }
  fs.unlinkSync(tmp);
  await browser.close();
  console.log(`${names.length} illustrations → ${OUT}`);
})().catch((e) => { console.error(e); process.exit(1); });
