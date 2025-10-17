'use client';

import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

function ApproveLoanButton({
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
  const approveLoan = api.storage.approveLoan.useMutation({
    onSuccess: async () => {
      toast.success(successMessage);
      await utils.storage.fetchLoans.invalidate();
      utils.storage.userLoans.invalidate();
      router.refresh();
    },
  });

  return (
    <Button
      className='w-32'
      disabled={approveLoan.isPending}
      onClick={() => {
        approveLoan.mutate({
          loanId: loan.id,
          itemId: loan.itemId,
          lenderId: loan.lenderId,
        });
      }}
    >
      {approveLoan.isPending ? <Spinner /> : label}
    </Button>
  );
}

export { ApproveLoanButton };
