'use client';

import { Button } from '@/components/ui/Button';
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
  const apiUtils = api.useUtils();
  const approveLoanMutation = api.storage.approveLoan.useMutation({
    onSuccess: async () => {
      toast.success(successMessage);
      await apiUtils.storage.fetchLoans.invalidate();
      router.refresh();
    },
  });

  return (
    <Button
      onClick={async () => {
        approveLoanMutation.mutateAsync({
          loanId: loan.id,
          itemId: loan.itemId,
          lenderId: loan.lenderId,
        });
      }}
    >
      {label}
    </Button>
  );
}

export { ApproveLoanButton };
