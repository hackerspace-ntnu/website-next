import { getTranslations } from 'next-intl/server';
import { Skeleton } from '@/components/ui/Skeleton';

export default async function ManagementLoading() {
  const t = await getTranslations('management');

  return (
    <div className='min-h-screen'>
      <h1 className='text-center'>{t('title')}</h1>
      <div className='my-4 grid grid-cols-2 gap-4'>
        {Array.from({ length: 5 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton
          <Skeleton className='h-24 w-full' key={index} />
        ))}
      </div>
    </div>
  );
}
