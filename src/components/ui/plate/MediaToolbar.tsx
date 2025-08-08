'use client';

import {
  FloatingMedia as FloatingMediaPrimitive,
  FloatingMediaStore,
  useFloatingMediaValue,
  useImagePreviewValue,
} from '@platejs/media/react';
import { cva } from 'cva';
import { Link, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { WithRequiredKey } from 'platejs';
import {
  useEditorRef,
  useEditorSelector,
  useElement,
  useFocusedLast,
  useReadOnly,
  useRemoveNodeButton,
  useSelected,
} from 'platejs/react';
import * as React from 'react';
import { Button, buttonVariants } from '@/components/ui/Button';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@/components/ui/Popover';
import { CaptionButton } from '@/components/ui/plate/Caption';
import { Separator } from '@/components/ui/Separator';

const inputVariants = cva({
  base: 'flex h-[28px] w-full rounded-md border-none bg-transparent px-1.5 py-1 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-transparent md:text-sm',
});

function MediaToolbar({
  children,
  plugin,
}: {
  children: React.ReactNode;
  plugin: WithRequiredKey;
}) {
  const editor = useEditorRef();
  const readOnly = useReadOnly();
  const selected = useSelected();
  const isFocusedLast = useFocusedLast();
  const selectionCollapsed = useEditorSelector(
    (editor) => !editor.api.isExpanded(),
    [],
  );
  const isImagePreviewOpen = useImagePreviewValue('isOpen', editor.id);
  const open =
    isFocusedLast &&
    !readOnly &&
    selected &&
    selectionCollapsed &&
    !isImagePreviewOpen;
  const isEditing = useFloatingMediaValue('isEditing');
  const t = useTranslations('ui.plate');

  // biome-ignore lint/correctness/useExhaustiveDependencies: off
  React.useEffect(() => {
    if (!open && isEditing) {
      FloatingMediaStore.set('isEditing', false);
    }
  }, [open]);

  const element = useElement();
  const { props: buttonProps } = useRemoveNodeButton({ element });

  return (
    <Popover open={open} modal={false}>
      <PopoverAnchor>{children}</PopoverAnchor>

      <PopoverContent
        className='w-auto p-1'
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {isEditing ? (
          <div className='flex w-[330px] flex-col'>
            <div className='flex items-center'>
              <div className='flex items-center pr-1 pl-2 text-muted-foreground'>
                <Link className='size-4' />
              </div>

              <FloatingMediaPrimitive.UrlInput
                className={inputVariants()}
                placeholder={t('pasteEmbedLink')}
                options={{ plugin }}
              />
            </div>
          </div>
        ) : (
          <div className='box-content flex items-center'>
            {/* Media with fileId is uploaded to S3 and should not have an explicit URL set */}
            {!element?.fileId && (
              <FloatingMediaPrimitive.EditButton
                className={buttonVariants({ size: 'sm', variant: 'ghost' })}
              >
                {t('editLink')}
              </FloatingMediaPrimitive.EditButton>
            )}

            <CaptionButton size='sm' variant='ghost'>
              {t('caption')}
            </CaptionButton>

            <Separator orientation='vertical' className='mx-1 h-6' />

            <Button size='sm' variant='ghost' {...buttonProps}>
              <Trash2Icon />
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export { MediaToolbar };
