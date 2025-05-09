import { AddToCartButton } from '@/components/storage/AddToCartButton';
import { BackToStorageButton } from '@/components/storage/BackToStorageButton';
import { ShoppingCartLink } from '@/components/storage/ShoppingCartLink';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import { BlocksIcon, MapPinIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type StorageItemParams = Promise<{
  locale: Locale;
  itemId: string;
}>;

export async function generateMetadata({
  params,
}: { params: StorageItemParams }) {
  const t = await getTranslations('storage');
  const { itemId, locale } = await params;
  const item = await api.storage.fetchOne(Number.parseInt(itemId));
  if (!item.english || !item.norwegian) return;
  const itemName = locale === 'en' ? item.english.name : item.norwegian.name;

  return {
    title: `${t('title')}: ${itemName}`,
  };
}

export default async function StorageItemPage({
  params,
}: { params: StorageItemParams }) {
  const { locale, itemId } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('storage');
  const item = await api.storage.fetchOne(Number.parseInt(itemId));
  const imageUrl = item.imageId
    ? await api.utils.getFileUrl({ fileId: item.imageId })
    : null;

  const addToCartTranslations = {
    addToCart: t('card.addToCart'),
    removeFromCart: t('card.removeFromCart'),
  };

  const auth = await api.auth.state();
  const canManageItems = auth.user?.groups.some((g) =>
    ['labops', 'leadership', 'admin'].includes(g),
  );

  const itemLocale = locale === 'en' ? item.english : item.norwegian;

  if (!itemLocale) return notFound();

  const itemCategoryName =
    locale === 'en' ? item.category?.nameEnglish : item.category?.nameNorwegian;

  return (
    <>
      <div className='flex items-center justify-between'>
        <BackToStorageButton />
        <ShoppingCartLink
          t={{ viewShoppingCart: t('tooltips.viewShoppingCart') }}
          className='mx-4'
        />
      </div>
      <h1 className='my-4'>{itemLocale.name}</h1>
      <div className='mt-4 space-y-4'>
        <div className='flex items-center gap-2'>
          <MapPinIcon className='h-6 w-6' />
          {itemLocale.location && itemLocale.location.length > 0
            ? itemLocale.location
            : t('item.noLocation')}
        </div>
        <div className='flex items-center gap-2'>
          <BlocksIcon className='h-6 w-6' />
          {itemCategoryName ?? t('item.noCategory')}
        </div>
        <Separator />
        <div className='flex flex-col-reverse items-center gap-8 md:flex-row'>
          <div className='max-w-prose'>
            <p>{itemLocale.description ?? t('item.noDescription')}</p>
            <div className='mt-2 flex justify-center gap-2 md:justify-start'>
              <AddToCartButton item={item} t={addToCartTranslations} />
              {canManageItems && (
                <Link
                  href={{
                    pathname: '/storage/item/[itemId]/edit',
                    params: { itemId },
                  }}
                  variant='secondary'
                  size='default'
                >
                  {t('item.edit')}
                </Link>
              )}
            </div>
          </div>
          <Image
            src={imageUrl ?? '/unknown.png'}
            width={192}
            height={192}
            alt={itemLocale.name}
            className='h-48 w-48 rounded-lg object-cover'
          />
        </div>
      </div>
    </>
  );
}
