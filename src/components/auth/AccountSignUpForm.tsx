'use client';

import { accountSignUpSchema } from '@/validations/auth/accountSignUpSchema';
import { useTranslations } from 'next-intl';

import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';

import { usePending } from '@/components/auth/PendingBar';
import { PasswordInput } from '@/components/composites/PasswordInput';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/components/ui/Form';

function AccountSignUpForm() {
  const router = useRouter();
  const t = useTranslations('auth');
  const formSchema = accountSignUpSchema(useTranslations());
  const { isPending, setPending } = usePending();
  const signUpMutation = api.auth.signUp.useMutation({
    onMutate: () => setPending(true),
    onSettled: () => setPending(false),
    onSuccess: () => router.push('/auth/success'),
  });

  const form = useForm(formSchema, {
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
      <Form onSubmit={form.handleSubmit} className='flex-grow'>
        <form.Field name='password'>
          {(field) => (
            <FormItem errors={field.state.meta.errors}>
              <FormLabel>{t('form.password.label')}</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete='new-password'
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
          name='confirmPassword'
          validators={{
            onChangeListenTo: ['password'],
            onChange: ({ value, fieldApi }) => {
              if (value !== fieldApi.form.getFieldValue('password')) {
                return t('form.password.mismatch');
              }
            },
          }}
        >
          {(field) => (
            <FormItem errors={field.state.meta.errors}>
              <FormLabel>{t('form.password.confirmLabel')}</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete='new-password'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        </form.Field>
        <div className='absolute bottom-0 flex w-full xs:flex-row flex-col xs:justify-end justify-between gap-2'>
          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <Button className='min-w-28' type='submit' disabled={!canSubmit}>
                {t('createAccount')}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </Form>
    </div>
  );
}

export { AccountSignUpForm };
