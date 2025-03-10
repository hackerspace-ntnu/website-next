'use client';

import { ShoppingCartTableSkeleton } from '@/components/storage/ShoppingCartTableSkeleton';
import type { CartItem } from '@/components/storage/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { api } from '@/lib/api/client';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { XIcon } from 'lucide-react';

type ShoppingCartTableProps = {
  t: {
    tableDescription: string;
    productId: string;
    productName: string;
    location: string;
    unitsAvailable: string;
    cartEmpty: string;
    amountOfItemARIA: string;
  };
};

function ShoppingCartTable({ t }: ShoppingCartTableProps) {
  const [cart, setCart, isLoading] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    [],
  );

  const itemsInCart = api.storage.fetchMany.useQuery(
    cart?.map((i) => i.id) ?? [],
    { enabled: !!cart },
  ).data;

  if (isLoading) {
    return <ShoppingCartTableSkeleton t={t} />;
  }

  if (!cart || cart.length === 0) {
    return <p className='py-20 text-center font-medium'>{t.cartEmpty}</p>;
  }

  function updateAmountInCart(id: number, newValue: number) {
    if (!cart) return;

    const newCart = cart.map((cartItem) =>
      cartItem.id === id ? { ...cartItem, amount: newValue } : cartItem,
    );
    setCart(newCart);
  }

  function removeItem(id: number) {
    if (!cart) return;

    const newCart = cart.filter((cartItem: CartItem) => cartItem.id !== id);
    setCart(newCart);
  }

  return (
    <Table className='my-4'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-20' />
          <TableHead className='w-40'>{t.productId}</TableHead>
          <TableHead>{t.productName}</TableHead>
          <TableHead>{t.location}</TableHead>
          <TableHead className='text-right'>{t.unitsAvailable}</TableHead>
          <TableHead className='w-20' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {itemsInCart?.map((item) => (
          <TableRow key={item.name}>
            <TableCell>
              <Input
                type='number'
                min={1}
                max={5}
                defaultValue={
                  cart.find((cartItem) => cartItem.id === item.id)?.amount || 0
                }
                onChange={(e) =>
                  updateAmountInCart(item.id, Number(e.currentTarget.value))
                }
                className='w-[80px]'
                aria-label={t.amountOfItemARIA}
              />
            </TableCell>
            <TableCell className='font-medium'>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell className='text-right'>{item.quantity}</TableCell>
            <TableCell>
              <Button
                variant='destructive'
                size='xs-icon'
                onClick={() => removeItem(item.id)}
              >
                <XIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { ShoppingCartTable };
