import { items } from '@/mock-data/items';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

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
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('storage');

  const categories = [
    {
      value: 'popularity',
      label: t('combobox.popularity'),
    },
    {
      value: 'sortDescending',
      label: t('combobox.sortDescending'),
    },
    {
      value: 'sortAscending',
      label: t('combobox.sortAscending'),
    },
    {
      value: 'name',
      label: t('combobox.name'),
    },
  ];
  return (
    <>
      <h1>{t('title')}</h1>
      <div className='my-4 flex justify-center gap-2'>
        <SearchBar className='max-w-2xl' />
        <Combobox
          choices={categories}
          defaultDescription={t('combobox.defaultDescription')}
          defaultPlaceholder={t('combobox.defaultPlaceholder')}
        />
      </div>
      <div className='grid grid-cols-4 gap-3'>
        {items.map((item) => (
          <Card key={item.name} className='text-center'>
            <CardHeader>
              <CardTitle className='truncate'>{item.name}</CardTitle>
              <CardDescription className='flex flex-col gap-1'>
                <span>
                  {t('card.quantityInfo', { quantity: item.quantity })}
                </span>
                <span>
                  {t('card.locationInfo', { location: item.location })}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src='/unknown.png'
                width={192}
                height={192}
                alt={`Photo of ${item.name}`}
                className='mx-auto'
              />
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
