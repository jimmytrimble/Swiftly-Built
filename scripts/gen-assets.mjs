// Generates favicon.ico, apple-touch-icon.png, og-default.png and placeholder case-study images.
// Run: node scripts/gen-assets.mjs
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';

const JET = '#0B0B0D';
const BLUE = '#0A84FF';
const fontPath = (p) =>
  readFileSync(new URL(`../node_modules/${p}`, import.meta.url)).toString('base64');
const interTight = fontPath(
  '@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2',
);
const fontFace = `@font-face{font-family:'IT';src:url(data:font/woff2;base64,${interTight}) format('woff2');font-weight:100 900}`;

const chevron = (x, y, s, stroke) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M16 9 L44 31 L16 53" fill="none" stroke="${stroke}" stroke-width="12" stroke-linecap="square" stroke-linejoin="miter"/>`;
const baseline = (x, y, s, stroke) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M6 60 H40" fill="none" stroke="${stroke}" stroke-width="6" stroke-linecap="square"/>`;

// favicon.ico (from favicon.svg at 32px, ICO wraps a PNG)
const favPng = await sharp(Buffer.from(readFileSync('public/favicon.svg')))
  .resize(32, 32)
  .png()
  .toBuffer();
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
await writeFile('public/favicon.ico', Buffer.concat([ico, favPng]));

// apple-touch-icon 180px: jet bg, blue chevron, white baseline
const apple = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="${JET}"/>${chevron(26, 22, 2, BLUE)}${baseline(26, 22, 2, '#FFFFFF')}</svg>`;
await sharp(Buffer.from(apple)).png().toFile('public/apple-touch-icon.png');

// og-default 1200x630: jet bg, horizontal lockup centered, tagline below
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<style>${fontFace}</style>
<rect width="1200" height="630" fill="${JET}"/>
<g transform="translate(290 215)">
  ${chevron(0, 0, 2.2, BLUE)}${baseline(0, 0, 2.2, '#FFFFFF')}
  <text x="175" y="112" font-family="Inter Tight" font-weight="800" font-size="112" letter-spacing="-4" fill="#FFFFFF">Swiftly <tspan fill="${BLUE}">Built</tspan></text>
</g>
<text x="600" y="455" text-anchor="middle" font-family="Inter Tight" font-weight="700" font-size="40" letter-spacing="-1.2" fill="#D4D4D8">Fast. Complete. Built to last.</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og-default.png');

// Placeholder case-study images
await mkdir('src/assets/work', { recursive: true });
const slugs = ['case-study-one', 'case-study-two', 'case-study-three'];
const tones = ['#1C1C21', '#19222E', '#1E1A22'];
for (const [i, slug] of slugs.entries()) {
  const cover = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><style>${fontFace}</style>
  <rect width="1200" height="800" fill="${tones[i]}"/>
  <rect x="440" y="110" width="320" height="690" rx="44" fill="${JET}" stroke="#2A2A2E" stroke-width="4"/>
  ${chevron(540, 300, 2, BLUE)}${baseline(540, 300, 2, '#FFFFFF')}
  <text x="600" y="520" text-anchor="middle" font-family="Inter Tight" font-weight="700" font-size="28" fill="#A1A1AA">[COVER ${i + 1}]</text></svg>`;
  await sharp(Buffer.from(cover)).png().toFile(`src/assets/work/${slug}-cover.png`);
  for (let s = 1; s <= 3; s++) {
    const screen = `<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844"><style>${fontFace}</style>
    <rect width="390" height="844" fill="${JET}"/>
    <rect x="24" y="90" width="342" height="56" rx="12" fill="#2A2A2E"/>
    <rect x="24" y="170" width="342" height="200" rx="14" fill="${tones[i]}" stroke="#2A2A2E"/>
    <rect x="24" y="394" width="342" height="120" rx="14" fill="#141416" stroke="#2A2A2E"/>
    <rect x="24" y="538" width="342" height="120" rx="14" fill="#141416" stroke="#2A2A2E"/>
    <rect x="24" y="740" width="342" height="52" rx="8" fill="${BLUE}"/>
    <text x="195" y="300" text-anchor="middle" font-family="Inter Tight" font-weight="700" font-size="22" fill="#A1A1AA">[SCREEN ${s}]</text></svg>`;
    await sharp(Buffer.from(screen)).png().toFile(`src/assets/work/${slug}-screen-${s}.png`);
  }
}
console.log('assets generated');
