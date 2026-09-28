#!/usr/bin/env node
// Fit delivered SVG illustrations: each square piece gets a square viewBox
// centred on its visible drawing (strokes and ground shadow included, measured
// from a render) with even padding, so every piece sits centred at the same
// visual size. The light and dark versions share one frame. Files whose name
// starts with "banner-" are copied as they are (their empty side is layout).
//
// usage: node fit-svg.js <srcDir> <outDir> [padding=0.07]
// needs:  npm i puppeteer-core   (or puppeteer, then CHROME_PATH isn't needed)
// env:    CHROME_PATH=path to Chrome/Chromium (defaults per OS below)
const fs = require("fs");
const path = require("path");

const [, , SRC, OUT, padArg] = process.argv;
if (!SRC || !OUT) {
  console.error("usage: node fit-svg.js <srcDir> <outDir> [padding=0.07]");
  process.exit(1);
}
const PAD = Number(padArg ?? 0.07);
const CHROME =
  process.env.CHROME_PATH ||
  {
    win32: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  }[process.platform] ||
  "/usr/bin/google-chrome";

let puppeteer;
try { puppeteer = require("puppeteer"); } catch { puppeteer = require("puppeteer-core"); }

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  // Full puppeteer brings its own browser; puppeteer-core needs a local one.
  const browser = await puppeteer.launch({ headless: true, executablePath: fs.existsSync(CHROME) ? CHROME : undefined });
  const page = await browser.newPage();
  await page.setContent("<html><body></body></html>");
  const names = fs.readdirSync(SRC).filter((f) => f.endsWith(".svg") && !f.endsWith("-dark.svg")).map((f) => f.slice(0, -4));

  for (const name of names) {
    const light = fs.readFileSync(path.join(SRC, `${name}.svg`), "utf8");
    const darkPath = path.join(SRC, `${name}-dark.svg`);
    const dark = fs.existsSync(darkPath) ? fs.readFileSync(darkPath, "utf8") : null;
    if (name.startsWith("banner-")) {
      fs.writeFileSync(path.join(OUT, `${name}.svg`), light);
      if (dark) fs.writeFileSync(path.join(OUT, `${name}-dark.svg`), dark);
      console.log(`${name}: banner, copied`);
      continue;
    }
    const box = await page.evaluate(async (svgs) => {
      const all = [];
      for (const s of svgs) {
        const m = s.match(/viewBox="([^"]+)"/);
        if (!m) throw new Error("SVG has no viewBox");
        const [vx, vy, vw, vh] = m[1].trim().split(/[\s,]+/).map(Number);
        const scale = Math.max(1, 1024 / Math.max(vw, vh)); // measure at a usable resolution
        const W = Math.round(vw * scale), H = Math.round(vh * scale);
        const img = new Image();
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
        await img.decode();
        const c = document.createElement("canvas");
        c.width = W; c.height = H;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0, W, H);
        const d = ctx.getImageData(0, 0, W, H).data;
        let x0 = W, y0 = H, x1 = -1, y1 = -1;
        for (let y = 0; y < H; y++)
          for (let x = 0; x < W; x++)
            if (d[(y * W + x) * 4 + 3] > 10) {
              if (x < x0) x0 = x; if (x > x1) x1 = x;
              if (y < y0) y0 = y; if (y > y1) y1 = y;
            }
        all.push({ x0: vx + x0 / scale, y0: vy + y0 / scale, x1: vx + (x1 + 1) / scale, y1: vy + (y1 + 1) / scale });
      }
      return {
        x0: Math.min(...all.map((b) => b.x0)), y0: Math.min(...all.map((b) => b.y0)),
        x1: Math.max(...all.map((b) => b.x1)), y1: Math.max(...all.map((b) => b.y1)),
      };
    }, dark ? [light, dark] : [light]);
    const w = box.x1 - box.x0, h = box.y1 - box.y0;
    const side = Math.round(Math.max(w, h) * (1 + 2 * PAD));
    const cx = (box.x0 + box.x1) / 2, cy = (box.y0 + box.y1) / 2;
    const vb = `${Math.round(cx - side / 2)} ${Math.round(cy - side / 2)} ${side} ${side}`;
    const fit = (s) => s.replace(/viewBox="[^"]+"/, `viewBox="${vb}"`);
    fs.writeFileSync(path.join(OUT, `${name}.svg`), fit(light));
    if (dark) fs.writeFileSync(path.join(OUT, `${name}-dark.svg`), fit(dark));
    console.log(`${name}: viewBox ${vb}${dark ? "" : "  (no -dark version!)"}`);
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
