'use client';

import { AIChatPlugin } from '@platejs/ai/react';
import {
  PlateElement,
  type PlateElementProps,
  PlateText,
  type PlateTextProps,
  usePluginOption,
} from 'platejs/react';

import { cx } from '@/lib/utils/index';

export function AILeaf(props: PlateTextProps) {
  const streaming = usePluginOption(AIChatPlugin, 'streaming');
  const streamingLeaf = props.editor
    .getApi(AIChatPlugin)
    .aiChat.node({ streaming: true });

  const isLast = streamingLeaf?.[0] === props.text;

  return (
    <PlateText
      className={cx(
        'border-b-2 border-b-purple-100 bg-purple-50 text-purple-800',
        'transition-all duration-200 ease-in-out',
        isLast &&
          streaming &&
          'after:ml-1.5 after:inline-block after:h-3 after:w-3 after:rounded-full after:bg-primary after:align-middle after:content-[""]',
      )}
      {...props}
    />
  );
}

export function AIAnchorElement(props: PlateElementProps) {
  return (
    <PlateElement {...props}>
      <div className='h-[0.1px]' />
    </PlateElement>
  );
}
