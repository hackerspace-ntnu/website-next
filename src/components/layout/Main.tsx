import { cx } from '@/lib/utils';

type MainProps = {
  children?: React.ReactNode;
  className?: string;
};

function Main({ children, className }: MainProps) {
  return (
    <main
      className={cx(
        'fade-in max-md:slide-in-from-left-8 md:slide-in-from-top-8 mx-auto w-full max-w-screen-2xl flex-grow animate-in px-4 duration-1000 sm:px-11 md:px-16 lg:px-24',
        className,
      )}
    >
      {children}
    </main>
  );
}

export { Main };
