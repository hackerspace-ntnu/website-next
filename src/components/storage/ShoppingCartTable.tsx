'use client';

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
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { XIcon } from 'lucide-react';

// TODO: Must be replaced by requesting the data from a database.
import { items } from '@/mock-data/items';
import { ShoppingCartTableSkeleton } from './ShoppingCartTableSkeleton';

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
  const [cart, setCart, loading] = useLocalStorage<number[]>(
    'shopping-cart',
    [],
  );

  if (loading) {
    return <ShoppingCartTableSkeleton t={t} />;
  }

  if (cart.length <= 0) {
    return <p className='py-20 text-center font-medium'>{t.cartEmpty}</p>;
  }

  const itemsInCart = items.filter((item) => cart.includes(item.id));

  function updateAmountInCart(id: number, newValue: number) {
    const amountInCart = cart.filter((i) => i === id).length;
    const diff = newValue - amountInCart;

    let newCart = cart;
    // If we're adding elements, add x new elements
    // Else, remove all occurences of the item, and re-add the correct amount
    if (diff > 0) {
      newCart = newCart.concat(Array(diff).fill(id));
    } else {
      newCart = newCart.filter((i) => i !== id);
      newCart = newCart.concat(Array(newValue).fill(id));
    }
    setCart(newCart);
  }

  function removeItem(id: number) {
    if (!cart) return;
    setCart(cart.filter((itemId) => itemId !== id));
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
        {itemsInCart.map((item) => (
          <TableRow key={item.name}>
            <TableCell>
              <Input
                type='number'
                min={1}
                max={100}
                defaultValue={cart.filter((i) => i === item.id).length}
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
