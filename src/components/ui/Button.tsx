import { type VariantProps, cva } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva({
  base: 'cursor-pointer rounded-md ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default:
        'inline-flex items-center justify-center whitespace-nowrap bg-primary font-medium text-primary-foreground text-sm hover:bg-primary/90',
      destructive:
        'inline-flex items-center justify-center whitespace-nowrap bg-destructive font-medium text-destructive-foreground text-sm hover:bg-destructive/90',
      outline:
        'inline-flex items-center justify-center whitespace-nowrap border border-input bg-background font-medium text-sm hover:bg-accent hover:text-accent-foreground',
      secondary:
        'inline-flex items-center justify-center whitespace-nowrap bg-secondary font-medium text-secondary-foreground text-sm hover:bg-secondary/80',
      ghost:
        'inline-flex items-center justify-center whitespace-nowrap font-medium text-sm hover:bg-accent hover:text-accent-foreground',
      link: 'inline-flex items-center justify-center whitespace-nowrap font-medium text-primary text-sm underline-offset-4 hover:underline',
      nav: 'inline-flex items-center justify-center whitespace-nowrap font-medium font-normal text-foreground/60 text-sm transition-colors hover:text-foreground/80',
      'ring-only': 'inline-flex items-center justify-center whitespace-nowrap',
      none: '',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 px-3',
      lg: 'h-11 px-8',
      icon: 'h-10 w-10',
      'sm-icon': 'h-8 w-8',
      'xs-icon': 'h-6 w-6',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({
  ref,
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps & {
  ref: React.RefObject<HTMLButtonElement>;
}) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={buttonVariants({ variant, size, className })}
      ref={ref}
      {...props}
    />
  );
};
Button.displayName = 'Button';

export { Button, buttonVariants };
