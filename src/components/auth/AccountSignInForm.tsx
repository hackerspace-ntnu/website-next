'use client';

import { accountSignInSchema } from '@/validations/auth/accountSignInSchema';
import { useTranslations } from 'next-intl';

import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';

import { usePending } from '@/components/auth/PendingBar';
import { useAppForm } from '@/components/ui/Form';
import { Link } from '@/components/ui/Link';
import type { TRPCClientError } from '@/lib/api/types';

function AccountSignInForm() {
  const router = useRouter();
  const t = useTranslations('auth');
  const formSchema = accountSignInSchema(useTranslations());
  const { isPending, setPending } = usePending();
  const signInMutation = api.auth.signIn.useMutation({
    onMutate: () => setPending(true),
    onSettled: () => setPending(false),
  });

  const form = useAppForm({
    validators: {
      onChange: formSchema,
      onSubmitAsync: async ({ value }) => {
        try {
          await signInMutation.mutateAsync(value);
        } catch (error: unknown) {
          setPending(false);
          const TRPCError = error as TRPCClientError;
          if (!TRPCError.data?.toast) {
            return { fields: { password: TRPCError.message } };
          }
          return ' ';
        }
      },
    },
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: () => {
      router.push('/');
      router.refresh();
    },
  });

  return (
    <div
      className={`flex h-full flex-col transition-opacity duration-500 ${isPending ? 'pointer-events-none opacity-50' : ''}`}
    >
      <div className='mb-4 space-y-2 text-center'>
        <h1 className='text-4xl'>{t('signIn')}</h1>
        <p className='text-sm'>{t('useYourAccount')}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className='relative grow space-y-6'
      >
        <form.AppForm>
          <form.AppField name='username'>
            {(field) => (
              <field.TextField
                label={t('form.username.label')}
                placeholder='jimmy'
                autoComplete='username'
              />
            )}
          </form.AppField>
          <form.AppField name='password'>
            {(field) => (
              <field.TextField
                label={t('form.password.label')}
                autoComplete='current-password'
                labelSibling={
                  <Link
                    className='h-auto p-0 leading-none'
                    variant='link'
                    size='default'
                    href='/auth/forgot-password'
                  >
                    {`${t('forgotPassword')}?`}
                  </Link>
                }
              />
            )}
          </form.AppField>
          <div className='absolute bottom-0 flex w-full xs:flex-row flex-col xs:justify-end justify-between gap-2'>
            <form.SubmitButton>{t('submit')}</form.SubmitButton>
          </div>
        </form.AppForm>
      </form>
    </div>
  );
}

export { AccountSignInForm };
