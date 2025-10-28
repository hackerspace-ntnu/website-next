'use client';

import { revalidateLogic } from '@tanstack/react-form';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { CountdownButton } from '@/components/auth/CountdownButton';
import { usePending } from '@/components/auth/PendingBar';
import { useAppForm } from '@/components/ui/Form';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import type { TRPCClientError } from '@/lib/api/types';
import { useRouter } from '@/lib/locale/navigation';
import { verifyEmailSchema } from '@/validations/auth/verifyEmailSchema';

function VerifyEmailForm() {
  const router = useRouter();
  const t = useTranslations('auth');
  const formSchema = verifyEmailSchema(useTranslations());
  const { resolvedTheme } = useTheme();
  const { isPending, setPending } = usePending();
  const verifyEmailMutation = api.auth.verifyEmail.useMutation({
    onMutate: () => setPending(true),
    onSettled: () => setPending(false),
    onSuccess: () => {
      toast.success(t('emailUpdateSuccess'));
      router.replace('/settings/account');
    },
  });

  const resendVerificationEmailMutation =
    api.auth.resendVerificationEmail.useMutation({
      onSuccess: () => {
        toast.success(t('newCodeSent'));
      },
    });

  const form = useAppForm({
    validators: {
      onDynamic: formSchema,
      onSubmitAsync: async ({ value }) => {
        try {
          await verifyEmailMutation.mutateAsync({
            otp: value.otp,
            theme: resolvedTheme as 'light' | 'dark',
          });
        } catch (error: unknown) {
          const TRPCError = error as TRPCClientError;
          if (!TRPCError.data?.toast) {
            return { fields: { otp: { message: TRPCError.message } } };
          }
        }
      },
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    defaultValues: {
      otp: '',
      theme: resolvedTheme as 'light' | 'dark',
    },
  });

  return (
    <div
      className={`flex h-full flex-col transition-opacity duration-500 ${isPending ? 'pointer-events-none opacity-50' : ''}`}
    >
      <div className='mb-4 space-y-2 text-center'>
        <h1 className='text-4xl'>{t('verifyEmail')}</h1>
        <p className='text-sm'>{t('verifyEmailDescription')}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className='relative grow space-y-6'
      >
        <form.AppForm>
          <form.AppField name='otp'>
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
          <div className='absolute bottom-0 flex w-full xs:flex-row flex-col justify-between gap-2'>
            <CountdownButton
              initialCountdown={60}
              onClick={() => {
                resendVerificationEmailMutation.mutate({
                  theme: resolvedTheme as 'light' | 'dark',
                });
              }}
              label={(seconds) => t('getNewCode', { seconds })}
            />
            <form.SubmitButton>{t('confirmEmail')}</form.SubmitButton>
          </div>
        </form.AppForm>
      </form>
    </div>
  );
}

export { VerifyEmailForm };
