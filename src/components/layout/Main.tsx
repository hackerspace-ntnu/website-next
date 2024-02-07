import { cx } from '@/lib/utils';

type MainProps = {
  children?: React.ReactNode;
  className?: string;
};

function Main({ children, className }: MainProps) {
  return (
    <main
      className={cx(
        'mx-auto w-full max-w-screen-2xl flex-grow px-4 duration-1000 animate-in fade-in max-md:slide-in-from-left-8 sm:px-11 md:px-16 md:slide-in-from-top-8 lg:px-24',
        className,
      )}
    >
      {children}
    </main>
  );
}

export { Main };
