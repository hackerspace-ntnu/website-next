import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacy');

  return (
    <div className='mx-auto my-6 max-w-prose'>
      <h1 className='scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl'>
        {t('title')}
      </h1>
      <span className='my-8 block'>{t('lastUpdated')}</span>
      <p className='leading-7'>{t('intro.part1')}</p>
      <p className='leading-7'>{t('intro.part2')}</p>
      <p className='leading-7'>{t('intro.part3')}</p>
      <h2 className='mt-10 mb-6 scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight'>
        {t('dataResponsibility.title')}
      </h2>
      <p className='my-6 ml-6 list-disc [&>li]:mt-2'>
        {t('dataResponsibility.organization')}
        <br />
        {t('dataResponsibility.address')}
        <br />
        {t('dataResponsibility.email')}
      </p>
      <p className='leading-7 [&:not(:first-child)]:mt-6'>
        {t('dataResponsibility.comment')}
      </p>
      <h2 className='mt-10 mb-4 scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight'>
        {t('collect.title')}
      </h2>
      <p>{t('collect.intro1')}</p>
      <p>{t('collect.intro2')}</p>
      <p>{t('collect.weCollectTheFollowing')}</p>
      <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
        <li>{t('collect.weCollect1')}</li>
        <li>{t('collect.weCollect2')}</li>
        <li>{t('collect.weCollect3')}</li>
        <li>{t('collect.weCollect4')}</li>
      </ul>
      <h2 className='mt-10 mb-4 scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight'>
        {t('dataPurpose.title')}
      </h2>
      <p>{t('dataPurpose.intro')}</p>
      <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
        <li>
          <span className='font-semibold'>{t('dataPurpose.purpose11')}</span>{' '}
          {t('dataPurpose.purpose12')}
        </li>
        <li>
          <span className='font-semibold'>{t('dataPurpose.purpose21')}</span>{' '}
          {t('dataPurpose.purpose22')}
        </li>
        <li>
          <span className='font-semibold'>{t('dataPurpose.purpose31')}</span>{' '}
          {t('dataPurpose.purpose32')}
        </li>
      </ul>
      <h2 className='mt-10 mb-4 scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight'>
        {t('protection.title')}
      </h2>
      <p>{t('protection.content')}</p>
      <h2 className='mt-10 mb-4 scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight'>
        {t('rights.title')}
      </h2>
      <p>{t('rights.gdprIntro')}</p>
      <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
        <li>
          <span className='font-semibold'>{t('rights.gdpr11')}</span>{' '}
          {t('rights.gdpr12')}
        </li>
        <li>
          <span className='font-semibold'>{t('rights.gdpr21')}</span>{' '}
          {t('rights.gdpr22')}
        </li>
        <li>
          <span className='font-semibold'>{t('rights.gdpr31')}</span>{' '}
          {t('rights.gdpr32')}
        </li>
        <li>
          <span className='font-semibold'>{t('rights.gdpr41')}</span>{' '}
          {t('rights.gdpr42')}
        </li>
      </ul>
      <p>{t('rights.consentComment')}</p>
      <p>{t('rights.exercise')}</p>
      <p>{t('rights.responseTime')}</p>
      <h2 className='mt-10 mb-4 scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight'>
        {t('cookies.title')}
      </h2>
      <p className='leading-7 [&:not(:first-child)]:mt-6'>
        {t('cookies.content')}
      </p>
      <h2 className='mt-10 mb-4 scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight'>
        {t('policyChange.title')}
      </h2>
      <p className='leading-7 [&:not(:first-child)]:mt-6'>
        {t('policyChange.content')}
      </p>
    </div>
  );
}
