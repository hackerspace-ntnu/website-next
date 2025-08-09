import { ArrowLeftIcon } from 'lucide-react';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { QuoteForm } from '@/components/quotes/QuoteForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export default async function NewQuotePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();
  const t = await getTranslations('quotes');
  const tNew = await getTranslations('quotes.new');

  if (
    !user?.groups.some((g) => ['labops', 'leadership', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(tNew('unauthorized'));
  }

  const { quotes, ui } = await getMessages();

  return (
    <>
      <Link
        className='flex w-fit items-center gap-2'
        href='/about'
        variant='ghost'
        size='default'
      >
        <ArrowLeftIcon />
        <span>{t('backToQuotes')}</span>
      </Link>
      <h1 className='text-center'>{tNew('title')}</h1>
      <NextIntlClientProvider
        messages={{ quotes, ui } as Pick<Messages, 'quotes' | 'ui'>}
      >
        <QuoteForm />
      </NextIntlClientProvider>
    </>
  );
}
