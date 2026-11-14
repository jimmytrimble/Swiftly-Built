// Generates favicon.svg, favicon.ico, and apple-touch-icon.png from the
// running-figure brand mark (white runner on the electric-blue square).
// Run: node scripts/gen-favicons.mjs
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const BLUE = '#0A84FF';
const MARK = 'public/brand/mark-white.png';

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

console.log('favicons generated');
