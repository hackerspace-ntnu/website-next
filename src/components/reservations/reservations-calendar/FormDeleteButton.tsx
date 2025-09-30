'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CalendarConfirmDialog } from '@/components/reservations/reservations-calendar/CalendarConfirmDialog';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

type FormDeleteButtonProps = {
  onConfirm: () => Promise<void> | void;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
};

function FormDeleteButton({
  onConfirm,
  isLoading,
  className,
  disabled,
}: FormDeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('reservations');

  return (
    <>
      <Button
        type='button'
        variant='destructive'
        className={className}
        onClick={() => setOpen(true)}
        disabled={disabled || !!isLoading}
      >
        {isLoading ? (
          <Spinner className='text-primary-foreground' />
        ) : (
          t('form.delete')
        )}
      </Button>

      <CalendarConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={async () => {
          await onConfirm();
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

export { FormDeleteButton };
