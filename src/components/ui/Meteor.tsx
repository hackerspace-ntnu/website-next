import { cx } from '@/lib/utils';
import React from 'react';
import { useId } from 'react';

export const Meteors = ({
  number,
  className,
  hoverDelay,
}: {
  number?: number;
  className?: string;
  hoverDelay?: string;
}) => {
  const meteors = new Array(number || 20).fill(null).map(() => useId());

  return (
    <>
      {meteors.map((id) => (
        <span
          key={id} // Use unique ID as key
          className={cx(
            'absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor-effect rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]',
            'before:-translate-y-[50%] before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-[""]',
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
