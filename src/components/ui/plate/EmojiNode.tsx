'use client';

import { EmojiInlineIndexSearch, insertEmoji } from '@platejs/emoji';
import { EmojiPlugin } from '@platejs/emoji/react';
import { useTranslations } from 'next-intl';
import type { PlateElementProps } from 'platejs/react';
import { PlateElement, usePluginOption } from 'platejs/react';
import { useMemo, useState } from 'react';
import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxInput,
  InlineComboboxItem,
} from '@/components/ui/plate/InlineCombobox';
import { useDebounceCallback } from '@/lib/hooks/useDebounceCallback';

function EmojiInputElement(props: PlateElementProps) {
  const { children, editor, element } = props;
  const data = usePluginOption(EmojiPlugin, 'data');
  const [value, setValue] = useState('');
  const debouncedSetValue = useDebounceCallback(setValue, 100);
  const t = useTranslations('ui');

  const filteredEmojis = useMemo(() => {
    if (value.trim().length === 0) return [];

    return EmojiInlineIndexSearch.getInstance(data)
      .search(value.replace(/:$/, ''))
      .get();
  }, [data, value]);

  return (
    <PlateElement as='span' {...props}>
      <InlineCombobox
        value={value}
        element={element}
        filter={false}
        setValue={debouncedSetValue}
        trigger=':'
        hideWhenNoValue
      >
        <InlineComboboxInput />

        <InlineComboboxContent>
          <InlineComboboxEmpty>{t('noResults')}</InlineComboboxEmpty>

          <InlineComboboxGroup>
            {filteredEmojis.map((emoji) => (
              <InlineComboboxItem
                key={emoji.id}
                value={emoji.name}
                onClick={() => insertEmoji(editor, emoji)}
              >
                {emoji.skins[0]?.native} {emoji.name}
              </InlineComboboxItem>
            ))}
          </InlineComboboxGroup>
        </InlineComboboxContent>
      </InlineCombobox>

      {children}
    </PlateElement>
  );
}

export { EmojiInputElement };
