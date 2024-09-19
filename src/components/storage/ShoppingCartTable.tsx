'use client';

import ShoppingCartTableSkeleton from '@/components/storage/ShoppingCartTableSkeleton';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { XIcon } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';

// TODO: Must be replaced by requesting the data from a database.
import { items } from '@/mock-data/items';

type ShoppingCartTableProps = {
  messages: {
    tableDescription: string;
    productId: string;
    productName: string;
    location: string;
    unitsAvailable: string;
    cartEmpty: string;
  };
};

function ShoppingCartTable({ messages }: ShoppingCartTableProps) {
  const [cart, setCart] = useLocalStorage<number[]>('shopping-cart', [], {
    initializeWithValue: false,
  });

  if (!cart) return <ShoppingCartTableSkeleton />;

  const itemsInCart = items.filter((item) => cart.includes(item.id));

  if (cart.length <= 0) {
    return <h3 className='text-center'>{messages.cartEmpty}</h3>;
  }

  function removeItem(id: number) {
    if (!cart) return;
    setCart(cart.filter((itemId) => itemId !== id));
  }

  return (
    <Table className='my-4'>
      <TableCaption>{messages.tableDescription}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[150px]'>{messages.productId}</TableHead>
          <TableHead>{messages.productName}</TableHead>
          <TableHead>{messages.location}</TableHead>
          <TableHead className='text-right'>
            {messages.unitsAvailable}
          </TableHead>
          <TableHead className='w-[100px]' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {itemsInCart.map((item) => (
          <TableRow key={item.name}>
            <TableCell className='font-medium'>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell className='text-right'>{item.quantity}</TableCell>
            <TableCell>
              <Button
                key={item.id}
                variant='destructive'
                className='h-8 p-1'
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
