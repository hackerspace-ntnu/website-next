'use client';

import { Button } from '@/components/ui/Button';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cx } from 'cva';
import { useEffect, useState } from 'react';

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
  const [cart, setCart, loading] = useLocalStorage<number[]>(
    'shopping-cart',
    [],
  );
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(cart.some((i) => i === item.id));
  }, [cart, item.id]);

  // if (loading) {
  //   return <div>need loading indicator here</div>;
  // }

  const updateState = (addToCart: boolean) => {
    if (addToCart) {
      setCart((prevCart) => {
        const newCart = [...prevCart, item.id];
        console.log(newCart);
        return newCart;
      });
    } else {
      setCart((prevCart) => {
        const newCart = prevCart.filter((i) => i !== item.id);
        console.log(newCart);
        return newCart;
      });
    }
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
