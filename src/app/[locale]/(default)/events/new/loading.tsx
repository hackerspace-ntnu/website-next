import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { EditEventFormSkeleton } from '@/components/events/EditEventFormSkeleton';
import { Link } from '@/components/ui/Link';

export default async function NewEventLoading() {
  const t = await getTranslations('events.new');
  const tEvents = await getTranslations('events');

  return (
    <>
      <Link
        className='my-4 flex w-fit gap-2'
        href='/events'
        aria-label={tEvents('backToEvents')}
        variant='secondary'
        size='default'
      >
        <ArrowLeftIcon aria-hidden='true' />
        <span className='hidden sm:inline'>{tEvents('backToEvents')}</span>
      </Link>
      <h1 className='my-4 text-center'>{t('title')}</h1>
      <div className='mx-auto w-full max-w-2xl'>
        <EditEventFormSkeleton />
      </div>
    </>
  );
}
