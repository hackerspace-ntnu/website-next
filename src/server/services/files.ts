import { eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { files } from '@/server/db/tables';
import { type directories, s3 } from '@/server/s3';

const SIGNED_URL_EXPIRATION = 3600;

async function insertFile(
  base64String: string,
  directory: (typeof directories)[number],
  userId: number,
) {
  const parts = base64String.split(',');
  if (parts.length !== 2) {
    throw new Error('Invalid base64 string format');
  }

  const header = parts[0];
  const data = parts[1];

  const contentMatch = header?.match(/^data:(.*?);base64$/);
  if (!contentMatch?.[1]) {
    throw new Error('Invalid content type format');
  }

  const contentType = contentMatch[1];
  if (!data) {
    throw new Error('No data found in base64 string');
  }

  const buffer = Buffer.from(data, 'base64');

  const [file] = await db
    .insert(files)
    .values({
      directory,
      contentType,
      byteSize: buffer.length,
      uploadedBy: userId,
    })
    .returning();

  if (!file) {
    throw new Error('Failed to insert file record');
  }

  s3.uploadFile(directory, String(file.id), buffer, file.contentType);

  return file;
}

async function deleteFile(fileId: number) {
  const [deletedFile] = await db
    .delete(files)
    .where(eq(files.id, fileId))
    .returning();

  if (!deletedFile) {
    throw new Error('File not found');
  }

  s3.deleteFile(deletedFile.directory, String(deletedFile.id));

  return deletedFile;
}

async function getFileUrl(fileId: number) {
  const file = await db.query.files.findFirst({
    where: eq(files.id, fileId),
  });

  if (!file) {
    throw new Error('File not found');
  }

  return s3.getSignedUrl(
    file.directory,
    String(file.id),
    SIGNED_URL_EXPIRATION,
  );
}

export { insertFile, deleteFile, getFileUrl };
