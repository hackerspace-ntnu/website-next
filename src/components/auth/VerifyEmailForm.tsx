'use client';

import type { TRPCClientError } from '@/lib/api/types';
import { verifyEmailSchema } from '@/validations/auth/verifyEmailSchema';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';

import { CountdownButton } from '@/components/auth/CountdownButton';
import { usePending } from '@/components/auth/PendingBar';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/components/ui/Form';
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSeparator,
  InputOtpSlot,
} from '@/components/ui/InputOtp';
import { toast } from '@/components/ui/Toaster';

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

  const form = useForm(formSchema, {
    validators: {
      // TODO: this gets triggered twice, but will be fixed when we rewrtie the from API for Tanstack Form V1. (That is why you may get an error message on the frontend)
      onSubmitAsync: async ({ value }) => {
        try {
          await verifyEmailMutation.mutateAsync({
            otp: value.otp,
            theme: resolvedTheme as 'light' | 'dark',
          });
        } catch (error: unknown) {
          const TRPCError = error as TRPCClientError;
          if (!TRPCError.data?.toast) {
            return { fields: { otp: TRPCError.message } };
          }
        }
      },
    },
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
      <Form onSubmit={form.handleSubmit} className='grow'>
        <form.Field name='otp'>
          {(field) => (
            <FormItem errors={field.state.meta.errors}>
              <FormLabel>{t('form.otp.label')}</FormLabel>
              <FormControl>
                <InputOtp
                  maxLength={8}
                  containerClassName={'justify-center'}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value.toUpperCase())}
                  onBlur={field.handleBlur}
                  pasteTransformer={(pasted) => pasted.replaceAll('-', '')}
                >
                  <InputOtpGroup>
                    <InputOtpSlot index={0} />
                    <InputOtpSlot index={1} />
                    <InputOtpSlot index={2} />
                    <InputOtpSlot index={3} />
                  </InputOtpGroup>
                  <InputOtpSeparator />
                  <InputOtpGroup>
                    <InputOtpSlot index={4} />
                    <InputOtpSlot index={5} />
                    <InputOtpSlot index={6} />
                    <InputOtpSlot index={7} />
                  </InputOtpGroup>
                </InputOtp>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        </form.Field>
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
          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <Button className='min-w-28' type='submit' disabled={!canSubmit}>
                {t('confirmEmail')}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </Form>
    </div>
  );
}

export { VerifyEmailForm };
