'use client';

import { PlateLeaf, type PlateLeafProps } from 'platejs/react';

function HighlightLeaf(props: PlateLeafProps) {
  return (
    <PlateLeaf {...props} as='mark' className='bg-highlight/30 text-inherit'>
      {props.children}
    </PlateLeaf>
  );
}

export { HighlightLeaf };
