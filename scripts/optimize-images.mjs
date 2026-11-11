// Converts the owner's job photos in public/images/raw to .webp in public/images.
// Keeps file names and native size (never upscales).
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const RAW = "public/images/raw";
const OUT = "public/images";

const files = (await readdir(RAW)).filter((f) => /\.(jpe?g|png)$/i.test(f));
for (const file of files) {
  const name = file.replace(/\.(jpe?g|png)$/i, ".webp");
  const info = await sharp(path.join(RAW, file))
    .rotate()
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(OUT, name));
  console.log(`${name}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}kb`);
}
