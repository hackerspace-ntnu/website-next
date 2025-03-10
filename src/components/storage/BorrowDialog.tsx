'use client';

import { LoanForm } from '@/components/storage/LoanForm';
import type { CartItem } from '@/components/storage/types';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cx } from '@/lib/utils';

type BorrowDialogProps = {
  t: {
    borrowNow: string;
    name: string;
    email: string;
    phoneNumber: string;
    phoneNumberDescription: string;
    returnBy: string;
    returnByDescription: string;
    submit: string;
  };
  className?: string;
};

function BorrowDialog({ t, className }: BorrowDialogProps) {
  const [cart, _, isLoading] = useLocalStorage<CartItem[]>('shopping-cart');

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cx(!isLoading && !cart ? 'hidden' : 'block', className)}
            variant='default'
            disabled={isLoading}
          >
            {t.borrowNow}
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-sm'>
          <DialogHeader>
            <DialogTitle>{t.borrowNow}</DialogTitle>
          </DialogHeader>
          <LoanForm t={t} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export { BorrowDialog };
