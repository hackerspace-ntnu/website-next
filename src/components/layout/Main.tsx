import { cx } from '@/lib/utils';

type MainProps = {
  children: React.ReactNode;
  className?: string;
};

function Main({ children, className }: MainProps) {
  return (
    <main
      className={cx(
        '~px-4/24 mx-auto my-6 w-full max-w-screen-2xl flex-grow',
        className,
      )}
    >
      {children}
    </main>
  );
}

export { Main };
