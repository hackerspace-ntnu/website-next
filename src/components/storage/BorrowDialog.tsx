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
import { useState } from 'react';

type BorrowDialogProps = {
  t: {
    title: string;
    loanPeriod: string;
    loanPeriodDescription: string;
    autoaccept: string;
    autoacceptDescription: string;
    submit: string;
    mustbeLoggedIn: string;
    success: string;
  };
  className?: string;
  isLoggedIn: boolean;
};

function BorrowDialog({ t, className, isLoggedIn }: BorrowDialogProps) {
  const [open, setOpen] = useState(false);
  const [cart, _, isLoading] = useLocalStorage<CartItem[]>('shopping-cart');

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={cx(!isLoading && !cart ? 'hidden' : 'block', className)}
            variant='default'
            disabled={isLoading || !isLoggedIn}
          >
            {isLoggedIn ? t.title : t.mustbeLoggedIn}
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-sm'>
          <DialogHeader>
            <DialogTitle>{t.title}</DialogTitle>
          </DialogHeader>
          <LoanForm t={t} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export { BorrowDialog };
