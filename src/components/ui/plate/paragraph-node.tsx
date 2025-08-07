'use client';

import type { PlateElementProps } from 'platejs/react';
import { PlateElement } from 'platejs/react';
import { cx } from '@/lib/utils/index';

export function ParagraphElement(props: PlateElementProps) {
  return (
    <PlateElement {...props} className={cx('m-0 px-0 py-1')}>
      {props.children}
    </PlateElement>
  );
}
