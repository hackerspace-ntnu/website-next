'use client';

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
import { ShoppingCartIcon } from 'lucide-react';

type ShoppingCartLinkProps = {
  t: {
    viewShoppingCart: string;
  };
};

function ShoppingCartLink({ t }: ShoppingCartLinkProps) {
  const [cart, _, isLoading] = useLocalStorage<CartItem[]>('shopping-cart');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='absolute right-0 xs:right-5 bottom-0'>
            <Link
              variant='default'
              size='icon'
              href='/storage/shopping-cart'
              aria-label={t.viewShoppingCart}
            >
              <ShoppingCartIcon />
            </Link>
            {!isLoading && cart && cart.length > 0 && (
              <Badge
                className='-top-2 -right-3.5 pointer-events-none absolute rounded-full'
                variant='destructive'
              >
                {cart.length}
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t.viewShoppingCart}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { ShoppingCartLink };
