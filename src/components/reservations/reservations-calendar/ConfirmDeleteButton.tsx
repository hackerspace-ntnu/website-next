'use client';

import { useTranslations } from 'next-intl';
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
import { Spinner } from '@/components/ui/Spinner';

type ConfirmDeleteButtonProps = {
  onConfirm: () => Promise<void> | void;
  isLoading?: boolean;
};

function ConfirmDeleteButton({
  onConfirm,
  isLoading,
}: ConfirmDeleteButtonProps) {
  const t = useTranslations('reservations');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type='button' variant='destructive' disabled={isLoading}>
          {isLoading ? (
            <Spinner className='text-destructive-foreground' />
          ) : (
            t('form.delete')
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('confirmDialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('confirmDialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex w-full gap-2 sm:justify-between'>
          <AlertDialogCancel asChild>
            <Button variant='secondary'>{t('confirmDialog.cancel')}</Button>
          </AlertDialogCancel>
          <AlertDialogActionDestructive asChild>
            <Button onClick={onConfirm}>{t('confirmDialog.confirm')}</Button>
          </AlertDialogActionDestructive>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ConfirmDeleteButton };
