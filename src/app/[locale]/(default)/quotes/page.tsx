import { api } from '@/lib/api/server';
import { setRequestLocale } from 'next-intl/server';

export default async function QuotesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const quotes = await api.quotes.getQuotes();
  return <pre>{JSON.stringify(quotes, null, 2)}</pre>;
}
