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
import { api } from '@/lib/api/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function DeleteAccountDialog() {
  const t = useTranslations('settings.account');
  const tUi = useTranslations('ui');
  const router = useRouter();
  const [timeout, setTimeoutLeft] = useState(10);

  useEffect(() => {
    const timer =
      timeout > 0 && setInterval(() => setTimeoutLeft(timeout - 1), 1000);
    if (!timer) return;
    return () => clearInterval(timer);
  }, [timeout]);

  const deleteAccountMutation = api.settings.deleteAccount.useMutation({
    onSuccess: () => router.push('/'),
  });

  // TODO: Use ResponsiveDialog
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' onClick={() => setTimeoutLeft(10)}>
          {t('delete.buttonLabel')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('delete.dialogTitle')}</DialogTitle>
          <DialogDescription>{t('delete.dialogDescription')}</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex sm:justify-between'>
          <Button
            variant='destructive'
            disabled={timeout > 0}
            onClick={() => deleteAccountMutation.mutate()}
          >
            {t('delete.buttonLabel')}
            {timeout > 0 && ` (${timeout}s)`}
          </Button>
          <DialogClose asChild>
            <Button>{tUi('close')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DeleteAccountDialog };
