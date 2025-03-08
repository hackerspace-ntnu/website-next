'use client';

import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import type { RouterOutput } from '@/server/api';
import { cx } from 'cva';

export type CartItem = {
  id: number;
  amount: number;
};

type AddToCartButtonProps = {
  className?: string;
  item: RouterOutput['storage']['fetchMany'][number];
  t: {
    addToCart: string;
    removeFromCart: string;
  };
};

function AddToCartButton({ className, item, t }: AddToCartButtonProps) {
  const [cart, setCart, isLoading] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    [],
  );

  if (isLoading) {
    return <Spinner className='mx-[41px] my-2' />;
  }

  function updateCart() {
    if (!cart) return;

    const isInCart = cart.some((cartItem) => cartItem.id === item.id);

    if (isInCart) {
      const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
      setCart(newCart);
    } else {
      const newCart = [...cart, { id: item.id, amount: 1 }];
      setCart(newCart);
    }
  }

  return (
    <Button
      className={cx('whitespace-break-spaces', className)}
      variant={
        cart?.some((cartItem) => cartItem.id === item.id)
          ? 'destructive'
          : 'default'
      }
      onClick={updateCart}
    >
      {cart?.some((cartItem) => cartItem.id === item.id)
        ? t.removeFromCart
        : t.addToCart}
    </Button>
  );
}

export { AddToCartButton };
