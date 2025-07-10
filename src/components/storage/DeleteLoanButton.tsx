'use client';

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
import { useTranslations } from 'next-intl';

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
  const apiUtils = api.useUtils();
  const deleteLoanMutation = api.storage.deleteLoan.useMutation({
    onSuccess: async () => {
      toast.success(t.successMessage);
      await apiUtils.storage.fetchLoans.invalidate();
      router.refresh();
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className='w-28'
          variant='destructive'
          disabled={deleteLoanMutation.isPending}
        >
          {deleteLoanMutation.isPending ? <Spinner /> : t.buttonLabel}
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
              await deleteLoanMutation.mutateAsync({
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
