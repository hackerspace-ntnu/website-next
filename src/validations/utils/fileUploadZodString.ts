import { z } from 'zod';

type FileUploadProps = {
  maxFileSize: number;
  allowedMediaType:
    | 'application'
    | 'audio'
    | 'image'
    | 'message'
    | 'multipart'
    | 'text'
    | 'video';
  allowedFileTypes: string[];
  fileNotImageError: string;
  wrongFileTypeError: string;
  sizeLimitError: string;
  optional?: boolean;
};

/**
 * A zod string accepting data URLs for images.
 * @param maxFileSize Max file size in megabytes.
 * @param allowedMediaType Only the first part of the allowed content type, for example 'image' or 'application'.
 * @param allowedFileTypes A list of allowed file types, for example 'png', 'jpeg', 'msword' or 'vnd.ms-powerpoint'.
 * @param fileNotImageError If uploading an image, this error will be used when the file is not an image.
 * @param wrongFileTypeError Error message when the file type is wrong.
 * @param sizeLimitError Error message when the file is too big.
 * @param optional Whether the image upload is optional. Defaults to `false`.
 * @returns ZodString which accepts images following the rules set.
 */
function fileUploadZodString({
  maxFileSize,
  allowedMediaType,
  allowedFileTypes,
  fileNotImageError,
  wrongFileTypeError,
  sizeLimitError,
  optional = false,
}: FileUploadProps) {
  const MAX_FILE_SIZE = maxFileSize * 1024 * 1024; // in bytes
  let zodString = z.string();

  if (allowedMediaType === 'image') {
    zodString = zodString.startsWith('data:image/', fileNotImageError);
  }

  // @ts-expect-error These are multiple ZodEffects stacked on top of each other,
  // we don't care about the exact type
  zodString = zodString
    .transform((data) => {
      const parts = data.split(';');
      const contentType = parts[0]?.split(':')[1] ?? '';
      return { data, contentType };
    })
    .refine(
      ({ contentType }) =>
        allowedFileTypes
          .map((t) => `${allowedMediaType}/${t}`)
          .includes(contentType),
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

export { fileUploadZodString };
