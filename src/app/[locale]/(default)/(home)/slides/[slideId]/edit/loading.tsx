import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SlideFormSkeleton } from '@/components/home/SlideFormSkeleton';
import { Link } from '@/components/ui/Link';

export default async function EditSlideLoading() {
  const t = await getTranslations('home.slides.edit');

  return (
    <>
      <Link
        href='/slides'
        className='my-4 flex w-fit gap-2'
        variant='secondary'
        size='default'
        aria-label={t('backToSlides')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {t('backToSlides')}
      </Link>
      <h1 className='my-4 text-center'>{t('edit')}</h1>
      <div className='mx-auto w-full max-w-2xl'>
        <SlideFormSkeleton slideExists />
      </div>
    </>
  );
}
