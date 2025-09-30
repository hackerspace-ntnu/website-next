import { useTranslations } from 'next-intl';
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
import { reservationFormSchema } from '@/validations/reservations';

export type CalendarDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  start: Date | null;
  end: Date | null;
  mode: 'create' | 'edit';
  onSubmit: (data: {
    reservedFrom: Date;
    reservedUntil: Date;
    notes?: string;
  }) => void;
  onCancel: () => void;
  onDelete?: () => void;
  defaultValues?: { notes?: string };
};

function CalendarDialog({
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
  const translations = useTranslations();

  const schema = reservationFormSchema(translations, start, mode);

  const form = useAppForm({
    validators: { onChange: schema },
    defaultValues: {
      reservedFrom: start,
      reservedUntil: end,
      notes: defaultValues?.notes ?? '',
    },
    onSubmit: ({ value }) => {
      onSubmit({
        reservedFrom: value.reservedFrom as Date,
        reservedUntil: value.reservedUntil as Date,
        notes: value.notes?.trim() ? value.notes : undefined,
      });
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
              {mode === 'edit' && onDelete && (
                <Button
                  type='button'
                  variant='destructive'
                  onClick={() => {
                    onDelete();
                    onOpenChange(false);
                  }}
                >
                  {t('form.delete')}
                </Button>
              )}
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button type='submit' disabled={!canSubmit || isSubmitting}>
                    {isSubmitting ? (
                      <Spinner className='text-primary-foreground' />
                    ) : (
                      t('form.save')
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CalendarDialog;
