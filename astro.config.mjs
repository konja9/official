// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages（プロジェクトサイト）: https://konja9.github.io/official/
export default defineConfig({
  site: 'https://konja9.github.io',
  base: '/official',
  trailingSlash: 'ignore',
});
