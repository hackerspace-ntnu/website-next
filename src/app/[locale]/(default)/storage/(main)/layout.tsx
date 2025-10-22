import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { CategorySelector } from '@/components/composites/CategorySelector';
import { SortSelector } from '@/components/composites/SortSelector';
import { AddItemButton } from '@/components/storage/AddItemButton';
import { ItemLoansButton } from '@/components/storage/ItemLoansButton';
import { MyLoansButton } from '@/components/storage/MyLoansButton';
import { SelectorsSkeleton } from '@/components/storage/SelectorsSkeleton';
import { ShoppingCartLink } from '@/components/storage/ShoppingCartLink';
import { StorageSearchBar } from '@/components/storage/StorageSearchBar';
import { api } from '@/lib/api/server';
import { cx } from '@/lib/utils';

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
  setRequestLocale(locale as Locale);

  const t = await getTranslations('storage');
  const tUi = await getTranslations('ui');

  const categories = await api.storage.fetchItemCategoryNames();
  const categoriesWithLabel = categories.map((c) => ({ label: c, value: c }));
  const canManageStorage = user?.groups.some((group) =>
    ['labops', 'leadership', 'admin'].includes(group),
  );

  const filters = [
    { name: t('select.name'), urlName: t('searchParams.name') },
    { name: t('select.sortDescending'), urlName: t('searchParams.descending') },
    { name: t('select.sortAscending'), urlName: t('searchParams.ascending') },
  ];

  const UtilityButtons = (
    <div className='flex gap-2'>
      {canManageStorage && (
        <>
          <ItemLoansButton label={t('loans.view')} />
          <AddItemButton label={t('addNewItem')} />
        </>
      )}
      {user && <MyLoansButton label={t('viewLoans')} />}
      <ShoppingCartLink
        t={{ viewShoppingCart: t('tooltips.viewShoppingCart') }}
      />
    </div>
  );

  return (
    <>
      <div className='relative'>
        <h1
          className={cx('text-center', {
            'text-left sm:text-center': !canManageStorage,
          })}
        >
          {t('title')}
        </h1>
        <div
          className={cx(
            'absolute right-5 bottom-1/2 hidden translate-y-1/2 md:block',
            {
              block: !canManageStorage,
            },
          )}
        >
          {UtilityButtons}
        </div>
      </div>
      <div
        className={cx('mr-5 flex justify-end md:hidden', {
          hidden: !canManageStorage,
        })}
      >
        {UtilityButtons}
      </div>
      <div className='my-4 flex flex-col justify-center gap-2 lg:flex-row'>
        <StorageSearchBar
          placeholder={t('searchPlaceholder')}
          t={{ name: t('searchParams.name'), page: tUi('page') }}
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
