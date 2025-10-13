import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { BannerForm } from '@/components/management/banners/BannerForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export default async function EditBannerPage({
  params,
}: {
  params: Promise<{ locale: string; bannerId: string }>;
}) {
  const { locale, bannerId } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('management.banners.edit');
  const { ui, management } = await getMessages();

  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['leadership', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  const processedBannerId = Number(bannerId);
  if (
    Number.isNaN(processedBannerId) ||
    !Number.isInteger(processedBannerId) ||
    processedBannerId < 1
  ) {
    return notFound();
  }

  const banner = await api.banners.fetchBanner({ id: processedBannerId });

  if (!banner) {
    return notFound();
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
      <h1 className='my-4 text-center'>{t('edit')}</h1>
      <NextIntlClientProvider
        messages={{ ui, management } as Pick<Messages, 'ui' | 'management'>}
      >
        <div className='mx-auto w-full max-w-2xl'>
          <BannerForm banner={banner} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
