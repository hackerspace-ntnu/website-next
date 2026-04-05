'use client';

import { revalidateLogic } from '@tanstack/react-form';
import { useState } from 'react';
import { MatrixLogo } from '@/components/assets/logos';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/composites/ResponsiveDialog';
import { Button } from '@/components/ui/Button';
import { useAppForm } from '@/components/ui/Form';
import { ExternalLink, Link } from '@/components/ui/Link';
import { env } from '@/env';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { matrixDialogSchema } from '@/validations/matrix-dialog/matrixDialogSchema';

type MatrixLinkProps = {
  className?: string;
  isLoggedIn: boolean;
  size?: React.ComponentProps<typeof Button>['size'];
  t: {
    title: string;
    descriptionNotLoggedIn: string;
    descriptionLoggedIn: string;
    iHaveAnAccount: string;
    createAnAccount: string;
    dontShowAgain: string;
    openMatrix: string;
    invalidValue: string;
  };
};

function MatrixLink({ className, isLoggedIn, size, t }: MatrixLinkProps) {
  const [showMatrixDialog, setShowMatrixDialog] = useLocalStorage(
    'matrix-info',
    true,
  );
  const [open, setOpen] = useState(false);

  const form = useAppForm({
    validators: {
      onDynamic: matrixDialogSchema({ invalidValue: t.invalidValue }),
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    defaultValues: {
      dontShowAgain: !showMatrixDialog,
    },
    onSubmit: ({ value }) => {
      setOpen(false);
      setShowMatrixDialog(!value.dontShowAgain);
      window.open(env.NEXT_PUBLIC_MATRIX_CLIENT_URL ?? '#', '_blank');
    },
  });

  if (!showMatrixDialog) {
    return (
      <ExternalLink
        variant='ghost'
        size='icon'
        href={env.NEXT_PUBLIC_MATRIX_CLIENT_URL ?? '#'}
        target='_blank'
        rel='noopener noreferrer'
      >
        <MatrixLogo className='h-[1.2rem] w-[1.2rem]' />
      </ExternalLink>
    );
  }

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogTrigger asChild>
        <Button
          className={className}
          variant='ghost'
          size={size ?? 'icon'}
          title={t.title}
          aria-label={t.title}
        >
          <MatrixLogo className='h-[1.2rem] w-[1.2rem]' />
        </Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            <span>{t.title}</span>
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {isLoggedIn ? t.descriptionLoggedIn : t.descriptionNotLoggedIn}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        {!isLoggedIn && (
          <div className='w-full space-y-4 p-4 pb-8 md:p-0 [&>*]:w-full'>
            <Link
              variant='secondary'
              size='default'
              href='/auth'
              onClick={() => setOpen(false)}
            >
              {t.createAnAccount}
            </Link>
            <ExternalLink
              variant='default'
              size='default'
              href={env.NEXT_PUBLIC_MATRIX_CLIENT_URL ?? '#'}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => setOpen(false)}
            >
              {t.iHaveAnAccount}
            </ExternalLink>
          </div>
        )}
        {isLoggedIn && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className='space-y-4 p-4 pb-8 md:p-0'
          >
            <form.AppForm>
              <form.AppField name='dontShowAgain'>
                {(field) => <field.CheckboxField label={t.dontShowAgain} />}
              </form.AppField>
              <form.SubmitButton className='w-full' allowPristine={true}>
                {t.openMatrix}
              </form.SubmitButton>
            </form.AppForm>
          </form>
        )}
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export { MatrixLink };
