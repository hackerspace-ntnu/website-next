import { items } from '@/mock-data/items';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { createSearchParamsCache, parseAsInteger } from 'nuqs/parsers';

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
  const t_ui = useTranslations('ui');

  const itemsPerPage = 12;

  const searchParamsCache = createSearchParamsCache({
    [t_ui('page')]: parseAsInteger.withDefault(1),
  });

  const { [t_ui('page')]: page = 1 } = searchParamsCache.parse(searchParams);

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
    </>
  );
}
