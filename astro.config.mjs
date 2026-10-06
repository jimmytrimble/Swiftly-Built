// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.PUBLIC_SITE_URL ?? 'https://swiftlybuilt.com';

export default defineConfig({
  site,
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404') })],
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'auto' },
});
