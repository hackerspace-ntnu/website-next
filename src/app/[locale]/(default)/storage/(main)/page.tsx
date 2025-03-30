import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { ItemCard } from '@/components/storage/ItemCard';
import { api } from '@/lib/api/server';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  type SearchParams,
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';

export async function generateMetadata() {
  const t = await getTranslations('layout');

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
  const awaitedSearchParams = await searchParams;

  setRequestLocale(locale);

  const itemsPerPage = 12;

  const t = await getTranslations('ui');
  const tStorage = await getTranslations('storage');
  const searchParamsCache = createSearchParamsCache({
    [t('page')]: parseAsInteger.withDefault(1),
    [t('sort')]: parseAsString.withDefault(tStorage('searchParams.name')),
    [t('category')]: parseAsInteger.withDefault(-1),
    [t('name')]: parseAsString.withDefault(''),
  });

  const {
    [t('page')]: page,
    [t('sort')]: sorting,
    [t('category')]: category,
    [t('name')]: name,
  } = searchParamsCache.parse(awaitedSearchParams);

  const items = await api.storage.fetchMany({
    limit: itemsPerPage,
    offset: ((page as number) - 1) * itemsPerPage,
    sorting: sorting as string | undefined,
    category: category as number,
    name: name as string | undefined,
  });

  const itemsTotal =
    (category as number) < 1
      ? await api.storage.itemsTotal()
      : await api.storage.itemsTotal({ categoryId: category as number });

  return (
    <>
      {items.length === 0 && (
        <h3 className='text-center'>{tStorage('noItemsFound')}</h3>
      )}
      <div className='grid grid-cols-1 xs:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
        {items.map(async (item) => (
          <ItemCard
            key={item.id}
            item={item}
            imageUrl={
              item.imageId
                ? await api.utils.getFileUrl({ fileId: item.imageId })
                : null
            }
          />
        ))}
      </div>
      <PaginationCarousel
        className='my-6'
        totalPages={Math.ceil(itemsTotal / itemsPerPage)}
      />
    </>
  );
}
