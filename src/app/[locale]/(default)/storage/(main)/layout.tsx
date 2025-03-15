import { CategorySelector } from '@/components/composites/CategorySelector';
import { SearchBar } from '@/components/composites/SearchBar';
import { SortSelector } from '@/components/composites/SortSelector';
import { AddItemButton } from '@/components/storage/AddItemButton';
import { SelectorsSkeleton } from '@/components/storage/SelectorsSkeleton';
import { ShoppingCartLink } from '@/components/storage/ShoppingCartLink';
import { api } from '@/lib/api/server';
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
  const { user } = await api.auth.state();

  setRequestLocale(locale);
  const t = await getTranslations('storage');
  const tUi = await getTranslations('ui');

  const categories = await api.storage.fetchItemCategoryNames();

  const categoriesWithLabel = categories.map((c) => ({ label: c, value: c }));

  const filters = [
    { name: t('select.name'), urlName: t('searchParams.name') },
    { name: t('select.sortDescending'), urlName: t('searchParams.descending') },
    { name: t('select.sortAscending'), urlName: t('searchParams.ascending') },
  ];

  return (
    <>
      <div className='relative'>
        <h1 className='text-center'>{t('title')}</h1>
        <div className='absolute right-0 xs:right-5 bottom-0 flex gap-2'>
          {user && user.groups.length > 0 && <AddItemButton />}
          <ShoppingCartLink
            t={{ viewShoppingCart: t('tooltips.viewShoppingCart') }}
          />
        </div>
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
              defaultValue: t('select.name'),
              defaultSorting: t('searchParams.name'),
            }}
          />
          <CategorySelector
            categories={categoriesWithLabel}
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
