'use client';

import { accountSignUpSchema } from '@/validations/auth/accountSignUpSchema';
import { useTranslations } from 'next-intl';

import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import { z } from 'zod';

import { usePending } from '@/components/auth/PendingBar';
import { useAppForm } from '@/components/ui/Form';

function AccountSignUpForm() {
  const router = useRouter();
  const t = useTranslations('auth');
  const formSchema = accountSignUpSchema(useTranslations()).extend({
    confirmPassword: z.string(),
  });
  const { isPending, setPending } = usePending();
  const signUpMutation = api.auth.signUp.useMutation({
    onMutate: () => setPending(true),
    onSettled: () => setPending(false),
    onSuccess: () => router.push('/auth/success'),
  });

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: ({ value }) => {
      signUpMutation.mutate(value);
    },
  });

  return (
    <div
      className={`flex h-full flex-col transition-opacity duration-500 ${isPending ? 'pointer-events-none opacity-50' : ''}`}
    >
      <div className='mb-4 space-y-2 text-center'>
        <h1 className='text-4xl'>{t('createPassword')}</h1>
        <p className='text-sm'>{t('passwordDescription')}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className='relative grow space-y-6'
      >
        <form.AppForm>
          <form.AppField name='password'>
            {(field) => (
              <field.PasswordField
                label={t('form.password.label')}
                autoComplete='new-password'
              />
            )}
          </form.AppField>
          <form.AppField
            name='confirmPassword'
            validators={{
              onChangeListenTo: ['password'],
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue('password')) {
                  return { message: t('form.password.mismatch') };
                }
              },
            }}
          >
            {(field) => (
              <field.PasswordField
                label={t('form.password.confirmLabel')}
                autoComplete='new-password'
              />
            )}
          </form.AppField>
          <div className='absolute bottom-0 flex w-full xs:flex-row flex-col xs:justify-end justify-between gap-2'>
            <form.SubmitButton>{t('createAccount')}</form.SubmitButton>
          </div>
        </form.AppForm>
      </form>
    </div>
  );
}

export { AccountSignUpForm };
