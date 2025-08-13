import { getTranslations } from 'next-intl/server';
import { EditEventFormSkeleton } from '@/components/events/EditEventFormSkeleton';

export default async function EditEventLoading() {
  const t = await getTranslations('events.edit');

  return (
    <>
      <h1 className='my-4 text-center'>{t('title')}</h1>
      <div className='mx-auto w-full max-w-2xl'>
        <EditEventFormSkeleton />
      </div>
    </>
  );
}
