'use client';

import { Button } from '@/components/ui/Button';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cx } from '@/lib/utils';
import { XIcon } from 'lucide-react';

function ShoppingCartClearButton({
  caption,
  className,
}: { caption: string; className?: string }) {
  const [cart, setCart] = useLocalStorage<number[]>('shopping-cart', []);

  if (!cart || cart.length <= 0) return;

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
