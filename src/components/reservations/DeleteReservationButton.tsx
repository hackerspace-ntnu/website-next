'use client';

import { Trash2Icon } from 'lucide-react';
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

type DeleteReservationButtonProps = {
  reservationId: number;
  toolId: number;
  userId: number;
  variant?: 'icon' | 'button';
  className?: string;
};

function DeleteReservationButton({
  reservationId,
  toolId,
  userId,
  variant = 'icon',
}: DeleteReservationButtonProps) {
  const t = useTranslations('reservations');
  const tUi = useTranslations('ui');
  const router = useRouter();
  const utils = api.useUtils();

  const deleteReservation = api.reservations.deleteReservation.useMutation({
    onSuccess: async () => {
      toast.success(t('myReservationsTable.deletedSuccess'));
      await utils.reservations.invalidate();
      router.refresh();
    },
  });

  const trigger =
    variant === 'icon' ? (
      <Button
        size='icon'
        variant='ghost'
        disabled={deleteReservation.isPending}
        title={tUi('delete')}
      >
        {deleteReservation.isPending ? (
          <Spinner />
        ) : (
          <Trash2Icon className='h-4 w-4 text-destructive' />
        )}
      </Button>
    ) : (
      <Button variant='destructive' disabled={deleteReservation.isPending}>
        {deleteReservation.isPending ? <Spinner /> : tUi('delete')}
      </Button>
    );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('confirmDialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('confirmDialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex flex-row justify-between'>
          <AlertDialogActionDestructive
            onClick={() =>
              deleteReservation.mutate({ reservationId, toolId, userId })
            }
            disabled={deleteReservation.isPending}
          >
            {tUi('delete')}
          </AlertDialogActionDestructive>
          <AlertDialogCancel disabled={deleteReservation.isPending}>
            {tUi('cancel')}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteReservationButton };
