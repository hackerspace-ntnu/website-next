'use client';

import { Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
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

  const mutation = api.reservations.deleteReservation.useMutation({
    onSuccess: async () => {
      toast.success(t('myReservationsTable.deletedSuccess'));
      await utils.reservations.fetchCalendarReservations.invalidate();
      router.refresh();
    },
  });

  const trigger =
    variant === 'icon' ? (
      <Button
        size='icon'
        variant='ghost'
        disabled={mutation.isPending}
        title={tUi('delete')}
      >
        {mutation.isPending ? (
          <Spinner />
        ) : (
          <Trash2Icon className='h-4 w-4 text-destructive' />
        )}
      </Button>
    ) : (
      <Button variant='destructive' disabled={mutation.isPending}>
        {mutation.isPending ? <Spinner /> : tUi('delete')}
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
            onClick={() => mutation.mutate({ reservationId, toolId, userId })}
            disabled={mutation.isPending}
          >
            {tUi('delete')}
          </AlertDialogActionDestructive>
          <AlertDialogCancel disabled={mutation.isPending}>
            {tUi('cancel')}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteReservationButton };
