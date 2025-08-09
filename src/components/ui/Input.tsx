import { cx } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input({
  ref,
  className,
  type,
  ...props
}: InputProps & {
  ref?: React.RefObject<HTMLInputElement>;
}) {
  return (
    <input
      type={type}
      className={cx(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

export { Input, type InputProps };
