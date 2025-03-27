import { cx } from '@/lib/utils';

type CardTitleProps = {
  level?: 'h2' | 'h3' | 'h4';
} & React.HTMLAttributes<HTMLHeadingElement>;

const Card = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref: React.RefObject<HTMLDivElement>;
}) => (
  <div
    ref={ref}
    className={cx(
      'rounded-lg border bg-card text-card-foreground shadow-xs',
      className,
    )}
    {...props}
  />
);
Card.displayName = 'Card';

const CardHeader = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref: React.RefObject<HTMLDivElement>;
}) => (
  <div
    ref={ref}
    className={cx('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
);
CardHeader.displayName = 'CardHeader';

const CardTitle = ({
  ref,
  level = 'h3',
  className,
  ...props
}: CardTitleProps & {
  ref: React.RefObject<HTMLParagraphElement>;
}) => {
  const Component = level;

  return (
    <Component
      ref={ref}
      className={cx(
        'font-semibold text-2xl leading-none tracking-tight',
        className,
      )}
      {...props}
    />
  );
};
CardTitle.displayName = 'CardTitle';

const CardDescription = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  ref: React.RefObject<HTMLParagraphElement>;
}) => (
  <p
    ref={ref}
    className={cx('text-muted-foreground text-sm', className)}
    {...props}
  />
);
CardDescription.displayName = 'CardDescription';

const CardContent = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref: React.RefObject<HTMLDivElement>;
}) => <div ref={ref} className={cx('p-6 pt-0', className)} {...props} />;
CardContent.displayName = 'CardContent';

const CardFooter = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref: React.RefObject<HTMLDivElement>;
}) => (
  <div
    ref={ref}
    className={cx('flex items-center p-6 pt-0', className)}
    {...props}
  />
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
