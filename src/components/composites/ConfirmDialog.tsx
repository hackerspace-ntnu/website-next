'use client';

import { Button, type buttonVariants } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import type { VariantProps } from '@/lib/utils';

type ConfirmDialogProps = {
  t: {
    title: string;
    description: string;
    cancel: string;
    confirm: string;
  };
  confirmAction: () => void;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

function ConfirmDialog({ confirmAction, t, ...props }: ConfirmDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' {...props} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex w-full gap-2 sm:justify-between'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              {t.cancel}
            </Button>
          </DialogClose>
          <Button variant='destructive' onClick={confirmAction}>
            {t.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ConfirmDialog };
