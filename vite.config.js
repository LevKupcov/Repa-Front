import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        news: resolve('news.html'),
        services: resolve('services.html'),
        serviceDetail: resolve('service-detail.html'),
        companyDetail: resolve('company-detail.html'),
        faq: resolve('faq.html'),
        contacts: resolve('contacts.html'),
        privacy: resolve('privacy.html'),
        notFound: resolve('404.html'),
      },
    },
  },
});
