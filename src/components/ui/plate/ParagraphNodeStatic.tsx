import type { SlateElementProps } from 'platejs';
import { SlateElement } from 'platejs';
import { cx } from '@/lib/utils/index';

function ParagraphElementStatic(props: SlateElementProps) {
  return (
    <SlateElement {...props} className={cx('m-0 px-0 py-1')}>
      {props.children}
    </SlateElement>
  );
}

export { ParagraphElementStatic };
