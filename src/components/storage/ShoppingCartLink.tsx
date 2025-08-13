'use client';

import { ShoppingCartIcon } from 'lucide-react';
import type { CartItem } from '@/components/storage/types';
import { Badge } from '@/components/ui/Badge';
import { Link } from '@/components/ui/Link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cx } from '@/lib/utils';

type ShoppingCartLinkProps = {
  t: {
    viewShoppingCart: string;
  };
  className?: string;
};

function ShoppingCartLink({ t, className }: ShoppingCartLinkProps) {
  const [cart, _, isLoading] = useLocalStorage<CartItem[]>('shopping-cart');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            variant='default'
            size='icon'
            href='/storage/shopping-cart'
            aria-label={t.viewShoppingCart}
            className={cx('relative', className)}
          >
            <ShoppingCartIcon />
            {!isLoading && cart && cart.length > 0 && (
              <Badge
                className='-top-2 -right-3.5 pointer-events-none absolute rounded-full'
                variant='destructive'
              >
                {cart.length}
              </Badge>
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t.viewShoppingCart}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { ShoppingCartLink };
