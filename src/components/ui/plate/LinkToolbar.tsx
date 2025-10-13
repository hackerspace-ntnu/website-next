'use client';

import {
  flip,
  offset,
  type UseVirtualFloatingOptions,
} from '@platejs/floating';
import { getLinkAttributes } from '@platejs/link';
import {
  FloatingLinkUrlInput,
  type LinkFloatingToolbarState,
  useFloatingLinkEdit,
  useFloatingLinkEditState,
  useFloatingLinkInsert,
  useFloatingLinkInsertState,
} from '@platejs/link/react';
import { cva } from 'cva';
import { ExternalLink, Link, Text, Unlink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { TLinkElement } from 'platejs';
import { KEYS } from 'platejs';
import {
  useEditorRef,
  useEditorSelection,
  useFormInputProps,
  usePluginOption,
} from 'platejs/react';
import { useMemo } from 'react';
import { buttonVariants } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';

const popoverVariants = cva({
  base: 'z-50 w-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-hidden',
});

const inputVariants = cva({
  base: 'flex h-[28px] w-full rounded-md border-none bg-transparent px-1.5 py-1 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-transparent md:text-sm',
});

function LinkFloatingToolbar({ state }: { state?: LinkFloatingToolbarState }) {
  const activeCommentId = usePluginOption({ key: KEYS.comment }, 'activeId');
  const activeSuggestionId = usePluginOption(
    { key: KEYS.suggestion },
    'activeId',
  );

  const floatingOptions: UseVirtualFloatingOptions = useMemo(() => {
    return {
      middleware: [
        offset(8),
        flip({
          fallbackPlacements: ['bottom-end', 'top-start', 'top-end'],
          padding: 12,
        }),
      ],
      placement:
        activeSuggestionId || activeCommentId ? 'top-start' : 'bottom-start',
    };
  }, [activeCommentId, activeSuggestionId]);

  const insertState = useFloatingLinkInsertState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  });
  const {
    hidden,
    props: insertProps,
    ref: insertRef,
    textInputProps,
  } = useFloatingLinkInsert(insertState);

  const editState = useFloatingLinkEditState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  });
  const {
    editButtonProps,
    props: editProps,
    ref: editRef,
    unlinkButtonProps,
  } = useFloatingLinkEdit(editState);
  const inputProps = useFormInputProps({
    preventDefaultOnEnterKeydown: true,
  });

  const t = useTranslations('ui.plate');

  if (hidden) return null;

  const input = (
    <div className='flex w-[330px] flex-col' {...inputProps}>
      <div className='flex items-center'>
        <div className='flex items-center pr-1 pl-2 text-muted-foreground'>
          <Link className='size-4' />
        </div>

        <FloatingLinkUrlInput
          className={inputVariants()}
          placeholder={t('pasteLink')}
          data-plate-focus
        />
      </div>
      <Separator className='my-1' />
      <div className='flex items-center'>
        <div className='flex items-center pr-1 pl-2 text-muted-foreground'>
          <Text className='size-4' />
        </div>
        <input
          className={inputVariants()}
          placeholder={t('textToDisplay')}
          data-plate-focus
          {...textInputProps}
        />
      </div>
    </div>
  );

  const editContent = editState.isEditing ? (
    input
  ) : (
    <div className='box-content flex items-center'>
      <button
        className={buttonVariants({ size: 'sm', variant: 'ghost' })}
        type='button'
        {...editButtonProps}
      >
        {t('editLink')}
      </button>

      <Separator orientation='vertical' />

      <LinkOpenButton />

      <Separator orientation='vertical' />

      <button
        className={buttonVariants({
          size: 'sm',
          variant: 'ghost',
        })}
        type='button'
        {...unlinkButtonProps}
      >
        <Unlink width={18} />
      </button>
    </div>
  );

  return (
    <>
      <div ref={insertRef} className={popoverVariants()} {...insertProps}>
        {input}
      </div>

      <div ref={editRef} className={popoverVariants()} {...editProps}>
        {editContent}
      </div>
    </>
  );
}

function LinkOpenButton() {
  const editor = useEditorRef();
  const selection = useEditorSelection();

  // biome-ignore lint/correctness/useExhaustiveDependencies: off
  const attributes = useMemo(() => {
    const entry = editor.api.node<TLinkElement>({
      match: { type: editor.getType(KEYS.link) },
    });
    if (!entry) {
      return {};
    }
    const [element] = entry;
    return getLinkAttributes(editor, element);
  }, [editor, selection]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Side effects only
    // biome-ignore lint/a11y/useKeyWithMouseEvents: Not tabbable by design
    <a
      {...attributes}
      className={buttonVariants({
        size: 'sm',
        variant: 'ghost',
      })}
      onMouseOver={(e) => {
        e.stopPropagation();
      }}
      target='_blank'
    >
      <ExternalLink width={18} />
    </a>
  );
}

export { LinkFloatingToolbar };
