import { Button, type buttonVariants } from '@/components/ui/Button';
import { Link as InternalLink } from '@/lib/locale/navigation';
import type { VariantProps } from 'cva';
import ExternalLink from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

type LinkProps = ComponentPropsWithoutRef<typeof InternalLink> &
  VariantProps<typeof buttonVariants>;

function Link({ variant, size, children, ...props }: LinkProps) {
  return (
    <Button variant={variant} size={size} asChild>
      <InternalLink {...props}>{children}</InternalLink>
    </Button>
  );
}

export { Link };
