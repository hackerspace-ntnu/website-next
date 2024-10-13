import { type VariantProps, cva } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

const loaderVariants = cva({
  base: 'animate-spin text-muted-foreground',
  variants: {
    size: {
      default: 'mx-4 my-2 h-6 w-6',
      sm: 'mx-3 my-1.5 h-4 w-4',
      lg: 'mx-6 my-6 h-8 w-8',
      xl: 'mx-8 my-8 h-10 w-10',
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
