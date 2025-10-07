'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ConfirmDeleteButton } from '@/components/reservations/reservations-calendar/ConfirmDeleteButton';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { useAppForm } from '@/components/ui/Form';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { reservationFormSchema } from '@/validations/reservations';

type CalendarDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  mode: 'create' | 'edit';
  userId: number;
  toolId: number;
  reservationId?: number;

  start: Date | null;
  end: Date | null;
  notes?: string;

  windowFromISO: string;
  windowUntilISO: string;

  children?: React.ReactNode;
};

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => ({
  label: String(i).padStart(2, '0'),
  value: String(i), // string to match SelectField
}));
const MINUTE_OPTIONS = [0, 15, 30, 45].map((m) => ({
  label: String(m).padStart(2, '0'),
  value: String(m), // string to match SelectField
}));

function withHM(date: Date, h: number, m: number) {
  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  return d;
}

function CalendarDialog({
  open: openProp,
  onOpenChange,
  mode,
  toolId,
  reservationId,
  userId,
  start,
  end,
  notes,
  windowFromISO,
  windowUntilISO,
  children,
}: CalendarDialogProps) {
  const t = useTranslations('reservations');
  const translations = useTranslations();
  const utils = api.useUtils();
  const schema = reservationFormSchema(translations, start, mode);

  const [internalOpen, setInternalOpen] = useState(openProp ?? false);
  const open = openProp !== undefined ? openProp : internalOpen;

  function handleOpenChange(open: boolean) {
    if (openProp === undefined) {
      setInternalOpen(open);
    }
    onOpenChange?.(open);
  }

  async function onMutationSuccess() {
    await utils.reservations.fetchCalendarReservations.invalidate({
      toolId,
      from: windowFromISO,
      until: windowUntilISO,
    });
    handleOpenChange(false);
  }

  const createMutation = api.reservations.createReservation.useMutation({
    onSuccess: onMutationSuccess,
  });
  const updateMutation = api.reservations.updateReservation.useMutation({
    onSuccess: onMutationSuccess,
  });
  const deleteMutation = api.reservations.deleteReservation.useMutation({
    onSuccess: onMutationSuccess,
  });

  const form = useAppForm({
    validators: { onSubmit: schema },
    defaultValues: {
      fromDate: start ?? null,
      untilDate: end ?? null,

      fromHour: start ? String(start.getHours()) : '',
      fromMinute: start ? String(Math.floor(start.getMinutes() / 15) * 15) : '',
      untilHour: end ? String(end.getHours()) : '',
      untilMinute: end ? String(Math.floor(end.getMinutes() / 15) * 15) : '',
      notes: notes ?? '',
    },
    onSubmit: async ({ value }) => {
      const {
        fromDate,
        untilDate,
        fromHour,
        fromMinute,
        untilHour,
        untilMinute,
        notes,
      } = value as {
        fromDate: Date | null;
        untilDate: Date | null;
        fromHour: string;
        fromMinute: string;
        untilHour: string;
        untilMinute: string;
        notes: string;
      };

      if (!fromDate || !untilDate) {
        toast.error(t('form.specifyTime'));
        return;
      }

      const reservedFrom = withHM(
        fromDate,
        Number(fromHour),
        Number(fromMinute),
      );
      const reservedUntil = withHM(
        untilDate,
        Number(untilHour),
        Number(untilMinute),
      );

      if (mode === 'create') {
        await createMutation.mutateAsync(
          { toolId, reservedFrom, reservedUntil, notes },
          { onSuccess: () => toast.success(t('form.successCreate')) },
        );
      } else {
        if (!reservationId) return;
        await updateMutation.mutateAsync(
          { reservationId, toolId, reservedFrom, reservedUntil, notes },
          { onSuccess: () => toast.success(t('form.successUpdate')) },
        );
      }
      handleOpenChange(false);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      {children && (
        <AlertDialogTrigger onClick={() => handleOpenChange(true)}>
          {children}
        </AlertDialogTrigger>
      )}
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {mode === 'create' ? t('form.titleCreate') : t('form.titleEdit')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {mode === 'create'
              ? t('form.descriptionCreate')
              : t('form.descriptionEdit')}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form.AppForm>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await form.handleSubmit();
            }}
          >
            <form.AppField name='fromDate'>
              {(field) => (
                <field.DateField
                  className='mb-6'
                  label={t('form.reservedFrom')}
                />
              )}
            </form.AppField>

            <div className='mb-8 grid grid-cols-2 gap-2'>
              <form.AppField name='fromHour'>
                {(field) => (
                  <field.SelectField
                    label={t('form.hour')}
                    placeholder='HH'
                    required
                    options={HOUR_OPTIONS}
                  />
                )}
              </form.AppField>
              <form.AppField name='fromMinute'>
                {(field) => (
                  <field.SelectField
                    label={t('form.min')}
                    placeholder='MM'
                    required
                    options={MINUTE_OPTIONS}
                  />
                )}
              </form.AppField>
            </div>

            <form.AppField name='untilDate'>
              {(field) => (
                <field.DateField
                  className='mb-6'
                  label={t('form.reservedUntil')}
                />
              )}
            </form.AppField>

            <div className='mb-8 grid grid-cols-2 gap-2'>
              <form.AppField name='untilHour'>
                {(field) => (
                  <field.SelectField
                    label={t('form.hour')}
                    placeholder='HH'
                    required
                    options={HOUR_OPTIONS}
                  />
                )}
              </form.AppField>
              <form.AppField name='untilMinute'>
                {(field) => (
                  <field.SelectField
                    label={t('form.min')}
                    placeholder='MM'
                    required
                    options={MINUTE_OPTIONS}
                  />
                )}
              </form.AppField>
            </div>

            <form.AppField name='notes'>
              {(field) => <field.TextAreaField label={t('form.notes')} />}
            </form.AppField>

            <AlertDialogFooter className='flex w-full flex-row items-center justify-between gap-2'>
              <AlertDialogCancel asChild>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={() => handleOpenChange(false)}
                >
                  {t('form.cancel')}
                </Button>
              </AlertDialogCancel>

              <div className='flex items-center gap-2'>
                {mode === 'edit' && reservationId != null && (
                  <ConfirmDeleteButton
                    isLoading={deleteMutation.isPending}
                    onConfirm={async () => {
                      await deleteMutation.mutateAsync(
                        { reservationId, toolId, userId },
                        {
                          onSuccess: () =>
                            toast.success(t('form.successDelete')),
                        },
                      );
                      handleOpenChange(false);
                    }}
                  />
                )}
                <form.SubmitButton
                  allowPristine={mode === 'create'}
                  loading={updateMutation.isPending}
                  className='min-w-28'
                >
                  {t('form.save')}
                </form.SubmitButton>
              </div>
            </AlertDialogFooter>
          </form>
        </form.AppForm>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { CalendarDialog };
