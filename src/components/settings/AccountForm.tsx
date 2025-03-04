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
import { useTranslations } from 'next-intl';

import { api } from '@/lib/api/client';
import { emailAndPhoneNumberSchema } from '@/validations/settings/emailAndPhoneNumberSchema';

type AccountFormProps = {
  phoneNumber: string;
  email: string;
};

function AccountForm({ phoneNumber, email }: AccountFormProps) {
  const t = useTranslations('settings.account');
  const formSchema = emailAndPhoneNumberSchema(useTranslations());

  const updateEmailAndPhoneNumberMutation =
    api.settings.updateAccount.useMutation({
      onSuccess: () => {
        toast.success(t('updateAccountSuccess'));
      },
    });

  const form = useForm(formSchema, {
    defaultValues: {
      phoneNumber,
      email,
      confirmEmail: email,
    },
    onSubmit: ({ value }) => {
      updateEmailAndPhoneNumberMutation.mutate({
        phoneNumber: value.phoneNumber,
        email: value.email,
      });
    },
  });

  return (
    <Form onSubmit={form.handleSubmit} className='space-y-8'>
      <form.Field
        name='phoneNumber'
        validators={{
          onSubmitAsync: async ({ value }) => {
            const phoneAvailableQuery =
              api.settings.isPhoneNumberAvailable.useQuery({
                phoneNumber: value,
              });

            return phoneAvailableQuery.data
              ? undefined
              : t('phoneNumber.taken');
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
      <form.Field name='email'>
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
            {updateEmailAndPhoneNumberMutation.isPending ? (
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
