'use client';
import { Button } from '@/components/ui/Button';
import { X } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';

async function ShoppingCartClearButton({ caption }: { caption: string }) {
  const [cart, setCart] = useLocalStorage<number[]>('shopping-cart', []);

  function clearCart() {
    setCart([]);
  }

  if (cart.length <= 0) return;

  return (
    <Button
      className='flex gap-2'
      variant='destructive'
      onClick={() => clearCart()}
    >
      <X />
      {caption}
    </Button>
  );
}

export { ShoppingCartClearButton };
