import { env } from '@/env';
import type { NextConfig } from 'next';
import nextIntl from 'next-intl/plugin';

const withNextIntl = nextIntl('./src/lib/locale/request.ts');

const config: NextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/s3/:path*',
          destination: `http://${env.S3_HOST}:${env.S3_PORT}/:path*`,
          basePath: false,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default withNextIntl(config);
