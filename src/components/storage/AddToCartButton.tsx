'use client';

import { Button } from '@/components/ui/Button';
import { cx } from 'cva';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

// TODO: Must be replaced by the type provided from database ORM.
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
  label,
  className,
}: { item: StorageItem; className?: string; label: string }) {
  const [cart, setCart, removeCart] = useLocalStorage<StorageItem[]>(
    'shopping-cart',
    [],
  );
  const [isInCart, setIsInCart] = useState(cart.includes(item));

  if (isInCart) {
    return (
      <Button
        className={cx('whitespace-break-spaces', className)}
        variant='destructive'
        onClick={() => {
          const newCart = cart;
          const index = cart.indexOf(item);
          if (index !== -1) {
            newCart.splice(index, 1);
          }
          setCart(newCart);
          setIsInCart(false);
        }}
      >
        Remove
      </Button>
    );
  }

  return (
    <Button
      className={cx('whitespace-break-spaces', className)}
      onClick={() => {
        const newCart = cart;
        newCart.push(item);
        setCart(newCart);
        setIsInCart(true);
      }}
    >
      {label}
    </Button>
  );
}

export { AddToCartButton };
