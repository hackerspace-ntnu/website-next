'use client';

import { Trash2Icon, UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/Button';
import { cx } from '@/lib/utils';

type FileUploadProps = {
  onFilesUploaded: (files: File | File[] | null) => void;
  multiple?: boolean;
  accept?: Record<string, string[]>;
  maxSize?: number;
  defaultText?: string;
  errors?: string | string[];
};

type FileWithPreview = File & {
  preview: string;
};

function FileUpload({
  multiple = false,
  accept,
  maxSize = 5 * 1024 * 1024,
  defaultText,
  onFilesUploaded,
  errors: externalErrors,
}: FileUploadProps) {
  const t = useTranslations('ui');
  defaultText = defaultText ?? t('uploadText');
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [internalErrors, setInternalErrors] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        setInternalErrors(t('noValidFiles'));
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
    [multiple, onFilesUploaded, t],
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
          {internalErrors ||
            (Array.isArray(externalErrors)
              ? externalErrors.join(', ')
              : externalErrors)}
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
