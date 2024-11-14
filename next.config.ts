import type { NextConfig } from 'next';
import nextIntl from 'next-intl/plugin';

const withNextIntl = nextIntl('./src/lib/locale/request.ts');

const config: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

export default withNextIntl(config);
