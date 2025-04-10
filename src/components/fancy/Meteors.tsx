'use client';

import { cx } from '@/lib/utils';
import { m } from 'framer-motion';

function Meteors({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) {
  const meteors = new Array(number || 20).fill(true);
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteors.map((_, idx) => {
        const meteorCount = number || 20;
        // Calculate position to evenly distribute meteors across container width
        const position = idx * (800 / meteorCount) - 400; // Spread across 800px range, centered

        const meteorKey = `meteor-${position}-${idx}`;
        return (
          <span
            key={meteorKey}
            className={cx(
              'absolute h-0.5 w-0.5 rotate-[45deg] animate-meteor-effect rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]',
              'before:-translate-y-[50%] before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-[""]',
              className,
            )}
            style={{
              top: '-40px',
              left: `${position}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.floor(Math.random() * (10 - 5) + 5)}s`,
            }}
          />
        );
      })}
    </m.div>
  );
}

export { Meteors };
