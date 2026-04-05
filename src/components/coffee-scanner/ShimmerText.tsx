'use client';

import { cx } from '@/lib/utils';

type ShimmerParams = {
  text: string;
  textColor: string;
  gradientColor: string;
  highlightColor: string;
  className?: string;
};

function ShimmerText({
  text,
  textColor,
  gradientColor,
  highlightColor,
  className,
}: ShimmerParams) {
  return (
    <span
      className={cx('relative inline-block', className)}
      style={{ color: textColor }}
    >
      {text}
      <span
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 animate-shimmer bg-[length:200%_100%] bg-clip-text text-transparent'
        style={{
          backgroundImage: `linear-gradient(110deg, transparent 42%, ${gradientColor}cc 45%, ${highlightColor}cc 50%, ${gradientColor}cc 55%, transparent 58%)`,
        }}
      >
        {text}
      </span>
    </span>
  );
}

export { ShimmerText };
