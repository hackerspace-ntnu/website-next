'use client';

import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/composites/ResponsiveDialog';
import { Button } from '@/components/ui/Button';

type CalendarConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  t: {
    title: string;
    description: string;
    confirm: string;
    cancel: string;
  };
};

function CalendarConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  t,
}: CalendarConfirmDialogProps) {
  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className='sm:max-w-md'>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>{t.title}</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {t.description}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogFooter className='flex w-full gap-2 sm:justify-between'>
          <Button
            variant='secondary'
            onClick={() => {
              onCancel();
              onOpenChange(false);
            }}
          >
            {t.cancel}
          </Button>
          <Button
            variant='default'
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {t.confirm}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export { CalendarConfirmDialog };
