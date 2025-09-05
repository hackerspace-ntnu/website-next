import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '@/env';
import type { fileDirectories } from '@/lib/constants';

class S3Service {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor() {
    this.bucket = env.S3_NAME;

    // Cache the S3 client in development
    const globalForS3 = globalThis as unknown as {
      s3: S3Client | undefined;
    };

    this.client =
      globalForS3.s3 ??
      new S3Client({
        credentials: {
          accessKeyId: env.S3_USER,
          secretAccessKey: env.S3_PASSWORD,
        },
        endpoint: `http://${env.S3_HOST}:${env.S3_PORT}`,
        forcePathStyle: true,
        region: 'auto',
      });

    if (env.NODE_ENV !== 'production') globalForS3.s3 = this.client;
  }

  async uploadFile(
    directory: (typeof fileDirectories)[number],
    key: string,
    file: Buffer,
    contentType: string,
  ) {
    const fileKey = `${directory}/${key}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
      Body: file,
      ContentType: contentType,
    });

    return await this.client.send(command);
  }

  async deleteFile(directory: (typeof fileDirectories)[number], key: string) {
    const fileKey = `${directory}/${key}`;

    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
    });

    return await this.client.send(command);
  }

  async fileExists(directory: (typeof fileDirectories)[number], key: string) {
    const fileKey = `${directory}/${key}`;
    await this.client.send(
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: fileKey,
      }),
    );
    return true;
  }

  async getSignedUrl(
    directory: (typeof fileDirectories)[number],
    key: string,
    expiresIn = 3600,
  ) {
    const fileKey = `${directory}/${key}`;

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
    });

    const url = await getSignedUrl(this.client, command, { expiresIn });
    const internalEndpoint = `http://${env.S3_HOST}:${env.S3_PORT}`;
    const publicEndpoint = `${env.NEXT_PUBLIC_SITE_URL}/s3`;

    if (!url.includes(internalEndpoint)) {
      throw new Error('Unexpected URL format');
    }

    return url.replace(internalEndpoint, publicEndpoint);
  }
}

const directories = [
  'profile-pictures',
  'news',
  'storage-items',
  'events',
  'groups',
] as const;

const s3 = new S3Service();

export { s3 };
