import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://Sanders2616.github.io/CV/',
  base: '/CV/',
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  integrations: [svelte(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
