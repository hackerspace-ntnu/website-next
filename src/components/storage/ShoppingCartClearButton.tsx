'use client';

import type { CartItem } from '@/components/storage/AddToCartButton';
import { Button } from '@/components/ui/Button';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cx } from '@/lib/utils';
import { XIcon } from 'lucide-react';

function ShoppingCartClearButton({
  className,
  t,
}: { className?: string; t: { clearCart: string } }) {
  const [cart, setCart, isLoading] =
    useLocalStorage<CartItem[]>('shopping-cart');

  return (
    <Button
      className={cx('flex gap-2', !isLoading && !cart && 'hidden', className)}
      variant='destructive'
      onClick={() => setCart(null)}
      disabled={isLoading}
    >
      <XIcon />
      {t.clearCart}
    </Button>
  );
}

export { ShoppingCartClearButton };
