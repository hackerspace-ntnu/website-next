import ExternalLinkPrimitive from 'next/link';
import { Button, type buttonVariants } from '@/components/ui/Button';
import { Link as LinkPrimitive } from '@/lib/locale/navigation';
import type { VariantProps } from '@/lib/utils';

type LinkProps = React.ComponentPropsWithoutRef<typeof LinkPrimitive> &
  VariantProps<typeof buttonVariants>;

// Only for links to internal pages, use ExternalLink for links to external pages
function Link({
  className,
  variant = 'none',
  size = 'none',
  ...props
}: LinkProps) {
  return (
    <Button className={className} variant={variant} size={size} asChild>
      <LinkPrimitive {...props} />
    </Button>
  );
}

type ExternalLinkProps = React.ComponentPropsWithoutRef<
  typeof ExternalLinkPrimitive
> &
  VariantProps<typeof buttonVariants>;

function ExternalLink({
  className,
  variant = 'link',
  size = 'none',
  ...props
}: ExternalLinkProps) {
  return (
    <Button className={className} variant={variant} size={size} asChild>
      <ExternalLinkPrimitive {...props} />
    </Button>
  );
}

export { Link, ExternalLink, type LinkProps, type ExternalLinkProps };
