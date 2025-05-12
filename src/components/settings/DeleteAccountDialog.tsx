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
import { Spinner } from '@/components/ui/Spinner';
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
          <DialogDescription>
            {t.rich('delete.dialogDescription', {
              bold: (chunks) => <b>{chunks}</b>,
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex sm:justify-between'>
          <Button
            className='md:w-1/3'
            variant='destructive'
            disabled={timeout > 0 || deleteAccountMutation.isPending}
            onClick={() => deleteAccountMutation.mutate()}
          >
            {deleteAccountMutation.isPending ? (
              <Spinner size='sm' />
            ) : (
              <>
                {t('delete.buttonLabel')}
                {timeout > 0 && ` (${timeout}s)`}
              </>
            )}
          </Button>
          <DialogClose asChild>
            <Button disabled={deleteAccountMutation.isPending}>
              {tUi('close')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DeleteAccountDialog };
