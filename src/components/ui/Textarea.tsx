import { cx } from '@/lib/utils';

function Textarea({
  className,
  ...props
}: React.ComponentPropsWithRef<'textarea'>) {
  return (
    <textarea
      className={cx(
        'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
