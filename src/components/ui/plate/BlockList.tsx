'use client';

import { isOrderedList } from '@platejs/list';
import {
  useTodoListElement,
  useTodoListElementState,
} from '@platejs/list/react';
import type { TListElement } from 'platejs';
import {
  type PlateElementProps,
  type RenderNodeWrapper,
  useReadOnly,
} from 'platejs/react';
import type React from 'react';

import { Checkbox } from '@/components/ui/Checkbox';
import { cx } from '@/lib/utils/index';

const config: Record<
  string,
  {
    Li: React.FC<PlateElementProps>;
    Marker: React.FC<PlateElementProps>;
  }
> = {
  todo: {
    Li: TodoLi,
    Marker: TodoMarker,
  },
};

const BlockList: RenderNodeWrapper = (props) => {
  if (!props.element.listStyleType) return;

  return (props) => <List {...props} />;
};

function List(props: PlateElementProps) {
  const { listStart, listStyleType } = props.element as TListElement;
  const { Li, Marker } = config[listStyleType] ?? {};
  const List = isOrderedList(props.element) ? 'ol' : 'ul';

  return (
    <List
      className='relative m-0 p-0'
      style={{ listStyleType }}
      start={listStart}
    >
      {Marker && <Marker {...props} />}
      {Li ? <Li {...props} /> : <li>{props.children}</li>}
    </List>
  );
}

function TodoMarker(props: PlateElementProps) {
  const state = useTodoListElementState({ element: props.element });
  const { checkboxProps } = useTodoListElement(state);
  const readOnly = useReadOnly();

  return (
    <div contentEditable={false}>
      <Checkbox
        className={cx(
          '-left-6 absolute top-1',
          readOnly && 'pointer-events-none',
        )}
        {...checkboxProps}
      />
    </div>
  );
}

function TodoLi(props: PlateElementProps) {
  return (
    <li
      className={cx(
        'list-none',
        (props.element.checked as boolean) &&
          'text-muted-foreground line-through',
      )}
    >
      {props.children}
    </li>
  );
}

export { BlockList };
