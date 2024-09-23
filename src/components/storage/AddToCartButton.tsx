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
  const [cart, setCart, _] = useLocalStorage<number[]>('shopping-cart', []);
  // Set isInCart to false initially as we can update it on the client side with useEffect,
  // and the server prerenders all buttons as "Add to cart".
  const [isInCart, setIsInCart] = useState(false);

  // On cart/item/page/etc change, check if we must update the isInCart state.
  useEffect(() => {
    setIsInCart(cart.some((i) => i === item.id));
  }, [cart, item.id]);

  const updateState = (addToCart: boolean) => {
    let newCart = cart;
    if (addToCart) {
      newCart.push(item.id);
    } else {
      newCart = newCart.filter((i) => i !== item.id);
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
