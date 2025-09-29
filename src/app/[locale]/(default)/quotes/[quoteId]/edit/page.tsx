import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { QuoteForm } from '@/components/quotes/QuoteForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('quotes.update');

  return {
    title: t('title'),
  };
}

export default async function NewQuotePage({
  params,
}: {
  params: Promise<{ locale: Locale; quoteId: string }>;
}) {
  const { locale, quoteId } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();
  const t = await getTranslations('quotes');
  const tUpdate = await getTranslations('quotes.update');

  const processedQuoteId = Number(quoteId);
  if (
    Number.isNaN(processedQuoteId) ||
    !Number.isInteger(processedQuoteId) ||
    processedQuoteId < 1
  )
    return notFound();

  const quote = await api.quotes.fetchQuote(processedQuoteId);

  if (!quote) return notFound();

  if (
    !user?.groups.some((g) => ['labops', 'leadership', 'admin'].includes(g)) &&
    quote.saidBy.id !== user?.id &&
    quote.heardBy.id !== user?.id
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(tUpdate('unauthorized'));
  }

  const { quotes, ui } = await getMessages();

  return (
    <>
      <Link
        className='flex w-fit items-center gap-2'
        href='/quotes'
        variant='ghost'
        size='default'
      >
        <ArrowLeftIcon />
        <span>{t('backToQuotes')}</span>
      </Link>
      <h1 className='text-center'>{tUpdate('title')}</h1>
      <NextIntlClientProvider
        messages={{ quotes, ui } as Pick<Messages, 'quotes' | 'ui'>}
      >
        <QuoteForm quote={quote} />
      </NextIntlClientProvider>
    </>
  );
}
