import { env } from '@/env';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

type AllowedDirectories = 'profile-picture' | 'news';

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
    directory: AllowedDirectories,
    key: string,
    file: Buffer,
    contentType: string,
  ) {
    if (!directory || !key) {
      throw new Error('Directory and key are required');
    }

    try {
      const fileKey = `${directory}/${key}`;

      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: fileKey,
        Body: file,
        ContentType: contentType,
      });

      return await this.client.send(command);
    } catch (error) {
      throw new Error(`Failed to upload file: ${(error as Error).message}`);
    }
  }

  async deleteFile(directory: AllowedDirectories, key: string) {
    if (!directory || !key) {
      throw new Error('Directory and key are required');
    }

    try {
      const fileKey = `${directory}/${key}`;

      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: fileKey,
      });

      return await this.client.send(command);
    } catch (error) {
      throw new Error(`Failed to delete file: ${(error as Error).message}`);
    }
  }

  async fileExists(directory: AllowedDirectories, key: string) {
    if (!directory || !key) {
      throw new Error('Directory and key are required');
    }

    try {
      const fileKey = `${directory}/${key}`;
      await this.client.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: fileKey,
        }),
      );
      return true;
    } catch (error) {
      if ((error as Error).name === 'NoSuchKey') return false;
      throw error;
    }
  }

  async getSignedUrl(
    directory: AllowedDirectories,
    key: string,
    expiresIn = 3600,
  ) {
    if (!directory || !key) {
      throw new Error('Directory and key are required');
    }

    try {
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
    } catch (error) {
      throw new Error(
        `Failed to generate signed URL: ${(error as Error).message}`,
      );
    }
  }
}

const s3 = new S3Service();

export { s3, type AllowedDirectories as AllowedDirectory };
