import { z } from 'zod';

type props = {
  maxFileSize: number;
  allowedFileTypes?: string[];
  fileNotImageError: string;
  wrongFileTypeError: string;
  sizeLimitError: string;
  optional?: boolean;
};

/**
 * A zod string accepting data URLs for images.
 * @param maxFileSize Max file size in megabytes.
 * @param allowedFileTypes A list of allowed file types
 * @param fileNotImageError Error message when the file is not an image
 * @param wrongFileTypeError Error message when the file type is wrong
 * @param sizeLimitError Error message when the file is too big
 * @param optional Whether the image upload is optional. Defaults to `false`
 * @returns ZodString which accepts images following the rules set.
 */
function imageUploadZodString({
  maxFileSize,
  allowedFileTypes = ['png', 'jpeg'],
  fileNotImageError,
  wrongFileTypeError,
  sizeLimitError,
  optional = false,
}: props) {
  const MAX_FILE_SIZE = maxFileSize * 1024 * 1024; // in bytes
  const zodString = z
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
      if (!data) return false;
      const sizeInBytes = (data.length * 3) / 4;
      return sizeInBytes <= MAX_FILE_SIZE;
    }, sizeLimitError)
    .transform(({ data }) => data);

  return optional ? zodString.optional() : zodString;
}

export { imageUploadZodString };
