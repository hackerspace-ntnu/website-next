'use client';

import { useTranslations } from 'next-intl';
import { useAppForm } from '@/components/ui/Form';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
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

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      content: '',
      username: '',
    },
    onSubmit: ({ value }) => {
      createQuoteMutation.mutate(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='space-y-8'
    >
      <form.AppForm>
        <form.AppField name='username'>
          {(field) => (
            <field.TextField
              label={t('form.username.label')}
              placeholder='jimmy'
              max={8}
            />
          )}
        </form.AppField>
        <form.AppField name='content'>
          {(field) => (
            <field.TextField
              label={t('form.content.label')}
              placeholder={t('form.content.placeholder')}
            />
          )}
        </form.AppField>
        <form.SubmitButton loading={createQuoteMutation.isPending}>
          {t('createQuote')}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

export { QuoteForm };
