import { env } from '@/env';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

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
    directory: string,
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

    return this.client.send(command);
  }

  async deleteFile(directory: string, key: string) {
    const fileKey = `${directory}/${key}`;

    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
    });

    return this.client.send(command);
  }
}

const s3 = new S3Service();

export { s3 };
