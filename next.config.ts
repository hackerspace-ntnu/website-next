import { env } from '@/env';
import type { NextConfig } from 'next';
import nextIntl from 'next-intl/plugin';

const withNextIntl = nextIntl('./src/lib/locale/request.ts');

const config: NextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: new URL(env.NEXT_PUBLIC_SITE_URL).hostname,
      },
    ],
    // Most of our images are stored on our S3 instance and cannot be optimized.
    // Additional URL parameters added by next/image break the signed URLs.
    unoptimized: true
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
