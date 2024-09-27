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
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

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

function BorrowDialog({ t, className }: BorrowNowDialogProps) {
  const [cart, _, isLoading] = useLocalStorage<number[]>('shopping-cart');

  if (!cart) return;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className={className} variant='default' disabled={isLoading}>
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
