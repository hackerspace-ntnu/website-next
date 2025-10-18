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
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

type DeleteLoanButtonProps = {
  loan: RouterOutput['storage']['fetchLoans'][number];
  t: {
    buttonLabel: string;
    title: string;
    description: string;
    successMessage: string;
  };
};

function DeleteLoanButton({ loan, t }: DeleteLoanButtonProps) {
  const tUi = useTranslations('ui');
  const router = useRouter();
  const utils = api.useUtils();
  const deleteLoan = api.storage.deleteLoan.useMutation({
    onSuccess: async () => {
      toast.success(t.successMessage);
      await Promise.all([
        utils.storage.fetchLoans.invalidate(),
        utils.storage.userLoans.invalidate(),
        utils.storage.userLoansTotal.invalidate(),
      ]);
      router.refresh();
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className='w-28'
          variant='destructive'
          disabled={deleteLoan.isPending}
        >
          {deleteLoan.isPending ? <Spinner /> : t.buttonLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle>{t.title}</AlertDialogTitle>
          <AlertDialogDescription>{t.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogActionDestructive
            onClick={async () => {
              await deleteLoan.mutateAsync({
                loanId: loan.id,
                itemId: loan.itemId,
                lenderId: loan.lenderId,
              });
            }}
          >
            {tUi('delete')}
          </AlertDialogActionDestructive>
          <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteLoanButton };
