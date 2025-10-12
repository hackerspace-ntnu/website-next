'use client';

import { PlaceholderPlugin } from '@platejs/media/react';
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import {
  AudioLinesIcon,
  FileUpIcon,
  FilmIcon,
  ImageIcon,
  LinkIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { isUrl, KEYS } from 'platejs';
import { useEditorRef } from 'platejs/react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useFilePicker } from 'use-file-picker';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Input } from '@/components/ui/Input';
import {
  ToolbarSplitButton,
  ToolbarSplitButtonPrimary,
  ToolbarSplitButtonSecondary,
} from '@/components/ui/plate/Toolbar';
import type { Translations } from '@/lib/locale';

function getMediaConfig(t: Translations): Record<
  string,
  {
    accept: string[];
    icon: React.ReactNode;
    title: string;
    tooltip: string;
  }
> {
  return {
    [KEYS.audio]: {
      accept: ['audio/*'],
      icon: <AudioLinesIcon className='size-4' />,
      title: t('ui.plate.insertAudio'),
      tooltip: t('ui.plate.audio'),
    },
    [KEYS.file]: {
      accept: ['*'],
      icon: <FileUpIcon className='size-4' />,
      title: t('ui.plate.insertFile'),
      tooltip: t('ui.plate.file'),
    },
    [KEYS.img]: {
      accept: ['image/*'],
      icon: <ImageIcon className='size-4' />,
      title: t('ui.plate.insertImage'),
      tooltip: t('ui.plate.image'),
    },
    [KEYS.video]: {
      accept: ['video/*'],
      icon: <FilmIcon className='size-4' />,
      title: t('ui.plate.insertVideo'),
      tooltip: t('ui.plate.video'),
    },
  };
}

function MediaToolbarButton({
  nodeType,
  ...props
}: DropdownMenuProps & { nodeType: string }) {
  const t = useTranslations();
  const currentConfig = getMediaConfig(t)[nodeType];

  const editor = useEditorRef();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { openFilePicker } = useFilePicker({
    accept: currentConfig?.accept,
    multiple: true,
    onFilesSelected: ({ plainFiles: updatedFiles }) => {
      editor.getTransforms(PlaceholderPlugin).insert.media(updatedFiles);
    },
  });

  return (
    <>
      <ToolbarSplitButton
        onClick={() => {
          openFilePicker();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        pressed={open}
      >
        <ToolbarSplitButtonPrimary>
          {currentConfig?.icon}
        </ToolbarSplitButtonPrimary>

        <DropdownMenu
          open={open}
          onOpenChange={setOpen}
          modal={false}
          {...props}
        >
          <DropdownMenuTrigger asChild>
            <ToolbarSplitButtonSecondary />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            onClick={(e) => e.stopPropagation()}
            align='start'
            alignOffset={-32}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => openFilePicker()}>
                {currentConfig?.icon}
                {t('ui.plate.uploadFromComputer')}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setDialogOpen(true)}>
                <LinkIcon />
                {t('ui.plate.insertViaUrl')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ToolbarSplitButton>

      <AlertDialog
        open={dialogOpen}
        onOpenChange={(value) => {
          setDialogOpen(value);
        }}
      >
        <AlertDialogContent className='gap-6'>
          {currentConfig && (
            <MediaUrlDialogContent
              currentConfig={currentConfig}
              nodeType={nodeType}
              setOpen={setDialogOpen}
            />
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function MediaUrlDialogContent({
  currentConfig,
  nodeType,
  setOpen,
}: {
  currentConfig: ReturnType<typeof getMediaConfig>[string];
  nodeType: string;
  setOpen: (value: boolean) => void;
}) {
  const editor = useEditorRef();
  const [url, setUrl] = useState('');
  const t = useTranslations('ui');

  const embedMedia = useCallback(() => {
    if (!isUrl(url)) return toast.error(t('plate.invalidUrl'));

    setOpen(false);
    editor.tf.insertNodes({
      children: [{ text: '' }],
      name: nodeType === KEYS.file ? url.split('/').pop() : undefined,
      type: nodeType,
      url,
    });
  }, [url, editor, nodeType, setOpen, t]);

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{currentConfig.title}</AlertDialogTitle>
      </AlertDialogHeader>

      <AlertDialogDescription className='group relative w-full'>
        <label
          className='-translate-y-1/2 absolute top-1/2 block cursor-text px-1 text-muted-foreground/70 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:font-medium group-focus-within:text-foreground group-focus-within:text-xs has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground has-[+input:not(:placeholder-shown)]:text-xs'
          htmlFor='url'
        >
          <span className='inline-flex bg-background px-2'>URL</span>
        </label>
        <Input
          id='url'
          className='w-full'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') embedMedia();
          }}
          placeholder=''
          type='url'
          autoFocus
        />
      </AlertDialogDescription>

      <AlertDialogFooter>
        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault();
            embedMedia();
          }}
        >
          {t('accept')}
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}

export { MediaToolbarButton };
