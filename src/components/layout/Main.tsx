import { cx } from '@/lib/utils';

function Main({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className={cx(
        '~px-4/24 mx-auto w-full max-w-screen-2xl flex-grow py-6',
        className,
      )}
      {...props}
    />
  );
}

export { Main };
