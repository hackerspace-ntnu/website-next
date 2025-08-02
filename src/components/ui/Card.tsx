import { cx } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cx(
        'rounded-lg border bg-card text-card-foreground shadow-xs',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cx('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  );
}

type CardTitleProps = {
  level?: 'h2' | 'h3' | 'h4';
} & React.ComponentPropsWithRef<'h2' | 'h3' | 'h4'>;

function CardTitle({ level = 'h3', className, ...props }: CardTitleProps) {
  const Component = level;
  return (
    <Component
      className={cx(
        'font-semibold text-2xl leading-none tracking-tight',
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<'p'>) {
  return (
    <p className={cx('text-muted-foreground text-sm', className)} {...props} />
  );
}

function CardContent({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return <div className={cx('p-6 pt-0', className)} {...props} />;
}

function CardFooter({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div className={cx('flex items-center p-6 pt-0', className)} {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
