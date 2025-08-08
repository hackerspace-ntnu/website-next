'use client';

import { useMediaState } from '@platejs/media/react';
import { ResizableProvider } from '@platejs/resizable';
import type { TAudioElement } from 'platejs';
import type { PlateElementProps } from 'platejs/react';
import { PlateElement, withHOC } from 'platejs/react';
import { Caption, CaptionTextarea } from '@/components/ui/plate/Caption';
import { api } from '@/lib/api/client';

const AudioElement = withHOC(
  ResizableProvider,
  function AudioElement(props: PlateElementProps<TAudioElement>) {
    const { align = 'center', readOnly, unsafeUrl } = useMediaState();

    const url = api.utils.getFileUrl.useQuery(
      { fileId: Number(props.element.fileId as string) },
      { enabled: !!props.element.fileId },
    );

    return (
      <PlateElement {...props} className='mb-1'>
        <figure
          className='group relative cursor-default'
          contentEditable={false}
        >
          <div className='h-16'>
            {/** biome-ignore lint/a11y/useMediaCaption: Captions unavailable */}
            <audio className='size-full' src={url.data ?? unsafeUrl} controls />
          </div>

          <Caption style={{ width: '100%' }} align={align}>
            <CaptionTextarea
              className='h-20'
              readOnly={readOnly}
              placeholder='Write a caption...'
            />
          </Caption>
        </figure>
        {props.children}
      </PlateElement>
    );
  },
);

export { AudioElement };
