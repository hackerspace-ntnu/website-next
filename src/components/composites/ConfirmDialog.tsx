'use client';

import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/composites/ResponsiveDialog';
import { Button, type buttonVariants } from '@/components/ui/Button';
import type { VariantProps } from '@/lib/utils';
import { useState } from 'react';

type ConfirmDialogProps = {
  t: {
    title: string;
    description: string;
    cancel: string;
    confirm: string;
  };
  confirmAction: () => void;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

function ConfirmDialog({ confirmAction, t, ...props }: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogTrigger asChild>
        <Button variant='destructive' {...props} />
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent className='sm:max-w-md'>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>{t.title}</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {t.description}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogFooter className='flex w-full gap-2 sm:justify-between'>
          <ResponsiveDialogClose asChild>
            <Button type='button' variant='secondary'>
              {t.cancel}
            </Button>
          </ResponsiveDialogClose>
          <Button
            variant='destructive'
            onClick={() => {
              setOpen(false);
              confirmAction();
            }}
          >
            {t.confirm}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export { ConfirmDialog };
