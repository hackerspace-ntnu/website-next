import { type VariantProps, cva } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

const loaderVariants = cva({
  base: 'animate-spin text-muted-foreground',
  variants: {
    size: {
      default: 'mx-4 my-2 size-6',
      sm: 'mx-3 my-1.5 size-4',
      lg: 'mx-6 my-3 size-10',
      xl: 'mx-8 my-4 size-16',
      none: '',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

function Loader({
  className,
  size,
  ...props
}: React.SVGProps<SVGSVGElement> & VariantProps<typeof loaderVariants>) {
  return (
    <Loader2Icon className={loaderVariants({ size, className })} {...props} />
  );
}

export { Loader };
