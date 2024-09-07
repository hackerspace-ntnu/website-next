'use client';

import { Button } from '@/components/ui/Button';
import { cx } from 'cva';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

// TODO: Type must be replaced by the type provided from database ORM.
export type StorageItem = {
  id: number;
  name: string;
  photo_url: string;
  status: string;
  quantity: number;
  location: string;
};

function AddToCartButton({
  item,
  addToCart,
  removeFromCart,
  className,
}: {
  item: StorageItem;
  className?: string;
  addToCart: string;
  removeFromCart: string;
}) {
  const [cart, setCart, removeCart] = useLocalStorage<StorageItem[]>(
    'shopping-cart',
    [],
  );
  // Set isInCart to null initially as we can update it on the client side with useEffect,
  // and null evaluates to false, so the server prerenders all buttons as "Add to cart".
  const [isInCart, setIsInCart] = useState<boolean | null>(null);

  useEffect(() => {
    if (isInCart !== null) return;
    setIsInCart(cart.some((i) => i.id === item.id));
  });

  const updateState = (addToCart: boolean) => {
    let newCart = cart;
    if (addToCart) {
      newCart.push(item);
    } else {
      newCart = newCart.filter((i) => i.id !== item.id);
    }
    setCart(newCart);
    setIsInCart(addToCart);
  };

  return (
    <Button
      className={cx('whitespace-break-spaces', className)}
      variant={!isInCart ? 'default' : 'destructive'}
      onClick={() => updateState(!isInCart)}
    >
      {isInCart ? removeFromCart : addToCart}
    </Button>
  );
}

export { AddToCartButton };
