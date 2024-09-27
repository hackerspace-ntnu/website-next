'use client';

import { Button } from '@/components/ui/Button';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cx } from '@/lib/utils';
import { XIcon } from 'lucide-react';

function ShoppingCartClearButton({
  caption,
  className,
}: { caption: string; className?: string }) {
  const [cart, setCart, isLoading] = useLocalStorage<number[]>('shopping-cart');

  if (!cart) return;

  return (
    <Button
      className={cx('flex gap-2', className)}
      variant='destructive'
      onClick={() => setCart([])}
      disabled={isLoading}
    >
      <XIcon />
      {caption}
    </Button>
  );
}

export { ShoppingCartClearButton };
