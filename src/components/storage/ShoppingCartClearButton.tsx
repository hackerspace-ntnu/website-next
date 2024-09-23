'use client';

import { Button } from '@/components/ui/Button';
import { XIcon } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';

function ShoppingCartClearButton({ caption }: { caption: string }) {
  const [cart, setCart] = useLocalStorage<number[]>('shopping-cart', [], {
    initializeWithValue: false,
  });

  return (
    <Button
      className='flex gap-2'
      variant='destructive'
      disabled={cart.length <= 0}
      onClick={() => setCart([])}
    >
      <XIcon />
      {caption}
    </Button>
  );
}

export { ShoppingCartClearButton };
