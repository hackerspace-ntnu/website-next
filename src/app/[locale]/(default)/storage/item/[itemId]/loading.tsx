import { BlocksIcon, MapPinIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { BackToStorageButton } from '@/components/storage/BackToStorageButton';
import { ShoppingCartLink } from '@/components/storage/ShoppingCartLink';
import { Separator } from '@/components/ui/Separator';
import { Skeleton } from '@/components/ui/Skeleton';

export default async function StorageItemLoading() {
  const t = await getTranslations('storage');

  return (
    <>
      <div className='flex items-center justify-between'>
        <BackToStorageButton />
        <ShoppingCartLink
          t={{ viewShoppingCart: t('tooltips.viewShoppingCart') }}
          className='mx-4'
        />
      </div>

      <Skeleton className='my-4 h-12 w-64' />
      <div className='mt-4 space-y-4'>
        <div className='flex items-center gap-2'>
          <MapPinIcon className='h-6 w-6' />
          <Skeleton className='h-6 w-32' />
        </div>
        <div className='flex items-center gap-2'>
          <BlocksIcon className='h-6 w-6' />
          <Skeleton className='h-6 w-32' />
        </div>
        <Separator />
        <div className='flex flex-col-reverse items-center gap-8 md:flex-row'>
          <div className='max-w-prose'>
            <Skeleton className='h-12 w-[65ch]' />
            <div className='mt-2 flex justify-center gap-2 md:justify-start'>
              <Skeleton className='h-10 w-32' />
            </div>
          </div>
          <Skeleton className='h-48 w-48 rounded-lg object-cover' />
        </div>
      </div>
    </>
  );
}
