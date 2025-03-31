'use client';

import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/composites/ResponsiveDialog';
import { ReservationForm } from '@/components/reservations/ReservationsCalendar/ReservationForm';
import { useTranslations } from 'next-intl';

type Reservation = {
  navn: string;
  mobilNr: string;
  email: string;
  start: Date | string;
  end: Date | string;
};

type CalendarDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  start: Date;
  end: Date;
  mode: 'create' | 'view';
  onSubmit: (data: Reservation) => void;
  onCancel: () => void;
  onDelete?: () => void;
  defaultValues?: Omit<Reservation, 'start' | 'end'>;
};

export default function CalendarDialog({
  open,
  onOpenChange,
  start,
  end,
  mode,
  onSubmit,
  onCancel,
  onDelete,
  defaultValues,
}: CalendarDialogProps) {
  const t = useTranslations('reservations');
  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            {mode === 'create' ? t('form.titleCreate') : t('form.titleEdit')}
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {mode === 'create'
              ? t('form.descriptionCreate')
              : t('form.descriptionEdit')}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ReservationForm
          start={start}
          end={end}
          onSubmit={onSubmit}
          onCancel={onCancel}
          onDelete={onDelete}
          mode={mode}
          defaultValues={{
            navn: defaultValues?.navn ?? '',
            email: defaultValues?.email ?? '',
            mobilNr: defaultValues?.mobilNr ?? '',
          }}
        />
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
