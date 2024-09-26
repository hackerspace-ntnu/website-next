'use client';

import { Button } from '@/components/ui/Button';
import { cx } from '@/lib/utils';
import { XIcon } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';

function ShoppingCartClearButton({
  caption,
  className,
}: { caption: string; className?: string }) {
  const [cart, setCart] = useLocalStorage<number[]>('shopping-cart', [], {
    initializeWithValue: false,
  });

  if (cart.length <= 0) return;

  return (
    <Button
      className={cx('flex gap-2', className)}
      variant='destructive'
      onClick={() => setCart([])}
    >
      <XIcon />
      {caption}
    </Button>
  );
}

export { ShoppingCartClearButton };
