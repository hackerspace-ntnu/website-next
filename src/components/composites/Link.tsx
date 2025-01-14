import { Button, type buttonVariants } from '@/components/ui/Button';
import { Link as LinkPrimitive } from '@/lib/locale/navigation';
import type { VariantProps } from '@/lib/utils';
import ExternalLinkPrimitive from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

type LinkProps = ComponentPropsWithoutRef<typeof LinkPrimitive> &
  VariantProps<typeof buttonVariants>;

// Only for links to internal pages, use ExternalLink for links to external pages
function Link({ className, variant, size, ...props }: LinkProps) {
  return (
    <Button className={className} variant={variant} size={size} asChild>
      <LinkPrimitive {...props} />
    </Button>
  );
}

type ExternalLinkProps = ComponentPropsWithoutRef<
  typeof ExternalLinkPrimitive
> &
  VariantProps<typeof buttonVariants>;

function ExternalLink({
  className,
  variant,
  size,
  ...props
}: ExternalLinkProps) {
  return (
    <Button className={className} variant={variant} size={size} asChild>
      <ExternalLinkPrimitive {...props} />
    </Button>
  );
}

export { Link, ExternalLink };
