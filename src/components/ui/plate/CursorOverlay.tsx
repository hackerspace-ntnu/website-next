'use client';

import {
  type CursorData,
  type CursorOverlayState,
  useCursorOverlay,
} from '@platejs/selection/react';
import { RangeApi } from 'platejs';
import { cx } from '@/lib/utils';

function CursorOverlay() {
  const { cursors } = useCursorOverlay();

  return (
    <>
      {cursors.map((cursor) => (
        <Cursor key={cursor.id} {...cursor} />
      ))}
    </>
  );
}

function Cursor({
  id,
  caretPosition,
  data,
  selection,
  selectionRects,
}: CursorOverlayState<CursorData>) {
  // const streaming = usePluginOption(AIChatPlugin, 'streaming');
  const streaming = false;
  const { style, selectionStyle = style } = data ?? ({} as CursorData);
  const isCursor = RangeApi.isCollapsed(selection);

  if (streaming) return null;

  return (
    <>
      {selectionRects.map((position, i) => {
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Selection rects aren't identifiable
            key={i}
            className={cx(
              'pointer-events-none absolute z-10',
              id === 'selection' && 'bg-brand/25',
              id === 'selection' && isCursor && 'bg-primary',
            )}
            style={{
              ...selectionStyle,
              ...position,
            }}
          />
        );
      })}
      {caretPosition && (
        <div
          className={cx(
            'pointer-events-none absolute z-10 w-0.5',
            id === 'drag' && 'w-px bg-brand',
          )}
          style={{ ...caretPosition, ...style }}
        />
      )}
    </>
  );
}

export { CursorOverlay };
