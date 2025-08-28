'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { usePending } from '@/components/auth/PendingBar';
import { useAppForm } from '@/components/ui/Form';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/client';
import type { TRPCClientError } from '@/lib/api/types';
import { useRouter } from '@/lib/locale/navigation';
import { forgotPasswordSchema } from '@/validations/auth/forgotPasswordSchema';

function ForgotPasswordForm() {
  const router = useRouter();
  const t = useTranslations('auth');
  const tUi = useTranslations('ui');
  const formSchema = forgotPasswordSchema(useTranslations());
  const { resolvedTheme } = useTheme();
  const { isPending, setPending } = usePending();

  const createRequestMutation = api.forgotPassword.createRequest.useMutation({
    onMutate: () => setPending(true),
    onSettled: () => setPending(false),
  });

  const form = useAppForm({
    validators: {
      onChange: formSchema,
      onSubmitAsync: async ({ value }) => {
        try {
          await createRequestMutation.mutateAsync(value);
        } catch (error: unknown) {
          setPending(false);
          const TRPCError = error as TRPCClientError;
          if (!TRPCError.data?.toast) {
            return { fields: { email: { message: TRPCError.message } } };
          }
          return ' ';
        }
      },
    },
    defaultValues: {
      email: '',
      theme: resolvedTheme as 'light' | 'dark',
    },
  });

  return (
    <div
      className={`flex h-full flex-col transition-opacity duration-500 ${isPending ? 'pointer-events-none opacity-50' : ''}`}
    >
      <div className='mb-4 space-y-2 text-center'>
        <h1 className='text-4xl'>{t('forgotPassword')}</h1>
        <p className='text-sm'>{t('forgotPasswordDescription')}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className='relative grow space-y-6'
      >
        <form.AppForm>
          <form.AppField name='email'>
            {(field) => (
              <field.TextField
                label={t('form.email.label')}
                placeholder='jimmy@example.com'
                autoComplete='email'
              />
            )}
          </form.AppField>
          <div className='absolute bottom-0 flex w-full xs:flex-row-reverse flex-col justify-between gap-2'>
            <form.SubmitButton>{t('submit')}</form.SubmitButton>
            <Link
              variant='secondary'
              size='default'
              href='/auth/account'
              className='gap-2'
            >
              {tUi('goBack')}
            </Link>
          </div>
        </form.AppForm>
      </form>
    </div>
  );
}

export { ForgotPasswordForm };
