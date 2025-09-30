'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CalendarConfirmDialog } from '@/components/reservations/reservations-calendar/CalendarConfirmDialog';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { useAppForm } from '@/components/ui/Form';
import { Spinner } from '@/components/ui/Spinner';
import { api } from '@/lib/api/client';
import type { RouterOutput } from '@/server/api';
import { reservationFormSchema } from '@/validations/reservations';

type CalendarReservation =
  RouterOutput['reservations']['fetchCalendarReservations'][number];

export type CalendarDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode: 'create' | 'edit';
  userId: number;
  toolId: number;
  reservationId?: number;

  start: Date | null;
  end: Date | null;
  notes?: string;

  range: { fromISO: string; untilISO: string };

  onCancel: () => void;
  onFinished?: () => void;
  pristine?: boolean;
};

function CalendarDialog({
  open,
  onOpenChange,
  mode,
  toolId,
  reservationId,
  userId,
  start,
  end,
  notes,
  range,
  onCancel,
  onFinished,
  pristine,
}: CalendarDialogProps) {
  const t = useTranslations('reservations');
  const translations = useTranslations();
  const schema = reservationFormSchema(translations, start, mode);
  const utils = api.useUtils();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const createMutation = api.reservations.createReservation.useMutation({
    onSuccess: async (created) => {
      if (!created) return;
      const createdFull = await utils.reservations.fetchOneReservation.fetch({
        reservationId: created.reservationId,
      });
      const r = createdFull as CalendarReservation;

      utils.reservations.fetchCalendarReservations.setData(
        { toolId, from: range.fromISO, until: range.untilISO },
        (prev) => (prev ? [...prev, r] : [r]),
      );
    },
  });

  const updateMutation = api.reservations.updateReservation.useMutation({
    onSuccess: async (updated) => {
      if (!updated) return;
      const updatedFull = await utils.reservations.fetchOneReservation.fetch({
        reservationId: updated.reservationId,
      });
      const r = updatedFull as CalendarReservation;

      utils.reservations.fetchCalendarReservations.setData(
        { toolId, from: range.fromISO, until: range.untilISO },
        (prev) =>
          prev
            ? prev.map((x) => (x.reservationId === r.reservationId ? r : x))
            : prev,
      );
    },
  });

  const deleteMutation = api.reservations.deleteReservation.useMutation({
    onSuccess: async (_, variables) => {
      utils.reservations.fetchCalendarReservations.setData(
        { toolId, from: range.fromISO, until: range.untilISO },
        (prev) =>
          prev
            ? prev.filter((x) => x.reservationId !== variables.reservationId)
            : prev,
      );
    },
  });

  const form = useAppForm({
    validators: { onChange: schema },
    defaultValues: {
      reservedFrom: start,
      reservedUntil: end,
      notes: notes ?? '',
    },
    onSubmit: async ({ value }) => {
      if (mode === 'create') {
        await createMutation.mutateAsync({
          toolId,
          reservedFrom: value.reservedFrom as Date,
          reservedUntil: value.reservedUntil as Date,
          notes: value.notes ?? '',
        });
      } else {
        if (!reservationId) return;
        await updateMutation.mutateAsync({
          reservationId,
          toolId,
          reservedFrom: value.reservedFrom as Date,
          reservedUntil: value.reservedUntil as Date,
          notes: value.notes ?? '',
        });
      }

      onFinished?.();
      onOpenChange(false);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
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

        {/* ✅ Provide the form context so form.SubmitButton works */}
        <form.AppForm>
          <form
            className='mt-2 space-y-4'
            onSubmit={async (e) => {
              e.preventDefault();
              await form.handleSubmit();
            }}
          >
            <form.AppField name='reservedFrom'>
              {(field) => (
                <field.DateTimeField
                  label={t('form.reservedFrom')}
                  granularity='minute'
                />
              )}
            </form.AppField>

            <form.AppField name='reservedUntil'>
              {(field) => (
                <field.DateTimeField
                  label={t('form.reservedUntil')}
                  granularity='minute'
                />
              )}
            </form.AppField>

            <form.AppField name='notes'>
              {(field) => <field.TextAreaField label={t('form.notes')} />}
            </form.AppField>

            <AlertDialogFooter className='mt-6 flex w-full items-center justify-between gap-2'>
              <AlertDialogCancel asChild>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={() => {
                    onCancel();
                    onOpenChange(false);
                  }}
                >
                  {t('form.cancel')}
                </Button>
              </AlertDialogCancel>

              <div className='flex items-center gap-2'>
                {mode === 'edit' && reservationId != null && (
                  <>
                    <Button
                      type='button'
                      variant='destructive'
                      onClick={() => setConfirmDeleteOpen(true)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? (
                        <Spinner className='text-primary-foreground' />
                      ) : (
                        t('form.delete')
                      )}
                    </Button>
                    <CalendarConfirmDialog
                      open={confirmDeleteOpen}
                      onOpenChange={setConfirmDeleteOpen}
                      onConfirm={async () => {
                        await deleteMutation.mutateAsync({
                          reservationId,
                          toolId,
                          userId,
                        });
                        onFinished?.();
                        setConfirmDeleteOpen(false);
                        onOpenChange(false);
                      }}
                      onCancel={() => setConfirmDeleteOpen(false)}
                    />
                  </>
                )}

                {/* Had to use form.Subcribe over form.submitButton because isPristine prevents user from just pressing save
                after dragging and selecting a slot in the calendar, i.e. it ignores defaultvalues and disables button even when the values are defined*/}
                <form.Subscribe
                  selector={(state) => [
                    state.canSubmit,
                    state.isSubmitting,
                    state.isPristine,
                  ]}
                >
                  {([canSubmit, isSubmitting, isPristine]) => {
                    const disabled =
                      isSubmitting || !canSubmit || (!pristine && isPristine);

                    return (
                      <Button type='submit' disabled={disabled}>
                        {isSubmitting ? (
                          <Spinner className='text-primary-foreground' />
                        ) : (
                          t('form.save')
                        )}
                      </Button>
                    );
                  }}
                </form.Subscribe>
              </div>
            </AlertDialogFooter>
          </form>
        </form.AppForm>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { CalendarDialog };
