import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { SlideForm } from '@/components/management/slides/SlideForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export default async function EditSlidePage({
  params,
}: {
  params: Promise<{ locale: string; slideId: string }>;
}) {
  const { locale, slideId } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('management.slides.edit');
  const { ui, management } = await getMessages();

  const { user } = await api.auth.state();

  if (!user?.groups.includes('admin')) {
    // TODO: Actually return a HTTP 401 Unauthorized response whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
  }

  const processedSlideId = Number(slideId);
  if (
    Number.isNaN(processedSlideId) ||
    !Number.isInteger(processedSlideId) ||
    processedSlideId < 1
  ) {
    return notFound();
  }

  const slide = await api.slides.fetchSlide({ id: processedSlideId });

  if (!slide) {
    return notFound();
  }

  return (
    <>
      <Link
        href='/management/slides'
        className='my-4 flex w-fit gap-2'
        variant='secondary'
        size='default'
        aria-label={t('backToSlides')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {t('backToSlides')}
      </Link>
      <h1 className='my-4 text-center'>{t('edit')}</h1>
      <NextIntlClientProvider
        messages={{ ui, management } as Pick<Messages, 'ui' | 'management'>}
      >
        <div className='mx-auto w-full max-w-2xl'>
          <SlideForm slide={slide} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
