import { type ReactNode } from 'react';

import { cx } from '@/lib/utils';

type Props = {
  children?: ReactNode;
  mainClassName?: string;
  className?: string;
};

function Main({ children, mainClassName, className }: Props) {
  return (
    <main
      className={cx('flex h-full w-full flex-1 justify-center', mainClassName)}
    >
      <div
        className={cx(
          'h-full w-full max-w-screen-2xl px-4 sm:px-11 md:px-16 lg:px-24',
          className,
        )}
      >
        {children}
      </div>
    </main>
  );
}

export { Main };
