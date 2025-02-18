import { eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { files } from '@/server/db/tables';
import { type directories, s3 } from '@/server/s3';
import { matrixUploadMedia } from '@/server/services/matrix';

const SIGNED_URL_EXPIRATION = 3600;

async function insertFile(
  base64String: string,
  directory: (typeof directories)[number],
  userId: number,
  uploadToMatrix = false,
) {
  const parts = base64String.split(',');
  if (parts.length !== 2) {
    const error = 'Invalid base64 string format';
    console.error(error);
    throw new Error(error);
  }

  const header = parts[0];
  const data = parts[1];

  const contentMatch = header?.match(/^data:(.*?);base64$/);
  if (!contentMatch?.[1]) {
    const error = 'Invalid content type format';
    console.error(error);
    throw new Error(error);
  }

  const contentType = contentMatch[1];
  if (!data) {
    const error = 'No data found in base64 string';
    console.error(error);
    throw new Error(error);
  }

  const buffer = Buffer.from(data, 'base64');

  let matrixMediaId = null;
  if (uploadToMatrix) {
    matrixMediaId = await matrixUploadMedia(buffer, contentType);
  }

  const [file] = await db
    .insert(files)
    .values({
      directory,
      contentType,
      byteSize: buffer.length,
      uploadedBy: userId,
      matrixMediaId,
    })
    .returning();

  if (!file) {
    const error = 'Failed to insert file record';
    console.error(error);
    throw new Error(error);
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
    const error = 'File not found';
    console.error(error);
    throw new Error(error);
  }

  s3.deleteFile(deletedFile.directory, String(deletedFile.id));

  return deletedFile;
}

async function getFileUrl(fileId: number) {
  const file = await db.query.files.findFirst({
    where: eq(files.id, fileId),
  });

  if (!file) {
    const error = 'File not found';
    console.error(error);
    throw new Error(error);
  }

  return s3.getSignedUrl(
    file.directory,
    String(file.id),
    SIGNED_URL_EXPIRATION,
  );
}

export { insertFile, deleteFile, getFileUrl };
