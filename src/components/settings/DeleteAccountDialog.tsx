'use client';

import { Button } from '@/components/ui/Button';
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
import { useTranslations } from 'next-intl';

function DeleteAccountDialog() {
  const t = useTranslations('settings.profile');
  const tUi = useTranslations('ui');

  // TODO: Use ResponsiveDialog
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive'>{t('delete.buttonLabel')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('delete.dialogTitle')}</DialogTitle>
          <DialogDescription>{t('delete.dialogDescription')}</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex sm:justify-between'>
          <Button variant='destructive'>{t('delete.buttonLabel')}</Button>
          <DialogClose asChild>
            <Button>{tUi('close')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DeleteAccountDialog };
