import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { BannerFormSkeleton } from '@/components/management/banners/BannerFormSkeleton';
import { Link } from '@/components/ui/Link';

export default async function EditBannerLoading() {
  const t = await getTranslations('management.banners.edit');

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
      <div className='mx-auto w-full max-w-2xl'>
        <BannerFormSkeleton bannerExists />
      </div>
    </>
  );
}
