import { env } from '@/env';
import { s3 } from '@/server/s3';
import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutBucketPolicyCommand,
  S3ServiceException,
} from '@aws-sdk/client-s3';

type BucketConfig = {
  name: string;
  isPublic?: boolean;
};

type BucketKeys = 'images';

type BucketsConfig = {
  [K in BucketKeys]: BucketConfig;
};

const bucketNames = env.S3_BUCKETS.split(',');

const buckets: BucketsConfig = {
  images: {
    name: bucketNames[0] as string,
    isPublic: true,
  },
};

const getBucketConfigs = () => Object.values(buckets);

async function setupBucket(bucketConfig: { name: string; isPublic?: boolean }) {
  const { name, isPublic } = bucketConfig;

  try {
    await s3.send(new HeadBucketCommand({ Bucket: name })).catch(async () => {
      await s3.send(
        new CreateBucketCommand({
          Bucket: name,
          ...(isPublic && { ACL: 'public-read' }),
        }),
      );
    });

    if (isPublic) {
      await s3.send(
        new PutBucketPolicyCommand({
          Bucket: name,
          Policy: JSON.stringify({
            Version: '2012-10-17',
            Statement: [
              {
                Sid: 'PublicReadGetObject',
                Effect: 'Allow',
                Principal: '*',
                Action: 's3:GetObject',
                Resource: `arn:aws:s3:::${name}/*`,
              },
            ],
          }),
        }),
      );
    }

    console.log(`✅ Bucket ${name} configured successfully`);
  } catch (error) {
    if (error instanceof S3ServiceException) {
      console.error(`❌ Error configuring bucket ${name}:`, error.message);
    } else {
      console.error(`❌ Unexpected error configuring bucket ${name}:`, error);
    }
  }
}

export async function main() {
  console.log('🔄 Configuring S3 buckets...');
  const bucketConfigs = getBucketConfigs();

  await Promise.all(
    bucketConfigs.filter(Boolean).map((config) => setupBucket(config)),
  );

  console.log('✅ All buckets configured successfully');
}

await main();
process.exit(0);

export { buckets, getBucketConfigs, setupBucket };
