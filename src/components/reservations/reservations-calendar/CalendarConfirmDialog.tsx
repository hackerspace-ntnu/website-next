'use client';

import { useTranslations } from 'next-intl';
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
};

function CalendarConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: CalendarConfirmDialogProps) {
  const t = useTranslations('reservations');

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('confirmDialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('confirmDialog.description')}
          </AlertDialogDescription>
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
              {t('confirmDialog.cancel')}
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
              {t('confirmDialog.confirm')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { CalendarConfirmDialog };
