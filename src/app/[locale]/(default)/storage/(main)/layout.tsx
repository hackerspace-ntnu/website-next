import { CategorySelector } from '@/components/composites/CategorySelector';
import { SearchBar } from '@/components/composites/SearchBar';
import { SortSelector } from '@/components/composites/SortSelector';
import { SelectorsSkeleton } from '@/components/storage/SelectorsSkeleton';
import { ShoppingCartLink } from '@/components/storage/ShoppingCartLink';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

type StorageLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function StorageLayout({
  params,
  children,
}: StorageLayoutProps) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('storage');
  const tUi = await getTranslations('ui');

  // This does not make much sense with a backend, most likely the categories in the backend will have a name in both languages and an ID
  const categories = [
    {
      label: t('combobox.cables'),
      value: t('searchParams.cables'),
    },
    {
      label: t('combobox.sensors'),
      value: t('searchParams.sensors'),
    },
    {
      label: t('combobox.peripherals'),
      value: t('searchParams.peripherals'),
    },
    {
      label: t('combobox.miniPC'),
      value: t('searchParams.miniPC'),
    },
  ];

  const filters = [
    { name: t('select.popularity'), urlName: t('searchParams.popularity') },
    { name: t('select.sortDescending'), urlName: t('searchParams.descending') },
    { name: t('select.sortAscending'), urlName: t('searchParams.ascending') },
    { name: t('select.name'), urlName: t('searchParams.name') },
  ];

  return (
    <>
      <div className='relative'>
        <h1 className='text-center'>{t('title')}</h1>
        <ShoppingCartLink
          t={{ viewShoppingCart: t('tooltips.viewShoppingCart') }}
        />
      </div>
      <div className='my-4 flex flex-col justify-center gap-2 lg:flex-row'>
        <SearchBar
          className='lg:max-w-2xl'
          placeholder={t('searchPlaceholder')}
        />
        <Suspense fallback={<SelectorsSkeleton />}>
          <SortSelector
            filters={filters}
            t={{
              ariaLabel: t('select.ariaLabel'),
              sort: tUi('sort'),
              defaultValue: t('select.popularity'),
              defaultSorting: t('searchParams.popularity'),
            }}
          />
          <CategorySelector
            categories={categories}
            t={{
              category: tUi('category'),
              sort: tUi('sort'),
              defaultDescription: t('combobox.defaultDescription'),
              defaultPlaceholder: t('combobox.defaultPlaceholder'),
            }}
          />
        </Suspense>
      </div>
      {children}
    </>
  );
}
