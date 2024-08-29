import { env } from '@/env';

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: env.SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};

export default config;
