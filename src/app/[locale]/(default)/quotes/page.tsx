import { PlusIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { QuoteCard } from '@/components/quotes/QuoteCard';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export default async function QuotesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('quotes');
  const quotes = await api.quotes.getQuotes();
  const { user } = await api.auth.state();

  return (
    <div className='container space-y-8 py-10'>
      <div className='relative'>
        <h1 className='text-center text-4xl tracking-tight'>{t('title')}</h1>
        {user?.groups.some((g) =>
          ['labops', 'leadership', 'admin'].includes(g),
        ) && (
          <Link
            className='-translate-y-1/2 absolute top-1/2 right-0'
            href='/quotes/new'
            variant='default'
            size='icon'
          >
            <PlusIcon />
          </Link>
        )}
      </div>
      <div className='grid gap-6'>
        {quotes.map(async (quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>
    </div>
  );
}
