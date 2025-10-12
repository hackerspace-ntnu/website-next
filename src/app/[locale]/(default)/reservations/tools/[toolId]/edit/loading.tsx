import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ToolFormSkeleton } from '@/components/reservations/ToolFormSkeleton';
import { Link } from '@/components/ui/Link';

export default async function EditToolLoading() {
  const t = await getTranslations('reservations.tools.edit');
  const tTools = await getTranslations('reservations.tools');

  return (
    <>
      <Link
        className='flex w-fit items-center gap-2'
        href='/reservations'
        variant='ghost'
        size='default'
      >
        <ArrowLeftIcon />
        <span>{tTools('backToReservations')}</span>
      </Link>
      <h1 className='text-center'>{t('title')}</h1>
      <div className='mx-auto lg:max-w-2xl'>
        <ToolFormSkeleton />
      </div>
    </>
  );
}
