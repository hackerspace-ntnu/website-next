import { useState } from 'react';
import { api } from '@/lib/api/client';
import type { fileDirectories } from '@/lib/constants';
import { fileToBase64String } from '@/lib/utils/files';

interface UseUploadFileProps {
  directory: (typeof fileDirectories)[number];
  uploadToMatrix?: boolean;
  onUploadBegin?: (fileName: string) => void;
  onUploadComplete?: (file: UploadedFile) => void;
  onUploadError?: (error: unknown) => void;
}

interface UploadedFile {
  key: string; // Unique identifier
  url: string; // Public URL of the uploaded file
  name: string; // Original filename
  size: number; // File size in bytes
  type: string; // MIME type
  file: File;
}

export function useUploadFile({
  directory,
  uploadToMatrix,
  onUploadBegin,
  onUploadComplete,
  onUploadError,
}: UseUploadFileProps) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile>();
  const [uploadingFile, setUploadingFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const uploadFileMutation = api.utils.uploadFile.useMutation();

  async function uploadFile(file: File) {
    setIsUploading(true);
    setUploadingFile(file);
    onUploadBegin?.(file.name);

    try {
      const fileData = await uploadFileMutation.mutateAsync({
        directory,
        file: await fileToBase64String(file),
        uploadToMatrix,
      });

      const uploadedFile = {
        key: fileData.id.toString(),
        url: fileData.url,
        name: file.name,
        size: file.size,
        type: file.type,
        file,
      };

      setUploadedFile(uploadedFile);
      onUploadComplete?.(uploadedFile);

      return uploadedFile;
    } catch (error) {
      onUploadError?.(error);
      throw error;
    } finally {
      setProgress(0);
      setIsUploading(false);
      setUploadingFile(undefined);
    }
  }

  return {
    isUploading,
    progress,
    uploadFile,
    uploadedFile,
    uploadingFile,
  };
}
