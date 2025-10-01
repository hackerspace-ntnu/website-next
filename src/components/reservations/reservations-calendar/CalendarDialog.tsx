'use client';

import { useTranslations } from 'next-intl';
import { FormDeleteButton } from '@/components/reservations/reservations-calendar/FormDeleteButton';
import { FormSaveButton } from '@/components/reservations/reservations-calendar/FormSaveButton';
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
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { reservationFormSchema } from '@/validations/reservations';

type CalendarDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode: 'create' | 'edit';
  userId: number;
  toolId: number;
  reservationId?: number;

  start: Date | null;
  end: Date | null;
  notes?: string;

  windowFromISO: string;
  windowUntilISO: string;

  onCancel: () => void;
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
  windowFromISO,
  windowUntilISO,
  onCancel,
  pristine,
}: CalendarDialogProps) {
  const t = useTranslations('reservations');
  const translations = useTranslations();
  const schema = reservationFormSchema(translations, start, mode);
  const utils = api.useUtils();

  async function invalidateWindow() {
    await utils.reservations.fetchCalendarReservations.invalidate({
      toolId,
      from: windowFromISO,
      until: windowUntilISO,
    });
  }

  const createMutation = api.reservations.createReservation.useMutation({
    onSuccess: async () => {
      await invalidateWindow();
      onOpenChange(false);
    },
  });

  const updateMutation = api.reservations.updateReservation.useMutation({
    onSuccess: async () => {
      await invalidateWindow();
      onOpenChange(false);
    },
  });

  const deleteMutation = api.reservations.deleteReservation.useMutation({
    onSuccess: async () => {
      await invalidateWindow();
      onOpenChange(false);
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
        await createMutation.mutateAsync(
          {
            toolId,
            reservedFrom: value.reservedFrom as Date,
            reservedUntil: value.reservedUntil as Date,
            notes: value.notes ?? '',
          },
          {
            onSuccess: () => {
              toast.success(t('form.successCreate'));
            },
          },
        );
      } else {
        if (!reservationId) return;
        await updateMutation.mutateAsync(
          {
            reservationId,
            toolId,
            reservedFrom: value.reservedFrom as Date,
            reservedUntil: value.reservedUntil as Date,
            notes: value.notes ?? '',
          },
          {
            onSuccess: () => {
              toast.success(t('form.successUpdate'));
            },
          },
        );
      }
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
                  <FormDeleteButton
                    isLoading={deleteMutation.isPending}
                    onConfirm={async () => {
                      await deleteMutation.mutateAsync(
                        {
                          reservationId,
                          toolId,
                          userId,
                        },
                        {
                          onSuccess: () => {
                            toast.success(t('form.successDelete'));
                          },
                        },
                      );
                      onOpenChange(false);
                    }}
                  />
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
                  {([canSubmit, isSubmitting, isPristine]) => (
                    <FormSaveButton
                      canSubmit={canSubmit ?? undefined}
                      isSubmitting={isSubmitting ?? undefined}
                      isPristine={isPristine}
                      allowPristine={!!pristine}
                      className='min-w-28'
                    />
                  )}
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
