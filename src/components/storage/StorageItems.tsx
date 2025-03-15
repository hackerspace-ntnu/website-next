import { ItemCard } from '@/components/storage/ItemCard';
import { api } from '@/lib/api/server';
import { getTranslations } from 'next-intl/server';
import {
  type SearchParams,
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';

async function StorageItems({
  searchParams,
  itemsPerPage,
}: { searchParams: SearchParams; itemsPerPage: number }) {
  const t = await getTranslations('ui');
  const tStorage = await getTranslations('storage');
  const searchParamsCache = createSearchParamsCache({
    [t('page')]: parseAsInteger.withDefault(1),
    [t('sort')]: parseAsString.withDefault(tStorage('searchParams.name')),
  });

  const { [t('page')]: page, [t('sort')]: sorting } =
    searchParamsCache.parse(searchParams);

  const items = await api.storage.fetchMany({
    limit: itemsPerPage,
    offset: ((page as number) - 1) * itemsPerPage,
    sorting: sorting as string | undefined,
  });

  return (
    <div className='grid grid-cols-1 xs:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export { StorageItems };
