'use client';

import { Trash2Icon, UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment, useCallback, useState } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import type { ZodError } from 'zod';
import { Button } from '@/components/ui/Button';
import { cx } from '@/lib/utils';
import { fileToBase64String } from '@/lib/utils/files';

type FileUploadProps = {
  onFilesUploaded: (files: File | File[] | null) => void;
  multiple?: boolean;
  accept?: Record<string, string[]>;
  maxSize?: number;
  defaultText?: string;
  errors?: string | string[];
  validator?: (value: string) => { success: boolean; error?: ZodError };
};

type FileWithPreview = File & {
  preview: string;
};

/**
 * A file upload component that allows users to upload files with validation.
 * A custom validator can be provided. If so, it will be used instead of the default
 * react-dropzone validation. It must handle base64 strings.
 *
 * The custom `validator` must handle multiple files if `multiple` is true.
 *
 * Do not provide `maxSize` if your custom validator handles file size validation.
 */
function FileUpload({
  multiple = false,
  accept,
  maxSize,
  defaultText,
  onFilesUploaded,
  validator,
  errors: externalErrors,
}: FileUploadProps) {
  const t = useTranslations('ui');
  defaultText = defaultText ?? t('uploadText');
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [internalErrors, setInternalErrors] = useState<string[] | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // If using custom validator, use it immediately
      if (validator) {
        const allFiles = [
          ...acceptedFiles,
          ...rejectedFiles.map((r) => r.file),
        ];

        const resultPromises = allFiles.map(async (file) =>
          validator(await fileToBase64String(file)),
        );
        const results = await Promise.all(resultPromises);

        if (results.some((result) => !result.success)) {
          const errors = results
            .map((result, index) => {
              if (!result.error || result.success) return null;
              const fileName = allFiles[index]?.name;
              const issues = result.error?.issues
                .map((issue) => issue.message)
                .join(', ');

              if (!fileName) return issues;

              return `${fileName}: ${issues}`;
            })
            .filter((result) => result !== null);

          setInternalErrors(errors);
          return;
        }
      }

      if (rejectedFiles.length > 0 && !validator) {
        const errorMessages = rejectedFiles.map((rejection) => {
          const { file, errors } = rejection;
          return errors.map((e) => `${file.name}: ${e.message}`).join(', ');
        });
        setInternalErrors(errorMessages);
        return;
      }

      if (acceptedFiles.length === 0 || !acceptedFiles[0]) {
        setInternalErrors([t('noValidFiles')]);
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) }),
      );

      if (!multiple) {
        const singleFile = newFiles[0] || null;
        setFiles(newFiles.slice(0, 1));
        onFilesUploaded(singleFile);
      } else {
        setFiles((prev) => [...prev, ...newFiles]);
        onFilesUploaded(newFiles);
      }
      setInternalErrors(null);
    },
    [multiple, onFilesUploaded, t, validator],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
  });

  function removeFile(file: FileWithPreview) {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    onFilesUploaded(multiple ? newFiles : null);
    URL.revokeObjectURL(file.preview);
  }

  return (
    <div>
      <div
        {...getRootProps({
          className: cx(
            'cursor-pointer rounded-lg border-2 border-dashed bg-background p-4 text-center transition-colors',
            isDragActive
              ? 'border-primary bg-primary/5'
              : internalErrors || externalErrors
                ? 'border-destructive'
                : 'border-muted hover:border-muted-foreground',
          ),
        })}
      >
        <input {...getInputProps()} />
        <UploadIcon className='mx-auto h-8 w-8 text-muted-foreground' />
        <p className='mt-2 text-muted-foreground text-sm'>{defaultText}</p>
      </div>

      {(internalErrors || externalErrors) && (
        <p className='mt-2 font-medium text-destructive text-xs'>
          {internalErrors?.map((error) => (
            <Fragment key={error}>
              {error}
              <br />
            </Fragment>
          ))}
          {externalErrors
            ? Array.isArray(externalErrors)
              ? externalErrors.join(', ')
              : externalErrors
            : null}
        </p>
      )}

      {files.length > 0 && (
        <div className='mt-4 space-y-2'>
          {files.map((file) => (
            <div
              key={`${file.name}-${file.size}-${file.lastModified}`}
              className='flex items-center justify-between rounded-md border bg-background p-3'
            >
              <div className='flex items-center space-x-2'>
                <span className='font-medium text-sm'>{file.name}</span>
                <span className='text-muted-foreground text-xs'>
                  ({(file.size / 1024).toFixed(2)} KB)
                </span>
              </div>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => removeFile(file)}
              >
                <Trash2Icon className='h-4 w-4' />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { FileUpload };
