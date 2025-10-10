'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { MatrixLogo } from '@/components/assets/logos';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/composites/ResponsiveDialog';
import { ResponsiveDialogWrapper } from '@/components/shift-schedule/ResponsiveDialogWrapper';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { ExternalLink } from '@/components/ui/Link';
import { env } from '@/env';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

type MatrixLinkProps = {
  className?: string;
  t: {
    title: string;
  };
};

function MatrixLink({ className, t }: MatrixLinkProps) {
  const [showMatrixDialog, setShowMatrixDiaog] = useLocalStorage<string | null>(
    'matrix-key',
    'true',
  );
  const [open, onOpenChange] = useState(false);

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <Button
        className={className}
        variant='ghost'
        size='icon'
        // href={env.NEXT_PUBLIC_MATRIX_CLIENT_URL ?? '#'}
        onClick={() => {
          if (showMatrixDialog === 'true') {
            onOpenChange(true);
          } else {
            window
              .open(env.NEXT_PUBLIC_MATRIX_CLIENT_URL ?? '#', '_blank')
              ?.focus();
          }
        }}
        // target='_blank'
        // rel='noopener noreferrer'
        title={t.title}
        aria-label={t.title}
      >
        <MatrixLogo className='h-[1.2rem] w-[1.2rem]' />
      </Button>
      <ResponsiveDialogContent className='mb-8 w-full min-w-80 p-5 md:mb-0 md:w-fit lg:w-2/5 lg:min-w-96'>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle className='flex flex-col text-left lg:flex-row lg:gap-5'>
            <span className='font-semibold text-3xl'>Matrix pop-up</span>
          </ResponsiveDialogTitle>
          {/* Not having description causes error, can't use aria-description */}
          <ResponsiveDialogDescription className='hidden'>
            {'shiftSchedule'}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <div className='flex flex-col gap-6'>
          <div className='flex items-center gap-3'>
            <Checkbox id='matrix-link'>
              <span className='sr-only'>Bli sendt til Matrix</span>
            </Checkbox>
            <Label htmlFor='matrix-link'>Accept terms and conditions</Label>
          </div>
          <div className='flex items-center gap-3'>
            <Checkbox id='matrix-link'>
              <span className='sr-only'>Bli sendt til Matrix</span>
            </Checkbox>
            <Label htmlFor='matrix-link'>Accept terms and conditions</Label>
          </div>
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
export { MatrixLink };
