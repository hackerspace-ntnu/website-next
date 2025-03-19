import { AddToCartButton } from '@/components/storage/AddToCartButton';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import { ArrowLeftIcon, BlocksIcon, MapPinIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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

export default async function StorageItemPage({
  params,
}: { params: StorageItemParams }) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('storage');
  const item = await api.storage.fetchOne(Number.parseInt(id));

  const addToCartTranslations = {
    addToCart: t('card.addToCart'),
    removeFromCart: t('card.removeFromCart'),
  };

  return (
    <>
      <Link
        className='inline-flex gap-2'
        variant='ghost'
        size='default'
        href='/storage'
        aria-label={t('backToStorage')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        <span className='hidden sm:inline'>{t('backToStorage')}</span>
      </Link>
      <h1 className='my-4'>{item.name}</h1>
      <div className='mt-4 space-y-4'>
        <div className='flex items-center gap-2'>
          <MapPinIcon className='h-8 w-8' />
          {item.location.length > 0 ? item.location : t('item.noLocation')}
        </div>
        <div className='flex items-center gap-2'>
          <BlocksIcon className='h-8 w-8' />
          {item.category?.name ? item.category.name : t('item.noCategory')}
        </div>
        <Separator />
        <div className='flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between'>
          <div className='max-w-prose'>
            <p>
              {item.description ? item.description : t('item.noDescription')}
            </p>
            <div className='mt-2 flex gap-2'>
              <AddToCartButton item={item} t={addToCartTranslations} />
              <Link
                href={{
                  pathname: '/storage/item/[id]/edit',
                  params: { id: id },
                }}
                variant='secondary'
                size='default'
              >
                Edit item
              </Link>
            </div>
          </div>
          <Image
            src='/unknown.png'
            width={192}
            height={192}
            alt={item.name}
            className='h-48 w-48 rounded-lg object-cover'
          />
        </div>
      </div>
    </>
  );
}
