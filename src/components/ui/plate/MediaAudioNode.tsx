'use client';

import { useMediaState } from '@platejs/media/react';
import { ResizableProvider } from '@platejs/resizable';
import type { TAudioElement } from 'platejs';
import type { PlateElementProps } from 'platejs/react';
import { PlateElement, withHOC } from 'platejs/react';
import { Caption, CaptionTextarea } from './Caption';

const AudioElement = withHOC(
  ResizableProvider,
  function AudioElement(props: PlateElementProps<TAudioElement>) {
    const { align = 'center', readOnly, unsafeUrl } = useMediaState();

    return (
      <PlateElement {...props} className='mb-1'>
        <figure
          className='group relative cursor-default'
          contentEditable={false}
        >
          <div className='h-16'>
            {/** biome-ignore lint/a11y/useMediaCaption: Captions unavailable */}
            <audio className='size-full' src={unsafeUrl} controls />
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
