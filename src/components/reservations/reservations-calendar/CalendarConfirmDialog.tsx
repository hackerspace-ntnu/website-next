'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';

type CalendarConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  t: {
    title: string;
    description: string;
    confirm: string;
    cancel: string;
  };
};

function CalendarConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  t,
}: CalendarConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle>{t.title}</AlertDialogTitle>
          <AlertDialogDescription>{t.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex w-full gap-2 sm:justify-between'>
          <AlertDialogCancel asChild>
            <Button
              variant='secondary'
              onClick={() => {
                onCancel();
                onOpenChange(false);
              }}
            >
              {t.cancel}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant='default'
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
            >
              {t.confirm}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { CalendarConfirmDialog };
