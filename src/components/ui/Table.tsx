import { cx } from '@/lib/utils';

function Table({ className, ...props }: React.ComponentPropsWithRef<'table'>) {
  return (
    <div className='relative w-full overflow-auto'>
      <table
        className={cx('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<'thead'>) {
  return <thead className={cx('[&_tr]:border-b', className)} {...props} />;
}

function TableBody({
  className,
  ...props
}: React.ComponentPropsWithRef<'tbody'>) {
  return (
    <tbody className={cx('[&_tr:last-child]:border-0', className)} {...props} />
  );
}

function TableFooter({
  className,
  ...props
}: React.ComponentPropsWithRef<'tfoot'>) {
  return (
    <tfoot
      className={cx(
        'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentPropsWithRef<'tr'>) {
  return (
    <tr
      className={cx(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentPropsWithRef<'th'>) {
  return (
    <th
      className={cx(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentPropsWithRef<'td'>) {
  return (
    <td
      className={cx(
        'p-4 align-middle [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentPropsWithRef<'caption'>) {
  return (
    <caption
      className={cx('mt-4 text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
