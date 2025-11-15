'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/composites/ResponsiveDialog';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { api } from '@/lib/api/client';

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

  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger asChild>
        <Button variant='destructive' onClick={() => setTimeoutLeft(10)}>
          {t('delete.buttonLabel')}
        </Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            {t('delete.dialogTitle')}
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {t.rich('delete.dialogDescription', {
              bold: (chunks) => <b>{chunks}</b>,
            })}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogFooter className='flex sm:justify-between'>
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
          <ResponsiveDialogClose asChild>
            <Button disabled={deleteAccountMutation.isPending}>
              {tUi('close')}
            </Button>
          </ResponsiveDialogClose>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export { DeleteAccountDialog };
