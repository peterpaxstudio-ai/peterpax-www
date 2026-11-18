import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://peterpax.ai500.pl',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
