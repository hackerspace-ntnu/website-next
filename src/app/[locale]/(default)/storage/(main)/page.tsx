import { items } from '@/mock-data/items';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  type SearchParams,
  createSearchParamsCache,
  parseAsInteger,
} from 'nuqs/server';

import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { ItemCard } from '@/components/storage/ItemCard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('storage'),
  };
}

export default async function StoragePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = useTranslations('ui');

  const itemsPerPage = 12;

  const searchParamsCache = createSearchParamsCache({
    [t('page')]: parseAsInteger.withDefault(1),
  });

  const { [t('page')]: page = 1 } = searchParamsCache.parse(await searchParams);

  return (
    <>
      <div className='grid grid-cols-1 xs:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
        {items
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
      </div>
      <PaginationCarousel
        className='my-6'
        totalPages={Math.ceil(items.length / itemsPerPage)}
      />
    </>
  );
}
