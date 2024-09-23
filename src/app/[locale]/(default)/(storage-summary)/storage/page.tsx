import { items } from '@/mock-data/items';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { createSearchParamsCache, parseAsInteger } from 'nuqs/server';

import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { ItemCard } from '@/components/storage/ItemCard';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('storage'),
  };
}

export default function StoragePage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('storage');
  const tUI = useTranslations('ui');

  const itemsPerPage = 12;

  const searchParamsCache = createSearchParamsCache({
    [tUI('page')]: parseAsInteger.withDefault(1),
  });

  const { [tUI('page')]: page = 1 } = searchParamsCache.parse(searchParams);

  return (
    <>
      <div className='grid grid-cols-1 xs:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
        {items
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              addToCart={t('card.addToCart')}
              removeFromCart={t('card.removeFromCart')}
              quantityInfo={t('card.quantityInfo', { quantity: item.quantity })}
            />
          ))}
      </div>
      <PaginationCarousel
        className='my-6'
        totalPages={Math.ceil(items.length / itemsPerPage)}
        t={{
          goToPreviousPage: tUI('goToPreviousPage'),
          previous: tUI('previous'),
          morePages: tUI('morePages'),
          goToNextPage: tUI('goToNextPage'),
          next: tUI('next'),
          page: tUI('page'),
        }}
      />
    </>
  );
}
