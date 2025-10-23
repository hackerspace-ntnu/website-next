'use client';

import { useState } from 'react';
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
import { api } from '@/lib/api/client';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cx } from '@/lib/utils';

type BorrowDialogProps = {
  t: {
    title: string;
    loanInAdvance: string;
    loanInAdvanceDescription: string;
    loanPeriod: string;
    loanPeriodDescription: string;
    autoapprove: string;
    autoapproveDescription: string;
    submit: string;
    mustBeLoggedIn: string;
    success: string;
  };
  className?: string;
  isLoggedIn: boolean;
};

function BorrowDialog({ t, className, isLoggedIn }: BorrowDialogProps) {
  const [open, setOpen] = useState(false);
  const [cart, _, isLoading] = useLocalStorage<CartItem[]>('shopping-cart');

  const itemsInCart = api.storage.fetchMany.useQuery(
    cart?.map((i) => i.id) ?? [],
    { enabled: !isLoading },
  );

  const loanInAdvance = itemsInCart.data?.some(
    (item) => item.availableUnits <= 0,
  );

  const disabledDays = api.storage.calculateDisabledDays.useQuery(cart ?? [], {
    enabled: isLoggedIn && itemsInCart.data && loanInAdvance && !!cart,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className='mx-auto flex w-full max-w-prose flex-col items-center gap-4'>
        {loanInAdvance && (
          <span className='text-muted-foreground'>
            {t.loanInAdvanceDescription}
          </span>
        )}
        <DialogTrigger asChild>
          <Button
            className={cx(!isLoading && !cart ? 'hidden' : 'block', className)}
            variant='default'
            disabled={isLoading || !isLoggedIn}
          >
            {isLoggedIn
              ? loanInAdvance
                ? t.loanInAdvance
                : t.title
              : t.mustBeLoggedIn}
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
        </DialogHeader>
        <LoanForm setOpen={setOpen} disabledDays={disabledDays.data} t={t} />
      </DialogContent>
    </Dialog>
  );
}

export { BorrowDialog };
