'use client';

import {
  BLOCK_CONTEXT_MENU_ID,
  BlockMenuPlugin,
  BlockSelectionPlugin,
} from '@platejs/selection/react';
import { useTranslations } from 'next-intl';
import { KEYS } from 'platejs';
import { useEditorPlugin, usePlateState } from 'platejs/react';
import { useCallback } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/ContextMenu';
import { useIsTouchDevice } from '@/lib/hooks/useIsTouchDevice';

function BlockContextMenu({ children }: { children: React.ReactNode }) {
  const { api, editor } = useEditorPlugin(BlockMenuPlugin);
  const isTouch = useIsTouchDevice();
  const [readOnly] = usePlateState('readOnly');
  const t = useTranslations('ui');

  const handleTurnInto = useCallback(
    (type: string) => {
      editor
        .getApi(BlockSelectionPlugin)
        .blockSelection.getNodes()
        .forEach(([node, path]) => {
          if (node[KEYS.listType]) {
            editor.tf.unsetNodes([KEYS.listType, 'indent'], {
              at: path,
            });
          }

          editor.tf.toggleBlock(type, { at: path });
        });
    },
    [editor],
  );

  const handleAlign = useCallback(
    (align: 'center' | 'left' | 'right') => {
      editor
        .getTransforms(BlockSelectionPlugin)
        .blockSelection.setNodes({ align });
    },
    [editor],
  );

  if (isTouch) {
    return children;
  }

  return (
    <ContextMenu
      onOpenChange={(open) => {
        if (!open) {
          // prevent unselect the block selection
          setTimeout(() => {
            api.blockMenu.hide();
          }, 0);
        }
      }}
      modal={false}
    >
      <ContextMenuTrigger
        asChild
        onContextMenu={(event) => {
          const dataset = (event.target as HTMLElement).dataset;
          const disabled =
            dataset?.slateEditor === 'true' ||
            readOnly ||
            dataset?.plateOpenContextMenu === 'false';

          if (disabled) return event.preventDefault();

          api.blockMenu.show(BLOCK_CONTEXT_MENU_ID, {
            x: event.clientX,
            y: event.clientY,
          });
        }}
      >
        <div className='w-full'>{children}</div>
      </ContextMenuTrigger>
      <ContextMenuContent
        className='w-64'
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          editor.getApi(BlockSelectionPlugin).blockSelection.focus();
        }}
      >
        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() => {
              editor
                .getTransforms(BlockSelectionPlugin)
                .blockSelection.removeNodes();
              editor.tf.focus();
            }}
          >
            {t('delete')}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor
                .getTransforms(BlockSelectionPlugin)
                .blockSelection.duplicate();
            }}
          >
            {t('duplicate')}
            {/* <ContextMenuShortcut>⌘ + D</ContextMenuShortcut> */}
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>{t('plate.turnInto')}</ContextMenuSubTrigger>
            <ContextMenuSubContent className='w-48'>
              <ContextMenuItem onClick={() => handleTurnInto(KEYS.p)}>
                {t('plate.paragraph')}
              </ContextMenuItem>

              <ContextMenuItem onClick={() => handleTurnInto(KEYS.h1)}>
                {t('plate.heading1')}
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleTurnInto(KEYS.h2)}>
                {t('plate.heading2')}
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleTurnInto(KEYS.h3)}>
                {t('plate.heading3')}
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleTurnInto(KEYS.blockquote)}>
                {t('plate.blockquote')}
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>

        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() =>
              editor
                .getTransforms(BlockSelectionPlugin)
                .blockSelection.setIndent(1)
            }
          >
            {t('plate.indent')}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() =>
              editor
                .getTransforms(BlockSelectionPlugin)
                .blockSelection.setIndent(-1)
            }
          >
            {t('plate.outdent')}
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>{t('plate.align')}</ContextMenuSubTrigger>
            <ContextMenuSubContent className='w-48'>
              <ContextMenuItem onClick={() => handleAlign('left')}>
                {t('plate.left')}
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleAlign('center')}>
                {t('plate.center')}
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleAlign('right')}>
                {t('plate.right')}
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export { BlockContextMenu };
