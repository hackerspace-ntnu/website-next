import { cx } from '@/lib/utils';

function Main({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className={cx(
        'clamp-[px-6-24-clamp] mx-auto w-screen max-w-screen-2xl grow py-6',
        className,
      )}
      {...props}
    />
  );
}

export { Main };
