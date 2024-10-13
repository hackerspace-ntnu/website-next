import nextIntl from 'next-intl/plugin';
await import('./src/env.js');

const withNextIntl = nextIntl('./src/lib/locale/request.ts');

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
};

export default withNextIntl(config);
