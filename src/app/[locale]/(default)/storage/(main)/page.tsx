import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { StorageItems } from '@/components/storage/StorageItems';
import { api } from '@/lib/api/server';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { SearchParams } from 'nuqs';

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

  return (
    <>
      <StorageItems searchParams={awaitedSearchParams} itemsPerPage={12} />
      <PaginationCarousel
        className='my-6'
        totalPages={Math.ceil((await api.storage.itemsTotal()) / itemsPerPage)}
      />
    </>
  );
}
