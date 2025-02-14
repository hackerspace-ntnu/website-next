import { env } from '@/env';
import { S3Client } from '@aws-sdk/client-s3';

const endpoint = `http://${env.S3_HOST}:${env.S3_PORT}`;

// Cache the S3 client in development. This avoids creating a new client on every HMR update.
const globalForS3 = globalThis as unknown as {
  s3: S3Client | undefined;
};

const s3 =
  globalForS3.s3 ??
  new S3Client({
    credentials: {
      accessKeyId: env.S3_USER,
      secretAccessKey: env.S3_PASSWORD,
    },
    endpoint: endpoint,
    forcePathStyle: true,
    region: 'auto', // Required but not used with self-hosted storage
  });

if (env.NODE_ENV !== 'production') globalForS3.s3 = s3;

const bucket = env.S3_NAME;

export { s3, endpoint, bucket };
