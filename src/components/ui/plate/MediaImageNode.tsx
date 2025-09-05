'use client';

import { useDraggable } from '@platejs/dnd';
import { Image, ImagePlugin, useMediaState } from '@platejs/media/react';
import { ResizableProvider, useResizableValue } from '@platejs/resizable';
import { useTranslations } from 'next-intl';
import type { TImageElement } from 'platejs';
import type { PlateElementProps } from 'platejs/react';
import { PlateElement, withHOC } from 'platejs/react';
import { Caption, CaptionTextarea } from '@/components/ui/plate/Caption';
import { MediaToolbar } from '@/components/ui/plate/MediaToolbar';
import {
  mediaResizeHandleVariants,
  Resizable,
  ResizeHandle,
} from '@/components/ui/plate/ResizeHandle';
import { api } from '@/lib/api/client';
import { cx } from '@/lib/utils/index';

const ImageElement = withHOC(
  ResizableProvider,
  function ImageElement(props: PlateElementProps<TImageElement>) {
    const { align = 'center', focused, readOnly, selected } = useMediaState();
    const width = useResizableValue('width');
    const t = useTranslations('ui.plate');

    // Elements with a custom fileId need to fetch their S3 URL
    const url = api.utils.getFileUrl.useQuery(
      {
        fileId: Number(props.element.fileId as string),
      },
      {
        enabled: !!props.element.fileId,
      },
    );

    const { isDragging, handleRef } = useDraggable({
      element: url ? { ...props.element, url: url.data } : props.element,
    });

    return (
      <MediaToolbar plugin={ImagePlugin}>
        <PlateElement {...props} className='py-2.5'>
          <figure className='group relative m-0' contentEditable={false}>
            <Resizable
              align={align}
              options={{
                align,
                readOnly,
              }}
            >
              <ResizeHandle
                className={mediaResizeHandleVariants({ direction: 'left' })}
                options={{ direction: 'left' }}
              />
              <Image
                ref={handleRef}
                className={cx(
                  'block w-full max-w-full cursor-pointer object-cover px-0',
                  'rounded-sm',
                  focused && selected && 'ring-2 ring-ring ring-offset-2',
                  isDragging && 'opacity-50',
                )}
                alt={props.attributes.alt as string | undefined}
                src={props.element.fileId ? url.data : props.element.url}
              />
              <ResizeHandle
                className={mediaResizeHandleVariants({
                  direction: 'right',
                })}
                options={{ direction: 'right' }}
              />
            </Resizable>

            <Caption style={{ width }} align={align}>
              <CaptionTextarea
                readOnly={readOnly}
                onFocus={(e) => {
                  e.preventDefault();
                }}
                placeholder={t('writeACaption')}
              />
            </Caption>
          </figure>

          {props.children}
        </PlateElement>
      </MediaToolbar>
    );
  },
);

export { ImageElement };
