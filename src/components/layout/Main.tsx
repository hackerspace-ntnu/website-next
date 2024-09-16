import { cx } from '@/lib/utils';

type MainProps = {
  children: React.ReactNode;
  className?: string;
};

function Main({ children, className }: MainProps) {
  return (
    <main
      className={cx(
        'mx-auto w-full max-w-screen-2xl flex-grow ~px-4/24',
        className,
      )}
    >
      {children}
    </main>
  );
}

export { Main };
