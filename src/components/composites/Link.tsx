import { Link as LinkPrimitive } from '@/lib/locale/navigation';
import { type VariantProps, cva } from '@/lib/utils';
import ExternalLinkPrimitive from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

const linkVariants = cva({
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
      nav: 'font-normal text-foreground/60 transition-colors hover:text-foreground/80',
      none: '',
    },
    size: {
      button: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
      'sm-icon': 'h-8 w-8',
      'xs-icon': 'h-6 w-6',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'nav',
    size: 'none',
  },
});

type LinkProps = ComponentPropsWithoutRef<typeof LinkPrimitive> &
  VariantProps<typeof linkVariants>;

// Only for links to internal pages, use ExternalLink for links to external pages
function Link({ className, variant, size, ...props }: LinkProps) {
  return (
    <LinkPrimitive
      className={linkVariants({ variant, size, className })}
      {...props}
    />
  );
}

type ExternalLinkProps = ComponentPropsWithoutRef<
  typeof ExternalLinkPrimitive
> &
  VariantProps<typeof linkVariants>;

function ExternalLink({
  className,
  variant = 'link',
  size,
  ...props
}: ExternalLinkProps) {
  return (
    <ExternalLinkPrimitive
      className={linkVariants({ variant, size, className })}
      {...props}
    />
  );
}

export { Link, ExternalLink };
