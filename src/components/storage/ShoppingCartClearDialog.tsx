'use client';

import { ConfirmDialog } from '@/components/composites/ConfirmDialog';
import type { CartItem } from '@/components/storage/AddToCartButton';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cx } from '@/lib/utils';
import { XIcon } from 'lucide-react';

type ShoppingCartClearDialogProps = {
  className?: string;
  t: {
    clearCart: string;
    clearCartDescription: string;
    clear: string;
    cancel: string;
  };
};

function ShoppingCartClearDialog({
  className,
  t,
}: ShoppingCartClearDialogProps) {
  const [cart, setCart, isLoading] =
    useLocalStorage<CartItem[]>('shopping-cart');

  return (
    <ConfirmDialog
      className={cx('flex gap-2', !isLoading && !cart && 'hidden', className)}
      variant='destructive'
      disabled={isLoading}
      confirmAction={() => setCart(null)}
      t={{
        title: t.clearCart,
        description: t.clearCartDescription,
        confirm: t.clear,
        cancel: t.cancel,
      }}
    >
      <XIcon aria-hidden='true' />
      {t.clearCart}
    </ConfirmDialog>
  );
}

export { ShoppingCartClearDialog };
