import { cx } from '@/lib/utils';

function Main({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className={cx(
        'mx-auto w-full max-w-screen-2xl grow px-4-24-clamp py-6',
        className,
      )}
      {...props}
    />
  );
}

export { Main };
