import { cx } from '@/lib/utils';

type MainProps = {
  children?: React.ReactNode;
  mainClassName?: string;
  className?: string;
};

function Main({ children, mainClassName, className }: MainProps) {
  return (
    <main className={cx('flex w-full flex-grow justify-center', mainClassName)}>
      <div
        className={cx(
          'h-full w-full max-w-screen-2xl px-4 duration-1000 animate-in fade-in max-md:slide-in-from-left-8 sm:px-11 md:px-16 md:slide-in-from-top-8 lg:px-24',
          className,
        )}
      >
        {children}
      </div>
    </main>
  );
}

export { Main };
