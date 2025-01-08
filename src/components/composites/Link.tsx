import { Button, ButtonProps } from '@/components/ui/Button';
import { Link as InternalLink } from '@/lib/locale/navigation';
import ExternalLink from 'next/link';
import { ComponentProps, type ComponentPropsWithoutRef } from 'react';

type LinkProps = ComponentPropsWithoutRef<typeof InternalLink> & {
  text: string;
  variant?: string;
  size?: string;
};

function Link({ text, variant, size, children, ...props }: LinkProps) {
  return (
    <Button asChild>
      <InternalLink {...props}>{children}</InternalLink>
    </Button>
  );
}

export { Link };
