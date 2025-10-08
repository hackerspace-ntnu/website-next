'use client';

import { getMentionOnSelectItem } from '@platejs/mention';
import { useTranslations } from 'next-intl';
import type { TComboboxInputElement, TMentionElement } from 'platejs';
import { IS_APPLE, KEYS } from 'platejs';
import type { PlateElementProps } from 'platejs/react';
import {
  PlateElement,
  useFocused,
  useReadOnly,
  useSelected,
} from 'platejs/react';
import * as React from 'react';
import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxInput,
  InlineComboboxItem,
} from '@/components/ui/plate/InlineCombobox';
import { api } from '@/lib/api/client';
import { useDebounceCallback } from '@/lib/hooks/useDebounceCallback';
import { useMounted } from '@/lib/hooks/useMounted';
import { cx } from '@/lib/utils/index';

function MentionElement(
  props: PlateElementProps<TMentionElement> & {
    prefix?: string;
  },
) {
  const element = props.element;

  const selected = useSelected();
  const focused = useFocused();
  const mounted = useMounted();
  const readOnly = useReadOnly();

  return (
    <PlateElement
      {...props}
      className={cx(
        'inline-block rounded-md bg-muted px-1.5 py-0.5 align-baseline font-medium text-sm',
        !readOnly && 'cursor-pointer',
        selected && focused && 'ring-2 ring-ring',
        element.children[0]?.[KEYS.bold] === true && 'font-bold',
        element.children[0]?.[KEYS.italic] === true && 'italic',
        element.children[0]?.[KEYS.underline] === true && 'underline',
      )}
      attributes={{
        ...props.attributes,
        contentEditable: false,
        'data-slate-value': element.value,
        draggable: true,
      }}
    >
      {mounted && IS_APPLE ? (
        // Mac OS IME https://github.com/ianstormtaylor/slate/issues/3490
        <React.Fragment>
          {props.children}
          {props.prefix}
          {element.value}
        </React.Fragment>
      ) : (
        // Others like Android https://github.com/ianstormtaylor/slate/pull/5360
        <React.Fragment>
          {props.prefix}
          {element.value}
          {props.children}
        </React.Fragment>
      )}
    </PlateElement>
  );
}

const onSelectItem = getMentionOnSelectItem();

function MentionInputElement(props: PlateElementProps<TComboboxInputElement>) {
  const { editor, element } = props;
  const [search, setSearch] = React.useState('');
  const debouncedSetSearch = useDebounceCallback(setSearch, 500);
  const t = useTranslations('ui');
  const user = api.auth.state.useQuery().data?.user;
  const users = api.users.searchMembers.useQuery(
    {
      name: search,
      limit: 2,
    },
    {
      enabled: !!user?.groups.some((group) =>
        ['labops', 'leadership', 'admin'].includes(group),
      ),
    },
  );

  return (
    <PlateElement {...props} as='span'>
      <InlineCombobox
        value={search}
        element={element}
        setValue={debouncedSetSearch}
        showTrigger={false}
        trigger='@'
      >
        <span className='inline-block rounded-md bg-muted px-1.5 py-0.5 align-baseline text-sm ring-ring focus-within:ring-2'>
          <InlineComboboxInput />
        </span>

        <InlineComboboxContent className='my-1.5'>
          <InlineComboboxEmpty>{t('noResults')}</InlineComboboxEmpty>

          <InlineComboboxGroup>
            {users.data
              ?.map((user) => ({
                id: user.id,
                text: `${user.firstName} ${user.lastName}`,
              }))
              .map((user) => (
                <InlineComboboxItem
                  key={user.id}
                  value={user.text}
                  onClick={() => onSelectItem(editor, user, search)}
                >
                  {user.text}
                </InlineComboboxItem>
              ))}
          </InlineComboboxGroup>
        </InlineComboboxContent>
      </InlineCombobox>

      {props.children}
    </PlateElement>
  );
}

export { MentionElement, MentionInputElement };
