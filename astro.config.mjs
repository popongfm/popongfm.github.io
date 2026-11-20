import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://popongfm.github.io',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'th'],
    routing: { prefixDefaultLocale: false },
  },
});
