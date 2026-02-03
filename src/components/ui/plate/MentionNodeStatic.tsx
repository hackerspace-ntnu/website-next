import type { TMentionElement } from 'platejs';
import { KEYS } from 'platejs';
import type { SlateElementProps } from 'platejs/static';
import { SlateElement } from 'platejs/static';
import { Fragment } from 'react';
import { cx } from '@/lib/utils/index';

function MentionElementStatic(
  props: SlateElementProps<TMentionElement> & {
    prefix?: string;
  },
) {
  const { prefix } = props;
  const element = props.element;

  return (
    <SlateElement
      {...props}
      className={cx(
        'inline-block rounded-md bg-muted px-1.5 py-0.5 align-baseline font-medium text-sm',
        element.children[0]?.[KEYS.bold] === true && 'font-bold',
        element.children[0]?.[KEYS.italic] === true && 'italic',
        element.children[0]?.[KEYS.underline] === true && 'underline',
      )}
      attributes={{
        ...props.attributes,
        'data-slate-value': element.value,
      }}
    >
      <Fragment>
        {props.children}
        {prefix}
        {element.value}
      </Fragment>
    </SlateElement>
  );
}

export { MentionElementStatic };
