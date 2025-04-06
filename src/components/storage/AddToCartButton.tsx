'use client';

import type { CartItem } from '@/components/storage/types';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cx } from '@/lib/utils';
import type { RouterOutput } from '@/server/api';
import { useState } from 'react';

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

  const [isInCart, setIsInCart] = useState(
    cart?.some((cartItem) => cartItem.id === item.id),
  );

  if (isLoading) {
    return <Spinner className='mx-[41px] my-2' />;
  }

  function updateCart() {
    if (!cart) return;

    if (cart.some((cartItem) => cartItem.id === item.id)) {
      const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
      setCart(newCart);
      setIsInCart(false);
    } else {
      const newCart = [...cart, { id: item.id, amount: 1 }];
      setCart(newCart);
      setIsInCart(true);
    }
  }

  return (
    <Button
      className={cx('whitespace-break-spaces', className)}
      variant={isInCart ? 'destructive' : 'default'}
      onClick={updateCart}
      disabled={item.availableUnits <= 0}
    >
      {isInCart ? t.removeFromCart : t.addToCart}
    </Button>
  );
}

export { AddToCartButton };
