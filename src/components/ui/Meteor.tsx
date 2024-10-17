import { cx } from '@/lib/utils';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const Meteors = ({
  number,
  className,
  hoverDelay,
}: {
  number?: number;
  className?: string;
  hoverDelay?: string;
}) => {
  const meteors = new Array(number || 20).fill(null).map(() => uuidv4());

  return (
    <>
      {meteors.map((id) => (
        <span
          key={id} // Use unique ID as key
          className={cx(
            'animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
            'before:content-[""] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent',
            className,
            'transition-all duration-1000',
          )}
          style={{
            top: `${Math.random() * 100}px`,
            left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
            animationDelay: hoverDelay,
            animationDuration: `${Math.floor(Math.random() * 4 + 6)}s`,
            opacity: 0,
          }}
        />
      ))}
    </>
  );
};