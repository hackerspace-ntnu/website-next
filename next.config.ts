import type { NextConfig } from 'next';
import nextIntl from 'next-intl/plugin';

const withNextIntl = nextIntl('./src/lib/locale/request.ts');

const config: NextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(config);
