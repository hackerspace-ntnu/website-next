'use client';

import type { CartItem } from '@/components/storage/types';
import {
  AlertDialog,
  AlertDialogActionDestructive,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cx } from '@/lib/utils';
import { XIcon } from 'lucide-react';
import { useState } from 'react';

type ShoppingCartClearDialogProps = {
  t: {
    clearCart: string;
    clearCartDescription: string;
    clear: string;
    cancel: string;
  };
};

function ShoppingCartClearDialog({ t }: ShoppingCartClearDialogProps) {
  const [cart, setCart, isLoading] =
    useLocalStorage<CartItem[]>('shopping-cart');
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className={cx(
            'sm:-translate-y-1/2 flex gap-2 sm:absolute sm:top-1/2 sm:right-0',
            !isLoading && !cart && 'hidden',
          )}
          variant='destructive'
          disabled={isLoading}
        >
          <XIcon aria-hidden='true' />
          {t.clearCart}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t.clearCart}</AlertDialogTitle>
          <AlertDialogDescription>
            {t.clearCartDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogActionDestructive
            onClick={() => {
              setOpen(false);
              setCart(null);
            }}
          >
            {t.clear}
          </AlertDialogActionDestructive>
          <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ShoppingCartClearDialog };
