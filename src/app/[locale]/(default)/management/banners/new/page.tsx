import { ArrowLeftIcon } from 'lucide-react';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { BannerForm } from '@/components/management/banners/BannerForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export default async function NewBannerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('management.banners.new');
  const { ui, management } = await getMessages();

  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['management', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
  }

  return (
    <>
      <Link
        href='/management/banners'
        className='my-4 flex w-fit gap-2'
        variant='secondary'
        size='default'
        aria-label={t('backToBanners')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {t('backToBanners')}
      </Link>
      <h1 className='my-4 text-center'>{t('create')}</h1>
      <NextIntlClientProvider
        messages={{ ui, management } as Pick<Messages, 'ui' | 'management'>}
      >
        <div className='mx-auto w-full max-w-2xl'>
          <BannerForm />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
