import { items } from '@/mock-data/items';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { createSearchParamsCache, parseAsInteger } from 'nuqs/parsers';

import { PaginationCarousel } from '@/components/layout/PaginationCarousel';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Combobox } from '@/components/ui/Combobox';
import { SearchBar } from '@/components/ui/SearchBar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

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

  // TODO: Implement filters and category selection
  const categories = [
    {
      value: 'cables',
      label: t('combobox.cables'),
    },
    {
      value: 'sensors',
      label: t('combobox.sensors'),
    },
    {
      value: 'peripherals',
      label: t('combobox.peripherals'),
    },
    {
      value: 'miniPC',
      label: t('combobox.miniPC'),
    },
  ];

  const filters = [
    'select.popularity',
    'select.sortDescending',
    'select.sortAscending',
    'select.name',
  ] as const;

  return (
    <>
      <h1 className='my-4 text-center'>{t('title')}</h1>
      <div className='my-4 flex flex-col justify-center gap-2 lg:flex-row'>
        <SearchBar className='lg:max-w-2xl' />
        <Select>
          <SelectTrigger className='w-full lg:w-[250px]'>
            <SelectValue placeholder={t('select.defaultPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {filters.map((filter) => (
              <SelectItem key={filter} value={filter}>
                {t(filter)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Combobox
          choices={categories}
          defaultDescription={t('combobox.defaultDescription')}
          defaultPlaceholder={t('combobox.defaultPlaceholder')}
          buttonClassName='w-full lg:w-[250px]'
          contentClassName='w-full lg:w-[200px]'
        />
      </div>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {items
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((item) => (
            <Card
              key={item.name}
              className='group text-center duration-200 hover:box-border hover:border-primary'
            >
              <CardHeader>
                <div className='inline-block overflow-hidden'>
                  <Image
                    src='/unknown.png'
                    width={192}
                    height={192}
                    alt={`Photo of ${item.name}`}
                    className='mx-auto duration-200 group-hover:scale-105'
                  />
                </div>
                <CardTitle className='mt-2 truncate'>{item.name}</CardTitle>
                <CardDescription className='flex flex-col gap-1'>
                  <span>{item.location}</span>
                </CardDescription>
              </CardHeader>
              <CardFooter className='justify-center gap-2'>
                <span className='whitespace-nowrap text-sm'>
                  {t('card.quantityInfo', { quantity: item.quantity })}
                </span>
                <Button className='whitespace-break-spaces'>
                  {t('card.addToCart')}
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
      <PaginationCarousel
        className='my-6'
        totalPages={Math.ceil(items.length / itemsPerPage)}
        t={{
          goToPreviousPage: t_ui('goToPreviousPage'),
          previous: t_ui('previous'),
          morePages: t_ui('morePages'),
          goToNextPage: t_ui('goToNextPage'),
          next: t_ui('next'),
          page: t_ui('page'),
        }}
      />
    </>
  );
}
