import {
  NewItemForm,
  type NewItemFormProps,
} from '@/components/storage/NewItemForm';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import { BlocksIcon, MapPinIcon } from 'lucide-react';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import Image from 'next/image';

type StorageItemParams = Promise<{
  locale: string;
  id: string;
}>;

export async function generateMetadata({
  params,
}: { params: StorageItemParams }) {
  const t = await getTranslations('storage');
  const { id } = await params;
  const item = await api.storage.fetchOne(Number.parseInt(id));

  return {
    title: `${t('title')}: ${item.name}`,
  };
}

export default async function StoragePage({
  params,
}: { params: StorageItemParams }) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('storage.item');
  const item = await api.storage.fetchOne(Number.parseInt(id));

  return (
    <>
      <h1 className='my-4'>{item.name}</h1>
      <div className='mt-4 space-y-4'>
        <div className='flex items-center gap-2'>
          <MapPinIcon className='h-8 w-8' />
          {item.location.length > 0 ? item.location : t('noLocation')}
        </div>
        <div className='flex items-center gap-2'>
          <BlocksIcon className='h-8 w-8' />
          {item.category?.name ? item.category.name : t('noCategory')}
        </div>
        <Separator />
        <div className='flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between'>
          <div className='max-w-prose'>
            <p>{item.description ? item.description : t('noDescription')}</p>
          </div>
          <Image
            src='/unknown.png'
            width={192}
            height={192}
            alt={item.name}
            className='h-48 w-48 object-cover'
          />
        </div>
      </div>
    </>
  );
}
