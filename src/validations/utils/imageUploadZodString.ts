import { z } from 'zod';

type props = {
  maxFileSize: number;
  allowedFileTypes?: string[];
  fileNotImageError: string;
  wrongFileTypeError: string;
  sizeLimitError: string;
};

/**
 * A zod string accepting data URLs for images.
 * @param maxFileSize Max file size in megabytes.
 * @param allowedFileTypes A list of allowed file types
 * @param fileNotImageError Error message when the file is not an image
 * @param wrongFileTypeError Error message when the file type is wrong
 * @param sizeLimitError Error message when the file is too big
 * @returns ZodString which accepts images following the rules set.
 */
function imageUploadZodString({
  maxFileSize,
  allowedFileTypes = ['png', 'jpeg'],
  fileNotImageError,
  wrongFileTypeError,
  sizeLimitError,
}: props) {
  const MAX_FILE_SIZE = maxFileSize * 1024 * 1024; // in bytes
  return z
    .string()
    .startsWith('data:image/', fileNotImageError)
    .transform((data) => {
      const parts = data.split(';');
      const contentType = parts[0]?.split(':')[1] ?? '';
      return { data, contentType };
    })
    .refine(
      ({ contentType }) =>
        allowedFileTypes.map((t) => `image/${t}`).includes(contentType),
      wrongFileTypeError,
    )
    .refine(({ data }) => {
      const sizeInBytes = (data.length * 3) / 4;
      return sizeInBytes <= MAX_FILE_SIZE;
    }, sizeLimitError)
    .transform(({ data }) => data);
}

export { imageUploadZodString };
