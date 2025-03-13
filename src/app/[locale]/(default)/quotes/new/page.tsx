import { QuoteForm } from '@/components/quotes/QuoteForm';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

export default async function NewQuotesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { quotes, ui } = await getMessages();
  return (
    <NextIntlClientProvider
      messages={{ quotes, ui } as Pick<Messages, 'quotes' | 'ui'>}
    >
      <QuoteForm />
    </NextIntlClientProvider>
  );
}
