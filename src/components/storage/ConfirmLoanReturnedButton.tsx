'use client';

import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

function ConfirmLoanReturnedButton({
  loan,
  label,
  successMessage,
}: {
  loan: RouterOutput['storage']['fetchLoans'][number];
  label: string;
  successMessage: string;
}) {
  const router = useRouter();
  const utils = api.useUtils();
  const confirmLoan = api.storage.confirmLoanReturned.useMutation({
    onSuccess: async () => {
      toast.success(successMessage);
      await utils.storage.fetchLoans.invalidate();
      utils.storage.userLoans.invalidate();
      utils.storage.userLoansTotal.invalidate();
      router.refresh();
    },
  });

  return (
    <Button
      className='w-40'
      disabled={confirmLoan.isPending}
      onClick={() => {
        confirmLoan.mutate({
          loanId: loan.id,
          itemId: loan.itemId,
          lenderId: loan.lenderId,
        });
      }}
    >
      {confirmLoan.isPending ? <Spinner /> : label}
    </Button>
  );
}

export { ConfirmLoanReturnedButton };
