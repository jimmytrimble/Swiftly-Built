// Generates favicon.svg, favicon.ico, apple-touch-icon.png, and og-default.png
// from the running-figure brand mark.
// Run: node scripts/gen-favicons.mjs
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const BLUE = '#0A84FF';
const JET = '#0B0B0D';
const MARK = 'public/brand/mark-white.png';
const MARK_ELECTRIC = 'public/brand/mark-electric.png';

// Compose the white runner centered on a solid blue square of the given size.
async function iconPng(size) {
  const runner = await sharp(MARK)
    .resize({ width: Math.round(size * 0.68) })
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: BLUE },
  })
    .composite([{ input: runner, gravity: 'center' }])
    .png()
    .toBuffer();
}

// favicon.svg — vector wrapper (rounded blue tile) with the runner embedded.
const runnerB64 = readFileSync(MARK).toString('base64');
const w = Math.round(64 * 0.68);
const h = Math.round((w * 350) / 445);
const x = Math.round((64 - w) / 2);
const y = Math.round((64 - h) / 2);
const svg = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="14" fill="${BLUE}"/><image href="data:image/png;base64,${runnerB64}" x="${x}" y="${y}" width="${w}" height="${h}"/></svg>`;
writeFileSync('public/favicon.svg', svg + '\n');

// favicon.ico — 32×32 PNG wrapped in a minimal ICO container.
const favPng = await iconPng(32);
const ico = Buffer.alloc(6 + 16);
ico.writeUInt16LE(0, 0);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(1, 4);
ico.writeUInt8(32, 6);
ico.writeUInt8(32, 7);
ico.writeUInt8(0, 8);
ico.writeUInt8(0, 9);
ico.writeUInt16LE(1, 10);
ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(favPng.length, 14);
ico.writeUInt32LE(22, 18);
writeFileSync('public/favicon.ico', Buffer.concat([ico, favPng]));

// apple-touch-icon — 180×180 full-bleed blue tile with the runner.
writeFileSync('public/apple-touch-icon.png', await iconPng(180));

// og-default — 1200×630 jet card: blue runner mark + "Swiftly Built" + tagline.
const interTight = readFileSync(
  'node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2',
).toString('base64');
const fontFace = `@font-face{font-family:'IT';src:url(data:font/woff2;base64,${interTight}) format('woff2');font-weight:100 900}`;
const ogBg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><style>${fontFace}</style><rect width="1200" height="630" fill="${JET}"/><text x="305" y="352" font-family="IT" font-weight="800" font-size="104" letter-spacing="-3" fill="#FFFFFF">Swiftly <tspan fill="${BLUE}">Built</tspan></text><text x="307" y="452" font-family="IT" font-weight="700" font-size="34" letter-spacing="-1" fill="#D4D4D8">Fast. Complete. Built to last.</text></svg>`;
const ogBase = await sharp(Buffer.from(ogBg)).png().toBuffer();
const ogRunner = await sharp(MARK_ELECTRIC).resize({ height: 120 }).png().toBuffer();
await sharp(ogBase)
  .composite([{ input: ogRunner, left: 130, top: 232 }])
  .png()
  .toFile('public/og-default.png');

console.log('brand assets generated');
