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
  isMember: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  mode: 'create' | 'edit';
  userId: number;
  toolId: number;
  reservationId?: number;

  range: { start: Date | null; end: Date | null };
  windowRange: { from: string; until: string };
  notes?: string;

  children?: React.ReactNode;
};

function hourOptions(isMember: boolean) {
  const start = isMember ? 0 : 10;
  const end = isMember ? 24 : 18;
  return Array.from({ length: end - start }, (_, i) => {
    const hour = i + start;
    return {
      label: String(hour).padStart(2, '0'),
      value: String(hour),
    };
  });
}

const MINUTE_OPTIONS = [0, 15, 30, 45].map((m) => ({
  label: String(m).padStart(2, '0'),
  value: String(m),
}));

function withHM(date: Date, h: number, m: number) {
  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  return d;
}

function CalendarDialog({
  isMember,
  open: openProp,
  onOpenChange,
  mode,
  toolId,
  reservationId,
  userId,
  range,
  notes,
  windowRange,
  children,
}: CalendarDialogProps) {
  const t = useTranslations('reservations');
  const translations = useTranslations();
  const utils = api.useUtils();
  const schema = reservationFormSchema(
    translations,
    range.start,
    mode,
    isMember,
  );

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
      from: windowRange.from,
      until: windowRange.until,
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
      fromDate: range.start ?? null,
      untilDate: range.end ?? null,

      fromHour: range.start ? String(range.start.getHours()) : '',
      fromMinute: range.start
        ? String(Math.floor(range.start.getMinutes() / 15) * 15)
        : '',
      untilHour: range.end ? String(range.end.getHours()) : '',
      untilMinute: range.end
        ? String(Math.floor(range.end.getMinutes() / 15) * 15)
        : '',
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
          { toolId, reservedFrom, reservedUntil, notes, isMember },
          { onSuccess: () => toast.success(t('form.successCreate')) },
        );
      } else {
        if (!reservationId) return;
        await updateMutation.mutateAsync(
          {
            reservationId,
            toolId,
            reservedFrom,
            reservedUntil,
            notes,
            isMember,
          },
          { onSuccess: () => toast.success(t('form.successUpdate')) },
        );
      }
      handleOpenChange(false);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      {children && (
        <AlertDialogTrigger
          className='h-full w-full'
          onClick={() => handleOpenChange(true)}
        >
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
                  disabledDates={!isMember && { dayOfWeek: [0, 6] }}
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
                    options={hourOptions(isMember)}
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
                  disabledDates={!isMember && { dayOfWeek: [0, 6] }}
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
                    options={hourOptions(isMember)}
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
