import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import compress from 'astro-compress';
import { SITE } from './src/config.mjs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const whenExternalScripts = (items = []) =>
  SITE.googleAnalyticsId ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

const env = loadEnv('', process.cwd(), 'STORYBLOK');

// https://astro.build/config
export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'static',
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        // Add your components here
        blogPost: 'storyblok/BlogPost',
        blogPostList: 'storyblok/BlogPostList',
        page: 'storyblok/Page',
      },
      apiOptions: {
        // Choose your Storyblok space region
        region: 'eu', // optional,  or 'eu' (default)
      },
    }),

    sitemap(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    mdx(),
    ...whenExternalScripts(() =>
      partytown({
        config: {
          forward: ['dataLayer.push'],
        },
      })
    ),
    compress({
      css: true,
      html: {
        removeAttributeQuotes: false,
      },
      img: false,
      js: true,
      svg: false,
      logger: 1,
    }),
  ],
  markdown: {},
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
