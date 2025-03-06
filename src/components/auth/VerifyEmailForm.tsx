'use client';

import { accountSignUpSchema } from '@/validations/auth/accountSignUpSchema';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useTranslations } from 'next-intl';

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

function VerifyEmailForm({ email }: { email: string }) {
  const router = useRouter();
  const t = useTranslations('auth');
  const formSchema = accountSignUpSchema(useTranslations());
  const { isPending, setPending } = usePending();

  const form = useForm(formSchema, {
    defaultValues: {
      otp: '',
    },
    onSubmit: ({ value }) => {},
  });

  return (
    <div
      className={`flex h-full flex-col transition-opacity duration-500 ${isPending ? 'pointer-events-none opacity-50' : ''}`}
    >
      <div className='mb-4 space-y-2 text-center'>
        <h1 className='text-4xl'>{t('verifyEmail')}</h1>
        <p className='text-sm'>{t('verifyEmailDescription', { email })}</p>
      </div>
      <Form onSubmit={form.handleSubmit} className='flex-grow'>
        <form.Field
          name='otp'
          // validators={{
          //   onSubmitAsync: async ({ value }) => {
          //     try {
          //       const { verifyEmail } = await verifyEmailMutation.mutateAsync({
          //         input: {
          //           otp: value,
          //         },
          //       });
          //       return verifyEmail ? undefined : t('form.otp.incorrect');
          //     } catch {
          //       return ' ';
          //     }
          //   },
          // }}
        >
          {(field) => (
            <FormItem errors={field.state.meta.errors}>
              <FormLabel>{t('form.otp.label')}</FormLabel>
              <FormControl>
                <InputOtp
                  maxLength={8}
                  containerClassName={'justify-center'}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
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
              // resendEmailVerificationCodeMutation.mutate(
              //   {},
              //   {
              //     onSuccess: () => {
              //       toast.success(t('newCodeSent'));
              //     },
              //   },
              // );
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
