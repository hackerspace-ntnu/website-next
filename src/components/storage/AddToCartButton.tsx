'use client';

import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
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

type AddToCartButtonProps = {
  className?: string;
  item: StorageItem;
  t: {
    addToCart: string;
    removeFromCart: string;
  };
};

function AddToCartButton({ className, item, t }: AddToCartButtonProps) {
  const [cart, setCart, loading] = useLocalStorage<number[]>(
    'shopping-cart',
    [],
  );
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(cart.some((i) => i === item.id));
  }, [cart, item.id]);

  if (loading) {
    return <Loader className='mx-[41px]' />;
  }

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
      {isInCart ? t.removeFromCart : t.addToCart}
    </Button>
  );
}

export { AddToCartButton };
