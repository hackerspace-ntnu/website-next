import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { EditEventFormSkeleton } from '@/components/events/EditEventFormSkeleton';
import { Link } from '@/components/ui/Link';

export default async function EditEventLoading() {
  const t = await getTranslations('events.edit');
  const tEvents = await getTranslations('events');

  return (
    <>
      <Link
        href='/events'
        className='my-4 flex w-fit gap-2'
        variant='secondary'
        size='default'
        aria-label={tEvents('backToEvent')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {tEvents('backToEvent')}
      </Link>
      <h1 className='my-4 text-center'>{t('title')}</h1>
      <div className='mx-auto w-full max-w-2xl'>
        <EditEventFormSkeleton />
      </div>
    </>
  );
}
