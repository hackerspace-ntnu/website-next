import { ArrowLeftIcon } from 'lucide-react';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { SlideForm } from '@/components/home/SlideForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export default async function NewSlidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('home.slides.new');
  const { ui, home } = await getMessages();

  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['leadership', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('unauthorized'));
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
      <h1 className='my-4 text-center'>{t('create')}</h1>
      <NextIntlClientProvider
        messages={{ ui, home } as Pick<Messages, 'ui' | 'home'>}
      >
        <div className='mx-auto w-full max-w-2xl'>
          <SlideForm />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
