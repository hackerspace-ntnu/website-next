'use client';

import { PlaceholderPlugin, UploadErrorCode } from '@platejs/media/react';
import { useTranslations } from 'next-intl';
import { usePluginOption } from 'platejs/react';
import * as React from 'react';
import { toast } from 'sonner';

function MediaUploadToast() {
  useUploadErrorToast();

  return null;
}

const useUploadErrorToast = () => {
  const uploadError = usePluginOption(PlaceholderPlugin, 'error');
  const t = useTranslations('ui.plate');

  React.useEffect(() => {
    if (!uploadError) return;

    const { code, data } = uploadError;

    switch (code) {
      case UploadErrorCode.INVALID_FILE_SIZE: {
        toast.error(
          t('invalidFileSize', {
            files: data.files.map((f) => f.name).join(', '),
          }),
        );

        break;
      }
      case UploadErrorCode.INVALID_FILE_TYPE: {
        toast.error(
          t('invalidFileType', {
            files: data.files.map((f) => f.name).join(', '),
          }),
        );

        break;
      }
      case UploadErrorCode.TOO_LARGE: {
        toast.error(
          t('tooLargeFiles', {
            files: data.files.map((f) => f.name).join(', '),
            max: data.maxFileSize,
          }),
        );

        break;
      }
      case UploadErrorCode.TOO_LESS_FILES: {
        toast.error(
          t('tooFewFiles', {
            min: data.minFileCount,
            type: data.fileType,
          }),
        );

        break;
      }
      case UploadErrorCode.TOO_MANY_FILES: {
        toast.error(
          t('tooManyFiles', {
            max: data.maxFileCount,
            type: data.fileType ?? '',
          }),
        );

        break;
      }
    }
  }, [uploadError, t]);
};

export { MediaUploadToast };
