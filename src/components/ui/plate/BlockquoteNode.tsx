'use client';

import { PlateElement, type PlateElementProps } from 'platejs/react';

function BlockquoteElement(props: PlateElementProps) {
  return (
    <PlateElement
      as='blockquote'
      className='my-1 border-l-2 pl-6 italic'
      {...props}
    />
  );
}

export { BlockquoteElement };
