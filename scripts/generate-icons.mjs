import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import sharp from 'sharp';

const source = 'public/app-icon-source.png';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const appleTouchSize = 180;

mkdirSync('public/icons', { recursive: true });

for (const size of sizes) {
  await sharp(source).resize(size, size).png().toFile(`public/icons/icon-${size}x${size}.png`);
  console.log(`✓ icon-${size}x${size}.png`);
}

await sharp(source).resize(appleTouchSize, appleTouchSize).png().toFile('public/icons/apple-touch-icon.png');
console.log(`✓ apple-touch-icon.png (${appleTouchSize}x${appleTouchSize})`);

console.log('\nIconos generados en public/icons/');
