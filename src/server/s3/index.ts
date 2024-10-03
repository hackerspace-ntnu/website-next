import { env } from '@/env';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

const endpoint = `http://${env.STORAGE_HOST}:${env.STORAGE_PORT}`;

// Cache the S3 client in development. This avoids creating a new client on every HMR update.
const globalForS3 = globalThis as unknown as {
  s3: S3Client | undefined;
};

const s3 =
  globalForS3.s3 ??
  new S3Client({
    credentials: {
      accessKeyId: env.STORAGE_USER,
      secretAccessKey: env.STORAGE_PASSWORD,
    },
    endpoint: endpoint,
    forcePathStyle: true,
    region: ' ', // Required but not used with self-hosted storage
  });

if (env.NODE_ENV !== 'production') globalForS3.s3 = s3;

const buckets = env.STORAGE_NAME.split(',');
const imageBucket = buckets[0];

export { s3, endpoint, imageBucket, PutObjectCommand, DeleteObjectCommand };
