'use client';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useTranslations } from 'next-intl';
import { usePending } from '@/components/auth/PendingBar';
import { useAppForm } from '@/components/ui/Form';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import type { TRPCClientError } from '@/lib/api/types';
import { useRouter } from '@/lib/locale/navigation';
import { setNewPasswordSchema } from '@/validations/auth/setNewPasswordSchema';

function NewPasswordForm({ requestId }: { requestId: string }) {
  const router = useRouter();
  const t = useTranslations('auth');
  const formSchema = setNewPasswordSchema(useTranslations());
  const { isPending, setPending } = usePending();

  const createRequestMutation = api.forgotPassword.setNewPassword.useMutation({
    onMutate: () => setPending(true),
    onSettled: () => setPending(false),
    onSuccess: (state) => {
      if (!state.success) {
        if (state.cause === 'incorrectCode') return;
        if (state.cause === 'expiredCode') {
          return toast.error(t('form.otp.expired'), {
            action: {
              label: t('tryAgain'),
              onClick: () => router.push('/auth/forgot-password'),
            },
            duration: 15_000,
          });
        }
      }
      toast.info(t('passwordUpdateSuccess'));
      router.push('/auth/account');
    },
  });

  const form = useAppForm({
    validators: {
      onChange: formSchema,
      onSubmitAsync: async ({ value }) => {
        try {
          const state = await createRequestMutation.mutateAsync(value);
          if (!state.success) {
            if (state.cause === 'incorrectCode') {
              return { fields: { code: { message: t('form.otp.incorrect') } } };
            }
          }
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
      forgotPasswordRequestId: requestId,
      code: '',
      newPassword: '',
    },
  });

  return (
    <div
      className={`flex h-full flex-col transition-opacity duration-500 ${isPending ? 'pointer-events-none opacity-50' : ''}`}
    >
      <div className='mb-4 space-y-2 text-center'>
        <h1 className='text-4xl'>{t('forgotPassword')}</h1>
        <p className='text-sm'>{t('enterTheCode')}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className='relative grow space-y-12'
      >
        <form.AppForm>
          <form.AppField name='code'>
            {(field) => (
              <field.OTPField
                label={t('form.otp.label')}
                slots={8}
                groups={[4, 4]}
                containerClassName='justify-center'
                pasteTransformer={(pasted) => pasted.replaceAll('-', '')}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              />
            )}
          </form.AppField>
          <form.AppField name='newPassword'>
            {(field) => (
              <field.PasswordField
                label={t('form.newPassword.label')}
                autoComplete='new-password'
              />
            )}
          </form.AppField>
          <div className='absolute bottom-0 flex w-full xs:flex-row-reverse flex-col'>
            <form.SubmitButton>{t('submit')}</form.SubmitButton>
          </div>
        </form.AppForm>
      </form>
    </div>
  );
}

export { NewPasswordForm };
