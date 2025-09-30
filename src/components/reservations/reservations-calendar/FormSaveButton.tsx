'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

type FormSaveButtonProps = {
  canSubmit: boolean | undefined;
  isSubmitting: boolean | undefined;
  isPristine: boolean | undefined;
  allowPristine?: boolean;
  className?: string;
};

function FormSaveButton({
  canSubmit,
  isSubmitting,
  isPristine,
  allowPristine = false,
  className,
}: FormSaveButtonProps) {
  const t = useTranslations('reservations');

  const disabled = isSubmitting || !canSubmit || (!allowPristine && isPristine);

  return (
    <Button type='submit' disabled={disabled} className={className}>
      {isSubmitting ? (
        <Spinner className='text-primary-foreground' />
      ) : (
        t('form.save')
      )}
    </Button>
  );
}

export { FormSaveButton };
