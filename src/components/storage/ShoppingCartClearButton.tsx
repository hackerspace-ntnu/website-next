'use client';

import type { CartItem } from '@/components/storage/AddToCartButton';
import { Button } from '@/components/ui/Button';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cx } from '@/lib/utils';
import { XIcon } from 'lucide-react';

function ShoppingCartClearButton({
  caption,
  className,
}: { caption: string; className?: string }) {
  const [cart, setCart, isLoading] =
    useLocalStorage<CartItem[]>('shopping-cart');

  return (
    <Button
      className={cx('flex gap-2', !cart && 'hidden', className)}
      variant='destructive'
      onClick={() => setCart(null)}
      disabled={isLoading}
    >
      <XIcon />
      {caption}
    </Button>
  );
}

export { ShoppingCartClearButton };
