import { useTranslations } from 'next-intl';
import { ShoppingCartIcon } from 'lucide-react';
import { items } from '@/mock-data/items';
import { Link } from '@/lib/locale/navigation';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategorySelector } from '@/components/storage/CategorySelector';
import { SortSelector } from '@/components/storage/SortSelector';
import { PaginationCarousel } from '@/components/layout/PaginationCarousel';

export default function StorageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('storage');
  const tUI = useTranslations('ui');
  const itemsPerPage = 12;

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
            <Link href='/storage/shopping-cart'>
              <TooltipTrigger asChild>
                <Button className='absolute right-0 bottom-0 md:right-5'>
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
        <SearchBar className='lg:max-w-2xl' />
        <SortSelector
          filters={filters}
          t={{
            sort: tUI('sort'),
            defaultPlaceholder: t('select.defaultPlaceholder'),
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
      </div>
      {children}
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
