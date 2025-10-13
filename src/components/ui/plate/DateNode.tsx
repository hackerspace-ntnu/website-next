'use client';

import { useTranslations } from 'next-intl';
import type { TDateElement } from 'platejs';
import type { PlateElementProps } from 'platejs/react';
import { PlateElement, useReadOnly } from 'platejs/react';
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { cx } from '@/lib/utils/index';

function DateElement(props: PlateElementProps<TDateElement>) {
  const { editor, element } = props;

  const readOnly = useReadOnly();
  const t = useTranslations('ui');

  const trigger = (
    <span
      className={cx(
        'w-fit cursor-pointer rounded-sm bg-muted px-1 text-muted-foreground',
      )}
      contentEditable={false}
      draggable
    >
      {element.date ? (
        (() => {
          const today = new Date();
          const elementDate = new Date(element.date);
          const isToday =
            elementDate.getDate() === today.getDate() &&
            elementDate.getMonth() === today.getMonth() &&
            elementDate.getFullYear() === today.getFullYear();

          const isYesterday =
            new Date(today.setDate(today.getDate() - 1)).toDateString() ===
            elementDate.toDateString();
          const isTomorrow =
            new Date(today.setDate(today.getDate() + 2)).toDateString() ===
            elementDate.toDateString();

          if (isToday) return t('today');
          if (isYesterday) return t('yesterday');
          if (isTomorrow) return t('tomorrow');

          return elementDate.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });
        })()
      ) : (
        <span>{t('pickDate')}</span>
      )}
    </span>
  );

  if (readOnly) {
    return trigger;
  }

  return (
    <PlateElement
      {...props}
      className='inline-block'
      attributes={{
        ...props.attributes,
        contentEditable: false,
      }}
    >
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            selected={new Date(element.date as string)}
            onSelect={(date) => {
              if (!date) return;

              editor.tf.setNodes(
                { date: date.toDateString() },
                { at: element },
              );
            }}
            mode='single'
            autoFocus
          />
        </PopoverContent>
      </Popover>
      {props.children}
    </PlateElement>
  );
}

export { DateElement };
