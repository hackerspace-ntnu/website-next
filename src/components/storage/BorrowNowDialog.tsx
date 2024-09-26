'use client';

import { LoanForm } from '@/components/storage/LoanForm';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { useReadLocalStorage } from 'usehooks-ts';

type BorrowNowDialogProps = {
  t: {
    borrowNow: string;
    name: string;
    nameDescription: string;
    email: string;
    emailExample: string;
    phoneNumber: string;
    phoneNumberDescription: string;
    returnBy: string;
    returnByDescription: string;
    submit: string;
  };
  className?: string;
};

function BorrowNowDialog({ t, className }: BorrowNowDialogProps) {
  const cart = useReadLocalStorage<number[]>('shopping-cart', {
    initializeWithValue: false,
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={className}
            variant='default'
            disabled={!cart || cart.length <= 0}
          >
            {t.borrowNow}
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-4xl'>
          <DialogHeader>
            <DialogTitle>{t.borrowNow}</DialogTitle>
          </DialogHeader>
          <LoanForm t={t} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export { BorrowNowDialog };
