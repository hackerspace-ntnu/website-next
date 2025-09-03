import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { SlideForm } from '@/components/home/SlideForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export default async function EditSlidePage({
  params,
}: {
  params: Promise<{ locale: Locale; slideId: string }>;
}) {
  const { locale, slideId } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home.slides.edit');
  const { ui, home } = await getMessages();

  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['leadership', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  const processedSlideId = Number(slideId);
  if (Number.isNaN(processedSlideId) || !Number.isInteger(processedSlideId)) {
    return notFound();
  }

  const slide = await api.home.fetchSlide({ id: processedSlideId });

  if (!slide) {
    return notFound();
  }

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
      <NextIntlClientProvider
        messages={{ ui, home } as Pick<Messages, 'ui' | 'home'>}
      >
        <div className='mx-auto w-full max-w-2xl'>
          <SlideForm slide={slide} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
