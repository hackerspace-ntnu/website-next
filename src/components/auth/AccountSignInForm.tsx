'use client';

import { accountSignInSchema } from '@/validations/auth/accountSignInSchema';
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
import { Input } from '@/components/ui/Input';
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

  const form = useForm(formSchema, {
    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          await signInMutation.mutateAsync(value);
        } catch (error: unknown) {
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
        <h1>{t('signIn')}</h1>
        <p className='text-sm'>{t('useYourAccount')}</p>
      </div>
      <Form onSubmit={form.handleSubmit} className='grow'>
        <form.Field name='username'>
          {(field) => (
            <FormItem errors={field.state.meta.errors}>
              <FormLabel>{t('form.username.label')}</FormLabel>
              <FormControl>
                <Input
                  placeholder='jimmy'
                  autoComplete='username'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        </form.Field>
        <form.Field name='password'>
          {(field) => (
            <FormItem errors={field.state.meta.errors}>
              <div className='flex items-center justify-between'>
                <FormLabel>{t('form.password.label')}</FormLabel>
                <Link
                  className='h-auto p-0 leading-none'
                  variant='link'
                  size='default'
                  href='/auth/forgot-password'
                >
                  {`${t('forgotPassword')}?`}
                </Link>
              </div>
              <FormControl>
                <PasswordInput
                  autoComplete='current-password'
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
                {t('submit')}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </Form>
    </div>
  );
}

export { AccountSignInForm };
