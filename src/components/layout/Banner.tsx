'use client';

import { usePathname } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';

function Banner() {
  const path = usePathname();
  return (
    <div className='-mb-4 relative mt-4'>
      <div
        className={cx(
          'w-screen bg-yellow-300 text-center text-black',
          path === '/' && 'absolute z-10',
        )}
      >
        test test
      </div>
    </div>
  );
}

export { Banner };
