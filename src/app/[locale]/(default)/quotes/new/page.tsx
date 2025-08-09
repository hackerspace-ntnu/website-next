import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { QuoteForm } from '@/components/quotes/QuoteForm';

export default async function NewQuotePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
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
