import type * as CSS from 'csstype';
import type { SlateElementProps } from 'platejs';
import { SlateElement } from 'platejs';
import { cx } from '@/lib/utils/index';

export function CalloutElementStatic({
  children,
  className,
  ...props
}: SlateElementProps & {
  element: {
    backgroundColor: CSS.Property.BackgroundColor;
    icon: React.ReactNode;
  };
}) {
  return (
    <SlateElement
      className={cx('my-1 flex rounded-sm bg-muted p-4 pl-3', className)}
      style={{
        backgroundColor: props.element.backgroundColor,
      }}
      {...props}
    >
      <div className='flex w-full gap-2 rounded-md'>
        <div
          className='size-6 select-none text-[18px]'
          style={{
            fontFamily:
              '"Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", EmojiSymbols',
          }}
        >
          <span data-plate-prevent-deserialization>
            {props.element.icon || '💡'}
          </span>
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </SlateElement>
  );
}
