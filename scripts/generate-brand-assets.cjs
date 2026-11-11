// Renders the Open Graph image and the "g?" app icons from plain HTML with the real fonts.
// Needs Playwright with Chromium: NODE_PATH=$(npm root -g) node scripts/generate-brand-assets.cjs
// Output: app/opengraph-image.jpg, app/twitter-image.jpg, app/icon.png, app/apple-icon.png
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const photo = fs.readFileSync(path.join(root, "public/images/07-teal-jeep-wrangler-rubicon-side-BEST.webp")).toString("base64");

const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@700;800&family=Manrope:wght@500;600&display=block" rel="stylesheet">`;

const og = `<!doctype html><html><head>${FONTS}<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#07090A;font-family:Manrope;color:#F2F5F3;position:relative;overflow:hidden}
.bg{position:absolute;inset:0;background:radial-gradient(60% 70% at 78% 45%,#141a1c 0%,transparent 70%)}
.copy{position:absolute;left:72px;top:92px;width:600px}
.eyebrow{font-weight:600;font-size:18px;letter-spacing:.18em;text-transform:uppercase;color:#8C9A9E;display:flex;gap:12px;align-items:center}
.dot{width:9px;height:9px;border-radius:50%;background:#C8E62A}
h1{font-family:'Saira Condensed';font-weight:800;line-height:.86;margin-top:26px}
.wm{display:block;font-size:178px;color:#C8E62A}
.sub{display:block;font-size:92px;margin-top:18px}
.foot{position:absolute;left:72px;bottom:58px;font-size:24px;font-weight:600}
.foot b{color:#C8E62A;font-family:'Saira Condensed';font-size:34px;font-weight:800;margin-right:14px}
.card{position:absolute;right:56px;top:96px;width:470px;height:440px;border-radius:18px;overflow:hidden;border:1px solid #1F2629;box-shadow:0 40px 80px -30px #000,inset 0 1px 0 rgba(255,255,255,.06);background:url(data:image/webp;base64,${photo}) 40% 42%/cover}
.film{position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,9,10,.55) 0 64%,transparent 64%)}
.squeegee{position:absolute;top:-8px;bottom:-8px;left:64%;width:4px;border-radius:4px;background:#C8E62A;box-shadow:0 0 16px 3px rgba(200,230,42,.45)}
.chip{position:absolute;left:16px;bottom:16px;background:rgba(7,9,10,.72);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:8px 14px;font-size:16px;font-weight:600}
</style></head><body><div class="bg"></div>
<div class="copy"><div class="eyebrow"><span class="dot"></span>Capitol Heights, MD · MD, DC &amp; VA</div>
<h1><span class="wm">got tint?</span><span class="sub">We come to you.</span></h1></div>
<div class="foot"><b>(301) 828-6311</b>Call or text. 18+ years.</div>
<div class="card"><div class="film"></div><div class="squeegee"></div><div class="chip">Jeep Wrangler Rubicon</div></div>
</body></html>`;

const icon = (size, radius) => `<!doctype html><html><head>${FONTS}<style>
*{margin:0}body{width:${size}px;height:${size}px;background:transparent}
.i{width:${size}px;height:${size}px;border-radius:${radius}px;background:#C8E62A;display:grid;place-items:center;
font-family:'Saira Condensed';font-weight:800;color:#07090A;font-size:${Math.round(size * 0.78)}px;line-height:1;letter-spacing:-.02em}
.i span{transform:translateY(-${Math.round(size * 0.07)}px)}
</style></head><body><div class="i"><span>g?</span></div></body></html>`;

(async () => {
  const browser = await chromium.launch();
  const shot = async (html, w, h, out) => {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(root, out), omitBackground: true });
    await page.close();
    console.log("wrote", out);
  };
  await shot(og, 1200, 630, "app/opengraph-image.png");
  const sharp = require("sharp");
  const ogPng = path.join(root, "app/opengraph-image.png");
  await sharp(ogPng).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(root, "app/opengraph-image.jpg"));
  fs.copyFileSync(path.join(root, "app/opengraph-image.jpg"), path.join(root, "app/twitter-image.jpg"));
  fs.unlinkSync(ogPng);
  await shot(icon(512, 112), 512, 512, "app/icon.png");
  await shot(icon(180, 0), 180, 180, "app/apple-icon.png");
  await browser.close();
})();
