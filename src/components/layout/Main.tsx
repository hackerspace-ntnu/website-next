import { cx } from '@/lib/utils';

function Main({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className={cx(
        'clamp-[px-4-24-clamp py-6] mx-auto w-screen max-w-screen-2xl grow',
        className,
      )}
      {...props}
    />
  );
}

export { Main };
