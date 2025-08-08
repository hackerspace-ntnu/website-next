import { getLinkAttributes } from '@platejs/link';
import type { SlateElementProps, TLinkElement } from 'platejs';
import { SlateElement } from 'platejs';

function LinkElementStatic(props: SlateElementProps<TLinkElement>) {
  return (
    <SlateElement
      {...props}
      as='a'
      className='font-medium text-primary underline decoration-primary underline-offset-4'
      attributes={{
        ...props.attributes,
        ...getLinkAttributes(props.editor, props.element),
      }}
    >
      {props.children}
    </SlateElement>
  );
}

export { LinkElementStatic };
