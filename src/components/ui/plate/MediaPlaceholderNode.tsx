'use client';

import {
  PlaceholderPlugin,
  PlaceholderProvider,
  updateUploadHistory,
} from '@platejs/media/react';
import { AudioLines, FileUp, Film, ImageIcon, Loader2Icon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { TPlaceholderElement } from 'platejs';
import { KEYS } from 'platejs';
import type { PlateElementProps } from 'platejs/react';
import { PlateElement, useEditorPlugin, withHOC } from 'platejs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import { toast } from '@/components/ui/Toaster';
import { fileDirectories } from '@/lib/constants';
import { useUploadFile } from '@/lib/hooks/useUploadFile';
import { cx } from '@/lib/utils';

const CONTENT: Record<
  string,
  {
    accept: string[];
    content: React.ReactNode;
    icon: React.ReactNode;
  }
> = {
  [KEYS.audio]: {
    accept: ['audio/*'],
    content: 'Add an audio file',
    icon: <AudioLines />,
  },
  [KEYS.file]: {
    accept: ['*'],
    content: 'Add a file',
    icon: <FileUp />,
  },
  [KEYS.img]: {
    accept: ['image/*'],
    content: 'Add an image',
    icon: <ImageIcon />,
  },
  [KEYS.video]: {
    accept: ['video/*'],
    content: 'Add a video',
    icon: <Film />,
  },
};

const PlaceholderElement = withHOC(
  PlaceholderProvider,
  function PlaceholderElement(props: PlateElementProps<TPlaceholderElement>) {
    const { editor, element } = props;

    const { api } = useEditorPlugin(PlaceholderPlugin);
    const t = useTranslations('error');
    const pathname = usePathname();

    const getDirectoryFromPathname = (
      pathname: string,
    ): (typeof fileDirectories)[number] => {
      for (const dir of fileDirectories) {
        if (pathname.includes(dir)) return dir;
      }
      return 'rich-input';
    };

    const { isUploading, progress, uploadedFile, uploadFile, uploadingFile } =
      useUploadFile({
        directory: getDirectoryFromPathname(pathname),
        onUploadError: () => toast.error(t('uploadFailed')),
      });

    const loading = isUploading && uploadingFile;

    const currentContent = CONTENT[element.mediaType];

    const isImage = element.mediaType === KEYS.img;

    const imageRef = useRef<HTMLImageElement>(null);

    const { openFilePicker } = useFilePicker({
      accept: currentContent?.accept,
      multiple: true,
      onFilesSelected: ({ plainFiles: updatedFiles }) => {
        const firstFile = updatedFiles[0];
        const restFiles = updatedFiles.slice(1);

        replaceCurrentPlaceholder(firstFile);

        if (restFiles.length > 0) {
          editor.getTransforms(PlaceholderPlugin).insert.media(restFiles);
        }
      },
    });

    const replaceCurrentPlaceholder = useCallback(
      (file: File) => {
        void uploadFile(file);
        api.placeholder.addUploadingFile(element.id as string, file);
      },
      [api.placeholder, element.id, uploadFile],
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: off
    useEffect(() => {
      if (!uploadedFile) return;

      const path = editor.api.findPath(element);

      editor.tf.withoutSaving(() => {
        editor.tf.removeNodes({ at: path });

        const node = {
          children: [{ text: '' }],
          initialHeight: imageRef.current?.height,
          initialWidth: imageRef.current?.width,
          isUpload: true,
          name: element.mediaType === KEYS.file ? uploadedFile.name : '',
          placeholderId: element.id as string,
          type: element.mediaType,
          fileId: uploadedFile.key,
        };

        editor.tf.insertNodes(node, { at: path });

        updateUploadHistory(editor, node);
      });

      api.placeholder.removeUploadingFile(element.id as string);
    }, [uploadedFile, element.id]);

    // React dev mode will call useEffect twice
    const isReplaced = useRef(false);

    /** Paste and drop */
    // biome-ignore lint/correctness/useExhaustiveDependencies: off
    useEffect(() => {
      if (isReplaced.current) return;

      isReplaced.current = true;
      const currentFiles = api.placeholder.getUploadingFile(
        element.id as string,
      );

      if (!currentFiles) return;

      replaceCurrentPlaceholder(currentFiles);
    }, [isReplaced]);

    return (
      <PlateElement className='my-1' {...props}>
        {(!loading || !isImage) && (
          // biome-ignore lint/a11y/noStaticElementInteractions: off
          // biome-ignore lint/a11y/useKeyWithClickEvents: off
          <div
            className={cx(
              'flex cursor-pointer select-none items-center rounded-sm bg-muted p-3 pr-9 hover:bg-primary/10',
            )}
            onClick={() => !loading && openFilePicker()}
            contentEditable={false}
          >
            <div className='relative mr-3 flex text-muted-foreground/80 [&_svg]:size-6'>
              {currentContent?.icon}
            </div>
            <div className='whitespace-nowrap text-muted-foreground text-sm'>
              <div>
                {loading ? uploadingFile?.name : currentContent?.content}
              </div>

              {loading && !isImage && (
                <div className='mt-1 flex items-center gap-1.5'>
                  <div>{formatBytes(uploadingFile?.size ?? 0)}</div>
                  <div>–</div>
                  <div className='flex items-center'>
                    <Loader2Icon className='mr-1 size-3.5 animate-spin text-muted-foreground' />
                    {progress ?? 0}%
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {isImage && loading && (
          <ImageProgress
            file={uploadingFile}
            imageRef={imageRef}
            progress={progress}
          />
        )}

        {props.children}
      </PlateElement>
    );
  },
);

function ImageProgress({
  className,
  file,
  imageRef,
  progress = 0,
}: {
  file: File;
  className?: string;
  imageRef?: React.RefObject<HTMLImageElement | null>;
  progress?: number;
}) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setObjectUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!objectUrl) {
    return null;
  }

  return (
    <div className={cx('relative', className)} contentEditable={false}>
      {/** biome-ignore lint/performance/noImgElement: Dynamic image */}
      <img
        ref={imageRef}
        className='h-auto w-full rounded-sm object-cover'
        alt={file.name}
        src={objectUrl}
      />
      {progress < 100 && (
        <div className='absolute right-1 bottom-1 flex items-center space-x-2 rounded-full bg-black/50 px-1 py-0.5'>
          <Loader2Icon className='size-3.5 animate-spin text-muted-foreground' />
          <span className='font-medium text-white text-xs'>
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
}

function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {},
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];

  if (bytes === 0) return '0 Byte';

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / 1024 ** i).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytest')
      : (sizes[i] ?? 'Bytes')
  }`;
}

export { PlaceholderElement, ImageProgress };
