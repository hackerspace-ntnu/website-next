import Image from 'next/image';
import type {
  SlateElementProps,
  TCaptionProps,
  TImageElement,
  TResizableProps,
} from 'platejs';
import { NodeApi, SlateElement } from 'platejs';
import { cx } from '@/lib/utils/index';

export function ImageElementStatic(
  props: SlateElementProps<TImageElement & TCaptionProps & TResizableProps>,
) {
  const { align = 'center', caption, url, width } = props.element;

  return (
    <SlateElement {...props} className='py-2.5'>
      <figure className='group relative m-0 inline-block' style={{ width }}>
        <div
          className='relative min-w-[92px] max-w-full'
          style={{ textAlign: align }}
        >
          <Image
            className={cx(
              'w-full max-w-full cursor-default object-cover px-0',
              'rounded-sm',
            )}
            alt={props.attributes.alt as string}
            src={url}
          />
          {caption && (
            <figcaption className='mx-auto mt-2 h-[24px] max-w-full'>
              {caption[0] && NodeApi.string(caption[0])}
            </figcaption>
          )}
        </div>
      </figure>
      {props.children}
    </SlateElement>
  );
}
