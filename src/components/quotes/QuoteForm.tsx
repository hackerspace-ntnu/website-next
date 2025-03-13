'use client';

import { useTranslations } from 'next-intl';

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
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { useRouter } from '@/lib/locale/navigation';

import { api } from '@/lib/api/client';
import { quoteSchema } from '@/validations/quotes/quoteSchema';

function QuoteForm() {
  const t = useTranslations('quotes');
  const router = useRouter();
  const formSchema = quoteSchema(useTranslations());

  const createQuoteMutation = api.quotes.createQuote.useMutation({
    onSuccess: () => {
      toast.success(t('createQuoteSuccess'));
      router.push('/quotes');
    },
  });

  const form = useForm(formSchema, {
    defaultValues: {
      content: '',
      username: '',
    },
    onSubmit: ({ value }) => {
      createQuoteMutation.mutate(value);
    },
  });

  return (
    <Form onSubmit={form.handleSubmit} className='space-y-8'>
      <form.Field name='username'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('form.username.label')}</FormLabel>
            <FormControl>
              <Input
                max={8}
                placeholder='jimmy'
                onChange={(event) => field.handleChange(event.target.value)}
                value={field.state.value}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='content'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('form.content.label')}</FormLabel>
            <FormControl>
              <Input
                placeholder={t('form.content.placeholder')}
                onChange={(event) => field.handleChange(event.target.value)}
                value={field.state.value}
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
            disabled={!canSubmit || isPristine || createQuoteMutation.isPending}
          >
            {createQuoteMutation.isPending ? (
              <Spinner className='text-primary-foreground' />
            ) : (
              t('createQuote')
            )}
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
}

export { QuoteForm };
