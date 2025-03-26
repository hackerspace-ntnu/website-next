'use client';

import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

function AcceptLoanButton({
  loan,
  label,
}: { loan: RouterOutput['storage']['fetchLoans'][number]; label: string }) {
  const router = useRouter();
  const acceptLoanMutation = api.storage.acceptLoan.useMutation();

  return (
    <Button
      onClick={() => {
        acceptLoanMutation.mutate({
          id: loan.id,
          itemId: loan.itemId,
          lenderId: loan.lenderId,
        });
        router.refresh();
      }}
    >
      {label}
    </Button>
  );
}

export { AcceptLoanButton };
