import { PlusIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  createSearchParamsCache,
  parseAsInteger,
  type SearchParams,
} from 'nuqs/server';
import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { QuoteCard } from '@/components/quotes/QuoteCard';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('quotes');

  return {
    title: t('title'),
  };
}

const ITEMS_PER_PAGE = 10;

export default async function QuotesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('quotes');
  const tUi = await getTranslations('ui');

  const searchParamsCache = createSearchParamsCache({
    [tUi('page')]: parseAsInteger.withDefault(1),
  });

  const { [tUi('page')]: page = 1 } = searchParamsCache.parse(
    await searchParams,
  );

  const quotes = await api.quotes.fetchQuotes({
    limit: ITEMS_PER_PAGE,
    offset: (page - 1) * ITEMS_PER_PAGE,
  });

  const totalResults = await api.quotes.totalQuotesAvailable();

  const { user } = await api.auth.state();

  return (
    <div className='container space-y-8 py-10'>
      <div className='relative'>
        <h1 className='text-center text-4xl tracking-tight'>{t('title')}</h1>
        {user?.groups && user.groups.length > 0 && (
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
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} currentUser={user} quote={quote} />
        ))}
      </div>
      <PaginationCarousel
        className='my-6'
        totalPages={Math.ceil(totalResults / ITEMS_PER_PAGE)}
      />
    </div>
  );
}
