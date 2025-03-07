'use client';

import { PhoneInput } from '@/components/composites/PhoneInput';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { useRouter } from '@/lib/locale/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { api } from '@/lib/api/client';
import { accountSchema } from '@/validations/settings/accountSchema';

type AccountFormProps = {
  phoneNumber: string;
  email: string;
};

function AccountForm({ phoneNumber, email }: AccountFormProps) {
  const t = useTranslations('settings.account');
  const router = useRouter();
  const formSchema = accountSchema(useTranslations());
  const { resolvedTheme } = useTheme();

  const checkPhoneAvailability =
    api.settings.checkPhoneAvailability.useMutation();
  const checkEmailAvailability =
    api.settings.checkEmailAvailability.useMutation();

  const updateAccountMutation = api.settings.updateAccount.useMutation();

  const form = useForm(formSchema, {
    defaultValues: {
      phoneNumber,
      email,
      confirmEmail: email,
      theme: resolvedTheme as 'light' | 'dark',
    },
    onSubmit: ({ value }) => {
      updateAccountMutation.mutate(
        {
          phoneNumber: value.phoneNumber,
          email: value.email,
          theme: resolvedTheme as 'light' | 'dark',
        },
        {
          onSuccess: () => {
            toast.success(t('updateAccountSuccess'));
            if (value.email !== email) {
              router.push('/auth/verify-email');
            }
          },
        },
      );
    },
  });

  return (
    <Form onSubmit={form.handleSubmit} className='space-y-8'>
      <form.Field
        name='phoneNumber'
        validators={{
          onSubmitAsync: async ({ value }) => {
            if (value !== phoneNumber) {
              const result = await checkPhoneAvailability.mutateAsync({
                phoneNumber: value,
              });
              if (!result) {
                return t('phoneNumber.taken');
              }
            }
          },
        }}
      >
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('phoneNumber.label')}</FormLabel>
            <FormDescription>{t('phoneNumber.description')}</FormDescription>
            <FormControl>
              <PhoneInput
                autoComplete='tel'
                placeholder='+47 420 69 420'
                international
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field
        name='email'
        validators={{
          onSubmitAsync: async ({ value }) => {
            if (value !== email) {
              const result = await checkEmailAvailability.mutateAsync({
                email: value,
              });
              if (!result) {
                return t('email.taken');
              }
            }
          },
        }}
      >
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('email.label')}</FormLabel>
            <FormDescription>{t('email.description')}</FormDescription>
            <FormControl>
              <Input
                placeholder='ligma@balls.com'
                autoComplete='email'
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field
        name='confirmEmail'
        validators={{
          onChangeListenTo: ['email'],
          onChange: ({ value, fieldApi }) => {
            if (value !== fieldApi.form.getFieldValue('email')) {
              return t('password.mismatch');
            }
          },
        }}
      >
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('email.confirmLabel')}</FormLabel>
            <FormControl>
              <Input
                placeholder='jim@admin.no'
                autoComplete='email'
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Subscribe selector={(state) => [state.canSubmit, state.isPristine]}>
        {([canSubmit, isPristine]) => (
          <Button
            className='min-w-40'
            type='submit'
            disabled={!canSubmit || isPristine}
          >
            {updateAccountMutation.isPending ? (
              <Spinner className='text-primary-foreground' />
            ) : (
              t('updateAccount')
            )}
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
}

export { AccountForm };
