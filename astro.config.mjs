import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO: once the GitHub repo exists, update `site` to the real
// https://<usuario>.github.io/<repo>/ URL and `base` to '/<repo>/'
// (or base: '/' if it's a user/root site). Both must match for
// SEO canonical URLs, the sitemap, and asset paths to work on GH Pages.
export default defineConfig({
  site: 'https://sandra-aguilar.github.io',
  base: '/',
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  integrations: [svelte(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
