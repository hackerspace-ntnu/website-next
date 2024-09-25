import { Link } from '@/lib/locale/navigation';
import { ShoppingCartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchBar } from '@/components/composites/SearchBar';
import { CategorySelector } from '@/components/storage/CategorySelector';
import { SelectorsSkeleton } from '@/components/storage/SelectorsSkeleton';
import { SortSelector } from '@/components/storage/SortSelector';
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { Suspense } from 'react';

export default function StorageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('storage');
  const tUI = useTranslations('ui');

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
        <h1 className='my-4 md:text-center'>{t('title')}</h1>
        <TooltipProvider>
          <Tooltip>
            <Link
              href='/storage/shopping-cart'
              aria-label={t('tooltips.viewShoppingCart')}
            >
              <TooltipTrigger asChild>
                <Button
                  className='absolute right-0 bottom-0 md:right-5'
                  aria-label={t('tooltips.viewShoppingCart')}
                >
                  <ShoppingCartIcon />
                </Button>
              </TooltipTrigger>
            </Link>
            <TooltipContent>
              <p>{t('tooltips.viewShoppingCart')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
              sort: tUI('sort'),
              defaultPlaceholder: t('select.defaultPlaceholder'),
              defaultSorting: t('searchParams.popularity'),
            }}
          />
          <CategorySelector
            categories={categories}
            t={{
              category: tUI('category'),
              sort: tUI('sort'),
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
