import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  { ignores: ['dist/**', '.astro/**', 'node_modules/**', '.vercel/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.astro', 'src/**/*.ts'],
    languageOptions: { globals: { ...globals.browser } },
  },
  {
    files: ['astro.config.mjs', 'eslint.config.js', 'scripts/**/*.{js,mjs}'],
    languageOptions: { globals: { ...globals.node } },
  },
];
