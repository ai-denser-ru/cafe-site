// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import siteData from './src/content/settings/site.json' assert { type: 'json' };

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: siteData.site,
  base: siteData.base,
  vite: {
    plugins: [tailwindcss()]
  }
});